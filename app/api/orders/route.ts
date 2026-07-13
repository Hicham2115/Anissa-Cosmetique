import { NextResponse } from "next/server";
import { codOrderSchema, zodErrorResponse } from "@/lib/validations";
import { createCodOrder, shopifyAdminConfigured } from "@/lib/shopifyAdmin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = codOrderSchema.safeParse(body);

  if (!result.success) {
    return zodErrorResponse(result, "Formulaire invalide.");
  }

  if (!shopifyAdminConfigured) {
    console.log("[COD order — Shopify Admin API not configured]", result.data);
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  }

  try {
    const order = await createCodOrder(result.data);
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
