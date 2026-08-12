import { NextResponse } from "next/server";
import type { Category } from "@/lib/validations";
import { PACKS_CATEGORY, PACK_PRODUCT_HANDLES } from "@/lib/packs";

const CATEGORIES: Category[] = [
  { num: "01", name: "Anti-Âge", count: 3 },
  { num: "02", name: "Anti Taches", count: 5 },
  { num: "03", name: "Anti Imperfections", count: 5 },
  { num: "04", name: PACKS_CATEGORY, count: PACK_PRODUCT_HANDLES.length },
  { num: "05", name: "Aloe Vera", count: 2 },
  { num: "06", name: "Corps & Soleil", count: 2 },
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
