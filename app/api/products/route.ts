import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProducts, shopifyConfigured } from "@/lib/shopify";
import { PACKS_CATEGORY, PACK_PRODUCT_HANDLES } from "@/lib/packs";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");

  if (!shopifyConfigured) {
    const products = category
      ? category === PACKS_CATEGORY
        ? FALLBACK_PRODUCTS.filter((p) => PACK_PRODUCT_HANDLES.includes(p.slotId))
        : FALLBACK_PRODUCTS.filter((p) => p.tags?.includes(category))
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
