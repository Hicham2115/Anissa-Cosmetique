import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { BoutiqueGrid } from "./BoutiqueGrid";
import { BoutiqueHeader } from "./BoutiqueHeader";
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
        <BoutiqueHeader />
        <BoutiqueGrid />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
