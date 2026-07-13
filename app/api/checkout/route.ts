import { NextResponse } from "next/server";
import { checkoutSchema, zodErrorResponse } from "@/lib/validations";
import { createCheckoutUrlForItems, shopifyConfigured } from "@/lib/shopify";

export async function POST(request: Request) {
  if (!shopifyConfigured) {
    return NextResponse.json({ message: "Shopify n'est pas configuré." }, { status: 502 });
  }

  const body = await request.json().catch(() => null);
  const result = checkoutSchema.safeParse(body);
  if (!result.success) {
    return zodErrorResponse(result, "Requête invalide.");
  }

  try {
    const checkoutUrl = await createCheckoutUrlForItems(result.data.items);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout creation failed:", err);
    return NextResponse.json({ message: "Impossible de créer le paiement Shopify." }, { status: 502 });
  }
}
