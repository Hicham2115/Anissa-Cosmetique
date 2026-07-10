import { NextResponse } from "next/server";
import type { Category } from "@/lib/validations";

const CATEGORIES: Category[] = [
  { num: "01", name: "Anti-Âge", count: 3 },
  { num: "02", name: "Éclat", count: 5 },
  { num: "03", name: "Nettoyants & Exfoliants", count: 5 },
  { num: "04", name: "Soins Ciblés", count: 5 },
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
