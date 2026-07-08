import { NextResponse } from "next/server";
import type { Category } from "@/lib/validations";

const CATEGORIES: Category[] = [
  { num: "01", name: "Soins", count: 24 },
  { num: "02", name: "Maquillage", count: 18 },
  { num: "03", name: "Parfums", count: 9 },
  { num: "04", name: "Coffrets Cadeaux", count: 6 },
];

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
