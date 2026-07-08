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

export async function fetchShopifyProducts(first = 12) {
  const data = await shopifyFetch<ProductsQueryResult>(PRODUCTS_QUERY, { first });
  return data.products.edges.map(({ node }) => ({
    id: node.id,
    slotId: node.handle,
    name: node.title,
    subtitle: node.description.slice(0, 60) || node.title,
    price: formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode),
    badge: badgeFromTags(node.tags),
    image: node.featuredImage?.url ?? null,
  }));
}
