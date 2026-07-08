import { NextResponse } from "next/server";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";
import { fetchShopifyProductByHandle, shopifyConfigured } from "@/lib/shopify";

export async function GET(_request: Request, { params }: { params: Promise<{ slotId: string }> }) {
  const { slotId } = await params;

  if (!shopifyConfigured) {
    const product = FALLBACK_PRODUCTS.find((p) => p.slotId === slotId);
    if (!product) {
      return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  try {
    const product = await fetchShopifyProductByHandle(slotId);
    if (!product) {
      return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error("Shopify product fetch failed:", err);
    return NextResponse.json({ message: "Impossible de charger le produit depuis Shopify." }, { status: 502 });
  }
}
