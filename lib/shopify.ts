import "server-only";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2024-10";

export const shopifyConfigured = Boolean(domain && token);

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

// Server-only: the Storefront token never reaches the client bundle because
// this module is only imported from Next.js Route Handlers.
export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error("Shopify is not configured: missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data");
  }
  return json.data;
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          tags
          featuredImage {
            url
            altText
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

interface ProductsQueryResult {
  products: { edges: { node: ShopifyProductNode }[] };
}

function badgeFromTags(tags: string[]): string | null {
  const lower = tags.map((t) => t.toLowerCase());
  if (lower.includes("bestseller") || lower.includes("best-seller")) return "Best-seller";
  if (lower.includes("new")) return "Nouveau";
  return null;
}

function formatPrice(amount: string, currencyCode: string): string {
  const value = Math.round(Number(amount));
  if (currencyCode === "MAD") return `${value} MAD`;
  return `${value} ${currencyCode}`;
}

function toProduct(node: ShopifyProductNode) {
  const images = node.images.edges.map(({ node: img }) => img.url);
  return {
    id: node.id,
    slotId: node.handle,
    name: node.title,
    subtitle: node.description.slice(0, 60) || node.title,
    price: formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode),
    badge: badgeFromTags(node.tags),
    image: node.featuredImage?.url ?? images[0] ?? null,
    images,
  };
}

export async function fetchShopifyProducts(first = 50) {
  const data = await shopifyFetch<ProductsQueryResult>(PRODUCTS_QUERY, { first });
  return data.products.edges.map(({ node }) => toProduct(node));
}

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      tags
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

interface ProductByHandleQueryResult {
  productByHandle: ShopifyProductNode | null;
}

export async function fetchShopifyProductByHandle(handle: string) {
  const data = await shopifyFetch<ProductByHandleQueryResult>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.productByHandle ? toProduct(data.productByHandle) : null;
}

const PRODUCT_VARIANT_QUERY = /* GraphQL */ `
  query ProductVariantByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

interface ProductVariantQueryResult {
  productByHandle: { variants: { edges: { node: { id: string } }[] } } | null;
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface CartCreateResult {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

export interface CheckoutLineItem {
  handle: string;
  quantity: number;
}

// Creates a fresh Shopify cart for one or more product handles and returns
// the hosted checkoutUrl, so the site can send shoppers straight to
// Shopify's own checkout without building payments/order logic here.
export async function createCheckoutUrlForItems(items: CheckoutLineItem[]): Promise<string> {
  if (items.length === 0) {
    throw new Error("Le panier est vide.");
  }

  const variantIds = await Promise.all(
    items.map(async ({ handle }) => {
      const variantData = await shopifyFetch<ProductVariantQueryResult>(PRODUCT_VARIANT_QUERY, { handle });
      const variantId = variantData.productByHandle?.variants.edges[0]?.node.id;
      if (!variantId) {
        throw new Error(`Aucune variante trouvée pour le produit "${handle}".`);
      }
      return variantId;
    })
  );

  const cartData = await shopifyFetch<CartCreateResult>(CART_CREATE_MUTATION, {
    lines: items.map(({ quantity }, i) => ({ merchandiseId: variantIds[i], quantity })),
  });

  if (cartData.cartCreate.userErrors.length) {
    throw new Error(cartData.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  if (!cartData.cartCreate.cart) {
    throw new Error("Impossible de créer le panier Shopify.");
  }

  return cartData.cartCreate.cart.checkoutUrl;
}
