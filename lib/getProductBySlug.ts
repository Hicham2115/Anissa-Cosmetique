import "server-only";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProductByHandle, shopifyConfigured } from "@/lib/shopify";
import type { Product } from "@/lib/validations";

// Shared by the /api/products/[slotId] route handler and generateMetadata
// on the product detail page, so SEO tags reflect the same live Shopify
// data as the page content instead of a slug-derived placeholder.
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!shopifyConfigured) {
    return FALLBACK_PRODUCTS.find((p) => p.slotId === slug) ?? null;
  }
  return fetchShopifyProductByHandle(slug);
}
