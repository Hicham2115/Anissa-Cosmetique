import "server-only";
import { getVariantIdByHandle } from "@/lib/shopify";
import type { CodOrderInput } from "@/lib/validations";

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

  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId!,
      client_secret: clientSecret!,
    }),
  });

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

  const res = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

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

// Creates a real Shopify order directly (no hosted checkout, no online
// payment) for cash-on-delivery — the standard pattern for COD storefronts.
// financialStatus is PENDING since payment is collected on delivery, not at
// order time.
export async function createCodOrder(input: CodOrderInput): Promise<{ id: string; name: string }> {
  const variantId = await getVariantIdByHandle(input.productSlug);

  const data = await shopifyAdminFetch<OrderCreateResult>(ORDER_CREATE_MUTATION, {
    order: {
      lineItems: [{ variantId, quantity: input.quantity }],
      phone: input.phone,
      // Shopify's protected-customer-data policy silently drops
      // shippingAddress/customer PII fields on orderCreate for apps without
      // separate compliance approval — the note is the one channel proven
      // to actually persist, so it's the reliable place to surface what the
      // shopper entered until that approval is requested.
      note: [
        "Commande passée depuis le site — paiement à la livraison.",
        `Nom : ${input.name}`,
        `Téléphone : ${input.phone}`,
        `Adresse : ${input.address}`,
      ].join("\n"),
      tags: ["COD", "Site Web"],
      financialStatus: "PENDING",
      shippingAddress: {
        firstName: input.name,
        address1: input.address,
        phone: input.phone,
        country: "Morocco",
      },
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
