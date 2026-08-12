import { NextResponse } from "next/server";
import { cartOrderSchema, zodErrorResponse } from "@/lib/validations";
import { createCodCartOrder, shopifyAdminConfigured } from "@/lib/shopifyAdmin";
import { getProductBySlug } from "@/lib/getProductBySlug";
import { computeShippingFee } from "@/lib/shipping";
import { parsePriceAmount } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = cartOrderSchema.safeParse(body);

  if (!result.success) {
    return zodErrorResponse(result, "Formulaire invalide.");
  }

  // Re-check stock server-side for every item — the client already hides
  // out-of-stock products, but that alone doesn't stop a direct API request.
  const products = await Promise.all(result.data.items.map((item) => getProductBySlug(item.slug)));
  if (products.some((p) => !p || p.availableForSale === false)) {
    return NextResponse.json(
      { message: "Un ou plusieurs produits de votre panier sont en rupture de stock." },
      { status: 409 }
    );
  }

  // Shipping fee is derived from the validated cart, never trusted from the
  // client — see lib/shipping.ts for the 499 MAD free-shipping threshold.
  const subtotal = result.data.items.reduce((sum, item) => sum + parsePriceAmount(item.price) * item.quantity, 0);
  const shippingFee = computeShippingFee(subtotal);

  if (!shopifyAdminConfigured) {
    console.log("[COD cart order — Shopify Admin API not configured]", result.data, { shippingFee });
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  }

  try {
    const order = await createCodCartOrder(result.data, shippingFee);
    console.log("[COD cart order created in Shopify]", order.name);
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  } catch (err) {
    console.error("Shopify cart order creation failed:", err);
    return NextResponse.json(
      { message: "Impossible d'enregistrer la commande. Veuillez réessayer ou nous contacter." },
      { status: 502 }
    );
  }
}
