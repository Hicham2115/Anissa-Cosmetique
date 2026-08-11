import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProducts, shopifyConfigured } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/boutique", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/conditions-generales", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/politique-de-confidentialite", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const products = shopifyConfigured
    ? await fetchShopifyProducts(undefined, 250).catch(() => FALLBACK_PRODUCTS)
    : FALLBACK_PRODUCTS;

  const productRoutes = products.map(({ slotId }) => ({
    path: `/produits/${slotId}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...productRoutes].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
