export const PACKS_CATEGORY = "Packs";

export const PACK_PRODUCT_HANDLES = [
  "pack-anti-age-acide-hyaluronique-fleur-de-kangourou",
  "pack-eclat-eclaircissant-vitamine-c-niacinamide",
  "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique",
  "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou",
  "pack-eclat-eclaircissant-vitamine-c-niacinamide-1",
  "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide",
];

// Maps each pack's handle to the handles of the individual products it
// contains, shown under "Les produits de ce pack" on the pack's page.
export const PACK_PRODUCTS: Record<string, string[]> = {
  "pack-anti-age-acide-hyaluronique-fleur-de-kangourou": [
    "serum-anti-age",
    "masque-anti-age",
    "creme-anti-rides",
    "gel-nettoyant-hydratant",
    "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou",
  ],
  "pack-eclat-eclaircissant-vitamine-c-niacinamide": [
    "pack-eclaircissant",
    "masque-eclaircissant",
    "gel-nettoyant-eclaircissant",
    "creme-eclaircissante",
    "pack-eclat-eclaircissant-vitamine-c-niacinamide-1",
  ],
  "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou": [
    "serum-anti-age",
    "masque-anti-age",
    "creme-anti-rides",
    "gel-nettoyant-hydratant",
    "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou",
  ],
  "pack-eclat-eclaircissant-vitamine-c-niacinamide-1": [
    "pack-eclaircissant",
    "masque-eclaircissant",
    "gel-nettoyant-eclaircissant",
    "creme-eclaircissante",
    "pack-eclat-eclaircissant-vitamine-c-niacinamide-1",
  ],
  "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique": [
    "serum-anti-imperfections",
    "masque-detox",
    "gel-nettoyant-purifiant",
    "creme-anti-imperfections",
    "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide",
  ],
  "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide": [
    "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique",
    "serum-anti-imperfections",
    "masque-detox",
    "gel-nettoyant-purifiant",
    "creme-anti-imperfections",
  ],
};

// These 3 packs come with a free-gift choice at checkout — see OrderForm.tsx.
export const GIFT_ELIGIBLE_PACK_HANDLES = [
  "pack-anti-age-acide-hyaluronique-fleur-de-kangourou",
  "pack-eclat-eclaircissant-vitamine-c-niacinamide",
  "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique",
];

export const GIFT_OPTIONS: { handle: string; name: string }[] = [
  { handle: "fluide-solaire-spf50", name: "Fluide Solaire SPF 50+" },
  { handle: "creme-eclaircissante-mains", name: "Crème Éclaircissante Mains" },
  { handle: "gel-aloe-vera", name: "Gel d'Aloe Vera" },
  { handle: "gel-exfoliant-aha", name: "Gel Exfoliant AHA" },
];
