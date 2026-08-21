import { NextResponse } from "next/server";
import type { Category } from "@/lib/validations";
import { PACKS_CATEGORY, PACK_PRODUCT_HANDLES } from "@/lib/packs";
import { fetchCategoryCounts, shopifyConfigured } from "@/lib/shopify";

// Fallback counts used only when Shopify isn't configured — kept roughly in
// sync with the catalog by hand. Whenever Shopify is configured, counts are
// computed live from the actual product tags instead (see fetchCategoryCounts),
// so the displayed numbers never drift from the real catalog again.
const FALLBACK_CATEGORIES: Category[] = [
  { num: "01", name: "Anti Taches", count: 5 },
  { num: "02", name: "Anti-Âge", count: 3 },
  { num: "03", name: "Anti Imperfections", count: 5 },
  { num: "04", name: PACKS_CATEGORY, count: PACK_PRODUCT_HANDLES.length },
  { num: "05", name: "Aloe Vera", count: 2 },
  { num: "06", name: "Corps & Soleil", count: 2 },
];

export async function GET() {
  if (!shopifyConfigured) {
    return NextResponse.json(FALLBACK_CATEGORIES);
  }

  try {
    const counts = await fetchCategoryCounts(FALLBACK_CATEGORIES.map((c) => c.name));
    const categories = FALLBACK_CATEGORIES.map((c) => ({ ...c, count: counts[c.name] ?? c.count }));
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Failed to fetch live category counts:", err);
    return NextResponse.json(FALLBACK_CATEGORIES);
  }
}
