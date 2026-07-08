import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProducts, shopifyConfigured } from "@/lib/shopify";

export async function GET() {
  if (!shopifyConfigured) {
    return NextResponse.json(FALLBACK_PRODUCTS);
  }

  try {
    const products = await fetchShopifyProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Shopify products fetch failed:", err);
    return NextResponse.json({ message: "Impossible de charger les produits depuis Shopify." }, { status: 502 });
  }
}
