import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";
import { ProductDetail } from "./ProductDetail";

const TITLE = "Masque Éclaircissant — Nila & Niacinamide";
const DESCRIPTION =
  "Masque Éclaircissant Anissa à la nila et à la niacinamide : unifie le teint et redonne de l'éclat aux peaux ternes, formulé et fabriqué à Casablanca.";
const OG_TITLE = `${TITLE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/produits/masque-eclaircissant" },
  openGraph: pageOpenGraph({ title: OG_TITLE, description: DESCRIPTION, url: "/produits/masque-eclaircissant" }),
  twitter: pageTwitter({ title: OG_TITLE, description: DESCRIPTION }),
};

export default function MasqueEclaircissantPage() {
  return (
    <ErrorBoundary>
      <SiteHeader />
      <main>
        <ProductDetail />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
