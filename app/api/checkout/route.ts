import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validations";
import { createCheckoutUrlForItems, shopifyConfigured } from "@/lib/shopify";

export async function POST(request: Request) {
  if (!shopifyConfigured) {
    return NextResponse.json({ message: "Shopify n'est pas configuré." }, { status: 502 });
  }

  const body = await request.json().catch(() => null);
  const result = checkoutSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: result.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  try {
    const checkoutUrl = await createCheckoutUrlForItems(result.data.items);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout creation failed:", err);
    return NextResponse.json({ message: "Impossible de créer le paiement Shopify." }, { status: 502 });
  }
}
