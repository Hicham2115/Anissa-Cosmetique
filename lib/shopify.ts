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
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
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
          compareAtPriceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          seo {
            title
            description
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
  descriptionHtml: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { maxVariantPrice: { amount: string; currencyCode: string } } | null;
  seo: { title: string | null; description: string | null };
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
  const price = node.priceRange.minVariantPrice;
  const compareAt = node.compareAtPriceRange?.maxVariantPrice;
  const hasDiscount = compareAt && Number(compareAt.amount) > Number(price.amount);
  return {
    id: node.id,
    slotId: node.handle,
    name: node.title,
    subtitle: node.description.slice(0, 60) || node.title,
    description: node.description || null,
    descriptionHtml: node.descriptionHtml || null,
    price: formatPrice(price.amount, price.currencyCode),
    compareAtPrice: hasDiscount ? formatPrice(compareAt.amount, compareAt.currencyCode) : null,
    badge: badgeFromTags(node.tags),
    image: node.featuredImage?.url ?? images[0] ?? null,
    images,
    tags: node.tags,
    seoTitle: node.seo.title,
    seoDescription: node.seo.description,
  };
}

// The storefront shows 4 shopping categories, each tagged in Shopify admin
// with one of the 4 catalog-wide tags: "Anti-Âge", "Éclat", "Exfoliation"
// (used for the "Nettoyants & Exfoliants" category), "Soins" (used for
// "Soins Ciblés").
const CATEGORY_TO_SHOPIFY_TAG: Record<string, string> = {
  "Anti-Âge": "Anti-Âge",
  Éclat: "Éclat",
  "Nettoyants & Exfoliants": "Exfoliation",
  "Soins Ciblés": "Soins",
};

export async function fetchShopifyProducts(category?: string, first = 50) {
  const tag = category ? (CATEGORY_TO_SHOPIFY_TAG[category] ?? category) : undefined;
  const query = tag ? `tag:'${tag}'` : undefined;
  const data = await shopifyFetch<ProductsQueryResult>(PRODUCTS_QUERY, { first, query });
  return data.products.edges.map(({ node }) => toProduct(node));
}

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
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
      compareAtPriceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      seo {
        title
        description
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
