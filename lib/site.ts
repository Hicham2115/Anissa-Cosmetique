import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anissacosmetics.com";
export const SITE_NAME = "Anissa Cosmetics";
export const SITE_DESCRIPTION =
  "Anissa Cosmetics — soins et cosmétiques de luxe discret, formulés à Casablanca, Maroc. Formules propres, ingrédients naturels, fabriqués au Maroc.";
export const OG_IMAGE = "/og-image.jpg";

// Next.js does not deep-merge `openGraph`/`twitter` between layout and page
// metadata — a page-level object replaces the parent's entirely. Spread
// these into every page's openGraph/twitter so the image and card type
// survive alongside the page's own title/description/url.
export const OG_IMAGE_META: NonNullable<Metadata["openGraph"]>["images"] = [
  { url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME },
];

export function pageOpenGraph(overrides: Metadata["openGraph"]): Metadata["openGraph"] {
  return { siteName: SITE_NAME, locale: "fr_MA", images: OG_IMAGE_META, ...overrides };
}

export function pageTwitter(overrides: Metadata["twitter"]): Metadata["twitter"] {
  return { card: "summary_large_image", images: [OG_IMAGE], ...overrides };
}
