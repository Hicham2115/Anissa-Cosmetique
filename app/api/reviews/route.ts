import { NextResponse } from "next/server";
import type { Review } from "@/lib/validations";

const REVIEWS: Review[] = [
  { id: "r1", quote: "Ma peau n'a jamais été aussi apaisée. Le sérum pénètre instantanément et le parfum est très discret.", name: "Salma B.", stars: 5, timeAgo: "il y a 2 mois" },
  { id: "r2", quote: "Le packaging seul donne l'impression d'un cadeau. Mais ce sont les résultats qui me font revenir.", name: "Yasmine T.", stars: 5, timeAgo: "il y a 3 mois" },
  { id: "r3", quote: "Enfin une marque marocaine qui se sent vraiment premium, pas juste marketée comme telle.", name: "Nadia K.", stars: 4, timeAgo: "il y a 4 mois" },
];

export async function GET() {
  return NextResponse.json(REVIEWS);
}
