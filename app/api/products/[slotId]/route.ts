import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/getProductBySlug";

export async function GET(_request: Request, { params }: { params: Promise<{ slotId: string }> }) {
  const { slotId } = await params;

  try {
    const product = await getProductBySlug(slotId);
    if (!product) {
      return NextResponse.json({ message: "Produit introuvable." }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error("Shopify product fetch failed:", err);
    return NextResponse.json({ message: "Impossible de charger le produit depuis Shopify." }, { status: 502 });
  }
}
