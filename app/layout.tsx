import type { Metadata } from "next";
import { Urbanist, Mukta_Mahee, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PromoPopup } from "@/components/PromoPopup";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, OG_IMAGE, SOCIAL_PROFILES } from "@/lib/site";

// Brand type spec calls for Roden (headings) and Lavender (slogan), which
// aren't distributed on Google Fonts — Urbanist and Josefin Sans stand in
// as the closest geometric/extended matches until real font files arrive.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const muktaMahee = Mukta_Mahee({
  variable: "--font-mukta-mahee",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    "cosmétiques marocains",
    "soins visage Maroc",
    "cosmétiques de luxe Casablanca",
    "Anissa Cosmetics",
    "ingrédients naturels Maroc",
    "boutique cosmétiques en ligne",
    "nature et innovation",
    "jeunesse sans âge",
    "soins anti-âge Maroc",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "fr_MA",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  slogan: SITE_TAGLINE,
  logo: `${SITE_URL}/og-image.jpg`,
  sameAs: SOCIAL_PROFILES,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${urbanist.variable} ${muktaMahee.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <Providers>{children}</Providers>
        <PromoPopup />
        <CartDrawer />
        <WishlistDrawer />
        <ScrollToTop />
      </body>
    </html>
  );
}
