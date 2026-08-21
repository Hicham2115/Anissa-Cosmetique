import { NextResponse } from "next/server";
import { codOrderSchema, zodErrorResponse } from "@/lib/validations";
import { createCodOrder, shopifyAdminConfigured } from "@/lib/shopifyAdmin";
import { getProductBySlug } from "@/lib/getProductBySlug";
import { computeShippingFee } from "@/lib/shipping";
import { parsePriceAmount } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = codOrderSchema.safeParse(body);

  if (!result.success) {
    return zodErrorResponse(result, "Formulaire invalide.");
  }

  // Re-check stock server-side — the client already hides out-of-stock
  // products/gifts, but that alone doesn't stop a direct API request.
  const [product, gift] = await Promise.all([
    getProductBySlug(result.data.productSlug),
    result.data.giftSlug ? getProductBySlug(result.data.giftSlug) : Promise.resolve(null),
  ]);
  if (!product || product.availableForSale === false) {
    return NextResponse.json({ message: "Ce produit est en rupture de stock." }, { status: 409 });
  }
  if (result.data.giftSlug && (!gift || gift.availableForSale === false)) {
    return NextResponse.json({ message: "Le cadeau sélectionné est en rupture de stock." }, { status: 409 });
  }

  // Same free-shipping-over-499-MAD rule as the cart checkout (lib/shipping.ts)
  // — the gift line is free so it doesn't count toward the subtotal.
  const subtotal = parsePriceAmount(product.price) * result.data.quantity;
  const shippingFee = computeShippingFee(subtotal);

  if (!shopifyAdminConfigured) {
    console.log("[COD order — Shopify Admin API not configured]", result.data, { shippingFee });
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  }

  try {
    const order = await createCodOrder(result.data, shippingFee);
    console.log("[COD order created in Shopify]", order.name);
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  } catch (err) {
    console.error("Shopify order creation failed:", err);
    return NextResponse.json(
      { message: "Impossible d'enregistrer la commande. Veuillez réessayer ou nous contacter." },
      { status: 502 }
    );
  }
}
