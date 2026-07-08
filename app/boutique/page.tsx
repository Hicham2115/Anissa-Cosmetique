import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { BoutiqueGrid } from "./BoutiqueGrid";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";

const TITLE = "Boutique";
const DESCRIPTION = "Découvrez toute la gamme Anissa Cosmetics : soins, maquillage, parfums et coffrets cadeaux.";
const OG_TITLE = `${TITLE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/boutique" },
  openGraph: pageOpenGraph({ title: OG_TITLE, description: DESCRIPTION, url: "/boutique" }),
  twitter: pageTwitter({ title: OG_TITLE, description: DESCRIPTION }),
};

export default function BoutiquePage() {
  return (
    <ErrorBoundary>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-xs tracking-[0.2em] text-brown uppercase">Boutique</div>
        <h1 className="mb-12 font-serif text-4xl font-semibold text-ink sm:text-5xl">Toute la collection</h1>
        <BoutiqueGrid />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
