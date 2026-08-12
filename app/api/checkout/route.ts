import { NextResponse } from "next/server";
import { checkoutSchema, zodErrorResponse } from "@/lib/validations";
import { createCheckoutUrlForItems, shopifyConfigured } from "@/lib/shopify";
import { getProductBySlug } from "@/lib/getProductBySlug";

export async function POST(request: Request) {
  if (!shopifyConfigured) {
    return NextResponse.json({ message: "Shopify n'est pas configuré." }, { status: 502 });
  }

  const body = await request.json().catch(() => null);
  const result = checkoutSchema.safeParse(body);
  if (!result.success) {
    return zodErrorResponse(result, "Requête invalide.");
  }

  // Re-check stock server-side — the client already hides out-of-stock
  // products, but that alone doesn't stop a direct API request.
  const products = await Promise.all(result.data.items.map((item) => getProductBySlug(item.handle)));
  if (products.some((p) => !p || p.availableForSale === false)) {
    return NextResponse.json(
      { message: "Un ou plusieurs produits de votre panier sont en rupture de stock." },
      { status: 409 },
    );
  }

  try {
    const checkoutUrl = await createCheckoutUrlForItems(result.data.items);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout creation failed:", err);
    return NextResponse.json({ message: "Impossible de créer le paiement Shopify." }, { status: 502 });
  }
}
