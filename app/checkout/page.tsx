import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { CheckoutClient } from "./CheckoutClient";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";

const TITLE = "Commande";
const DESCRIPTION = "Finalisez votre commande — paiement à la livraison disponible partout au Maroc.";
const OG_TITLE = `${TITLE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/checkout" },
  openGraph: pageOpenGraph({ title: OG_TITLE, description: DESCRIPTION, url: "/checkout" }),
  twitter: pageTwitter({ title: OG_TITLE, description: DESCRIPTION }),
};

export default function CheckoutPage() {
  return (
    <ErrorBoundary>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16">
        <CheckoutClient />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
