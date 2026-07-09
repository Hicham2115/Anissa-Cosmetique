import type { Product } from "@/lib/validations";

export const FALLBACK_PRODUCTS: Product[] = [
  { id: "p1", slotId: "p1", name: "Sérum À La Rose", subtitle: "Sérum visage éclaircissant", price: "390 MAD", badge: "Best-seller", image: null, images: [] },
  { id: "p2", slotId: "p2", name: "Crème de Nuit à l'Argan", subtitle: "Crème réparatrice de nuit", price: "320 MAD", badge: null, image: null, images: [] },
  { id: "p3", slotId: "p3", name: "Rouge à Lèvres Velours Mat", subtitle: "Longue tenue, 6 teintes", price: "180 MAD", badge: "Nouveau", image: null, images: [] },
  { id: "p4", slotId: "p4", name: "Eau de Parfum Ambrée", subtitle: "50ml, ambre chaud et oud", price: "540 MAD", badge: null, image: null, images: [] },
];
