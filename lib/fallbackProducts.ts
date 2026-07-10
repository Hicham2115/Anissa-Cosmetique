import type { Product } from "@/lib/validations";

// Tags mirror the Shopify product tags used for the same catalog (see
// shopify-import/products-boutique*.csv) so filtering behaves identically
// whether data comes from Shopify or this fallback.
export const FALLBACK_PRODUCTS: Product[] = [
  { id: "p1", slotId: "creme-anti-rides", name: "Crème Anti-rides", subtitle: "Soins, Visage, Anti-Âge", price: "320 MAD", badge: "Best-seller", image: null, images: [], tags: ["Anti-Âge"] },
  { id: "p2", slotId: "masque-anti-age", name: "Masque Anti-Âge", subtitle: "Soins, Visage, Anti-Âge", price: "280 MAD", badge: null, image: null, images: [], tags: ["Anti-Âge"] },
  { id: "p3", slotId: "serum-anti-age", name: "Sérum Anti-Âge", subtitle: "Soins, Visage, Anti-Âge", price: "390 MAD", badge: "Nouveau", image: null, images: [], tags: ["Anti-Âge"] },

  { id: "p4", slotId: "creme-eclaircissante", name: "Crème Éclaircissante", subtitle: "Soins, Visage, Éclat", price: "320 MAD", badge: null, image: null, images: [], tags: ["Éclat"] },
  { id: "p5", slotId: "creme-eclaircissante-mains", name: "Crème Éclaircissante Mains", subtitle: "Soins, Mains, Éclat", price: "150 MAD", badge: null, image: null, images: [], tags: ["Éclat"] },
  { id: "p6", slotId: "masque-eclaircissant", name: "Masque Éclaircissant", subtitle: "Soins, Visage, Éclat", price: "260 MAD", badge: null, image: null, images: [], tags: ["Éclat"] },
  { id: "p7", slotId: "pack-eclaircissant", name: "Pack Éclaircissant", subtitle: "Soins, Éclat, Coffret, Promotion", price: "690 MAD", compareAtPrice: "890 MAD", badge: "Promotion", image: null, images: [], tags: ["Éclat"] },
  { id: "p8", slotId: "serum-eclaircissant", name: "Sérum Éclaircissant", subtitle: "Soins, Visage, Éclat", price: "390 MAD", badge: "Best-seller", image: null, images: [], tags: ["Éclat"] },

  { id: "p9", slotId: "gel-exfoliant-aha", name: "Gel Exfoliant AHA", subtitle: "Soins, Visage, Exfoliation", price: "220 MAD", badge: null, image: null, images: [], tags: ["Nettoyants & Exfoliants"] },
  { id: "p10", slotId: "gel-nettoyant-eclaircissant", name: "Gel Nettoyant Éclaircissant", subtitle: "Soins, Visage, Nettoyage, Éclat", price: "190 MAD", badge: null, image: null, images: [], tags: ["Nettoyants & Exfoliants"] },
  { id: "p11", slotId: "gel-nettoyant-hydratant", name: "Gel Nettoyant Hydratant", subtitle: "Soins, Visage, Nettoyage, Hydratation", price: "190 MAD", badge: null, image: null, images: [], tags: ["Nettoyants & Exfoliants"] },
  { id: "p12", slotId: "gel-nettoyant-purifiant", name: "Gel Nettoyant Purifiant", subtitle: "Soins, Visage, Nettoyage, Purification", price: "190 MAD", badge: null, image: null, images: [], tags: ["Nettoyants & Exfoliants"] },
  { id: "p13", slotId: "nettoyant-demaquillant-argan", name: "Nettoyant Démaquillant à l'Argan", subtitle: "Soins, Visage, Démaquillant, Argan", price: "210 MAD", badge: null, image: null, images: [], tags: ["Nettoyants & Exfoliants"] },

  { id: "p14", slotId: "creme-anti-imperfections", name: "Crème Anti-Imperfections", subtitle: "Soins, Visage, Anti-Imperfections", price: "280 MAD", badge: null, image: null, images: [], tags: ["Soins Ciblés"] },
  { id: "p15", slotId: "serum-anti-imperfections", name: "Sérum Anti-Imperfections", subtitle: "Soins, Visage, Anti-Imperfections", price: "390 MAD", badge: null, image: null, images: [], tags: ["Soins Ciblés"] },
  { id: "p16", slotId: "fluide-solaire-spf50", name: "Fluide Solaire SPF 50+", subtitle: "Soins, Visage, Protection Solaire", price: "240 MAD", badge: null, image: null, images: [], tags: ["Soins Ciblés"] },
  { id: "p17", slotId: "gel-aloe-vera", name: "Gel d'Aloe Vera", subtitle: "Soins, Visage, Hydratation", price: "170 MAD", badge: null, image: null, images: [], tags: ["Soins Ciblés"] },
  { id: "p18", slotId: "masque-detox", name: "Masque Détox", subtitle: "Soins, Visage, Détox", price: "260 MAD", badge: null, image: null, images: [], tags: ["Soins Ciblés"] },
];
