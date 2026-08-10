import { NextResponse } from "next/server";
import type { Category } from "@/lib/validations";
import { PACKS_CATEGORY, PACK_PRODUCT_HANDLES } from "@/lib/packs";

const CATEGORIES: Category[] = [
  { num: "01", name: "Anti-Âge", count: 3 },
  { num: "02", name: "Éclat", count: 5 },
  { num: "03", name: "Nettoyants & Exfoliants", count: 5 },
  { num: "04", name: PACKS_CATEGORY, count: PACK_PRODUCT_HANDLES.length },
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
