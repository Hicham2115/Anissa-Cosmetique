import { NextResponse } from "next/server";
import { PRODUCT_REVIEWS } from "@/lib/productReviews";

export async function GET(_request: Request, { params }: { params: Promise<{ slotId: string }> }) {
  const { slotId } = await params;
  return NextResponse.json(PRODUCT_REVIEWS[slotId] ?? []);
}
