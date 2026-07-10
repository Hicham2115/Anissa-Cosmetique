import { NextResponse } from "next/server";
import { codOrderSchema } from "@/lib/validations";

// Cash-on-delivery orders need the Shopify Admin API (`orderCreate`), which
// is a different credential from the Storefront token already configured
// in lib/shopify.ts — it requires a custom app in Shopify admin with
// `write_orders` scope. Until SHOPIFY_ADMIN_ACCESS_TOKEN is set, orders are
// accepted and logged server-side instead of failing outright, so the form
// stays usable while that's set up.
const adminConfigured = Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = codOrderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Formulaire invalide." },
      { status: 400 }
    );
  }

  if (!adminConfigured) {
    console.log("[COD order — Shopify Admin API not configured]", result.data);
    return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
  }

  // TODO: call Shopify's Admin API `orderCreate` mutation here with
  // result.data once SHOPIFY_ADMIN_ACCESS_TOKEN is available.
  return NextResponse.json({ message: "Commande reçue. Nous vous contacterons pour confirmer." });
}
