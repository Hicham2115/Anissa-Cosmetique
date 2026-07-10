import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProducts, shopifyConfigured } from "@/lib/shopify";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");

  if (!shopifyConfigured) {
    const products = category
      ? FALLBACK_PRODUCTS.filter((p) => p.tags?.includes(category))
      : FALLBACK_PRODUCTS;
    return NextResponse.json(products);
  }

  try {
    const products = await fetchShopifyProducts(category ?? undefined);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Shopify products fetch failed:", err);
    return NextResponse.json({ message: "Impossible de charger les produits depuis Shopify." }, { status: 502 });
  }
}
