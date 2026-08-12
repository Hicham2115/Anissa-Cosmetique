import "server-only";
import { getVariantIdByHandle } from "@/lib/shopify";
import type { CartOrderInput, CodOrderInput } from "@/lib/validations";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2024-10";

// Separate credential from the Storefront token in lib/shopify.ts. Shopify
// deprecated static custom-app Admin API tokens (Jan 2026) in favor of the
// OAuth client credentials grant — the app's Client ID/Secret (from Shopify
// admin → Settings → Apps → Develop apps → API credentials) are exchanged
// for a short-lived access token instead of being used directly.
export const shopifyAdminConfigured = Boolean(domain && clientId && clientSecret);

let cachedToken: { value: string; expiresAt: number } | null = null;

// Tokens from the client credentials grant expire in ~24h and must be
// re-exchanged — there's no refresh token, just repeating this request.
async function getAdminAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  let res: Response;
  try {
    res = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId!,
        client_secret: clientSecret!,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error("Shopify Admin token exchange timed out");
    }
    throw err;
  }

  if (!res.ok) {
    throw new Error(`Shopify Admin token exchange failed: ${res.status}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  // Refresh a minute early so an in-flight request never races expiry.
  cachedToken = { value: json.access_token, expiresAt: Date.now() + (json.expires_in - 60) * 1000 };
  return cachedToken.value;
}

interface ShopifyAdminGraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

async function shopifyAdminFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !clientId || !clientSecret) {
    throw new Error("Shopify Admin API is not configured: missing SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_CLIENT_ID or SHOPIFY_ADMIN_CLIENT_SECRET");
  }

  const adminToken = await getAdminAccessToken();

  let res: Response;
  try {
    res = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminToken,
      },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error("Shopify Admin API timed out");
    }
    throw err;
  }

  if (!res.ok) {
    throw new Error(`Shopify Admin API error: ${res.status}`);
  }

  const json = (await res.json()) as ShopifyAdminGraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  if (!json.data) {
    throw new Error("Shopify Admin API returned no data");
  }
  return json.data;
}

const ORDER_CREATE_MUTATION = /* GraphQL */ `
  mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
    orderCreate(order: $order, options: $options) {
      order {
        id
        name
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface OrderCreateResult {
  orderCreate: {
    order: { id: string; name: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

interface MoneyBag {
  shopMoney: { amount: string; currencyCode: string };
}

interface CodLineItem {
  variantId: string;
  quantity: number;
  priceSet?: MoneyBag;
}

interface CodContact {
  name: string;
  phone: string;
  address: string;
}

// Shared by createCodOrder (single product) and createCodCartOrder (full
// cart from the checkout page) — both are the same COD order shape, just
// built from different line items.
async function submitCodOrder(
  lineItems: CodLineItem[],
  contact: CodContact,
  extra: { noteLines?: string[]; shippingLines?: { title: string; priceSet: MoneyBag }[] } = {},
): Promise<{ id: string; name: string }> {
  const data = await shopifyAdminFetch<OrderCreateResult>(ORDER_CREATE_MUTATION, {
    order: {
      lineItems,
      phone: contact.phone,
      // Shopify's protected-customer-data policy silently drops
      // shippingAddress/customer PII fields on orderCreate for apps without
      // separate compliance approval — the note is the one channel proven
      // to actually persist, so it's the reliable place to surface what the
      // shopper entered until that approval is requested.
      note: [
        "Commande passée depuis le site — paiement à la livraison.",
        `Nom : ${contact.name}`,
        `Téléphone : ${contact.phone}`,
        `Adresse : ${contact.address}`,
        ...(extra.noteLines ?? []),
      ].join("\n"),
      tags: ["COD", "Site Web"],
      financialStatus: "PENDING",
      shippingAddress: {
        firstName: contact.name,
        address1: contact.address,
        phone: contact.phone,
        country: "Morocco",
      },
      ...(extra.shippingLines ? { shippingLines: extra.shippingLines } : {}),
    },
    options: {
      inventoryBehaviour: "DECREMENT_IGNORING_POLICY",
    },
  });

  if (data.orderCreate.userErrors.length) {
    throw new Error(data.orderCreate.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.orderCreate.order) {
    throw new Error("Impossible de créer la commande Shopify.");
  }

  return data.orderCreate.order;
}

// Creates a real Shopify order directly (no hosted checkout, no online
// payment) for cash-on-delivery — the standard pattern for COD storefronts.
// financialStatus is PENDING since payment is collected on delivery, not at
// order time.
export async function createCodOrder(input: CodOrderInput): Promise<{ id: string; name: string }> {
  const [variantId, giftVariantId] = await Promise.all([
    getVariantIdByHandle(input.productSlug),
    input.giftSlug ? getVariantIdByHandle(input.giftSlug) : Promise.resolve(null),
  ]);

  const lineItems: CodLineItem[] = [
    { variantId, quantity: input.quantity },
    ...(giftVariantId
      ? [
          {
            variantId: giftVariantId,
            quantity: 1,
            priceSet: { shopMoney: { amount: "0.00", currencyCode: "MAD" } },
          },
        ]
      : []),
  ];

  return submitCodOrder(lineItems, input, {
    noteLines: input.giftSlug ? [`Cadeau offert : ${input.giftSlug}`] : [],
  });
}

// Same as createCodOrder but for the full cart (checkout page) — one order
// with every cart line, plus a shipping line for the delivery fee (already
// computed server-side from the cart total, see lib/shipping.ts).
export async function createCodCartOrder(
  input: CartOrderInput,
  shippingFee: number,
): Promise<{ id: string; name: string }> {
  const variantIds = await Promise.all(input.items.map((item) => getVariantIdByHandle(item.slug)));

  const lineItems: CodLineItem[] = input.items.map((item, i) => ({
    variantId: variantIds[i],
    quantity: item.quantity,
    // Free-gift line items are added to the cart at their normal price
    // (price "Offert") so the checkout order still records what was given —
    // the priceSet override is what actually zeroes it on the order.
    ...(item.price.trim().toLowerCase() === "offert"
      ? { priceSet: { shopMoney: { amount: "0.00", currencyCode: "MAD" } } }
      : {}),
  }));

  return submitCodOrder(lineItems, input, {
    shippingLines: [
      {
        title: shippingFee > 0 ? "Livraison" : "Livraison gratuite",
        priceSet: { shopMoney: { amount: shippingFee.toFixed(2), currencyCode: "MAD" } },
      },
    ],
  });
}
