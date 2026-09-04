import type { Metadata } from "next";
import Image from "next/image";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";

const TITLE = "Certifications";
const DESCRIPTION = "Les certifications qualité d'Anissa Cosmetics.";
const OG_TITLE = `${TITLE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/certifications" },
  openGraph: pageOpenGraph({
    title: OG_TITLE,
    description: DESCRIPTION,
    url: "/certifications",
  }),
  twitter: pageTwitter({ title: OG_TITLE, description: DESCRIPTION }),
};

export default function CertificationsPage() {
  return (
    <ErrorBoundary>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[860px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-xs tracking-[0.2em] text-brown uppercase">
          Qualité & Conformité
        </div>
        <h1 className="mb-12 font-serif text-4xl font-semibold text-ink sm:text-5xl">
          Certifications
        </h1>

        <div className="overflow-hidden rounded-lg border border-black/10">
          <Image
            src="/certificat-iso-22716.png"
            alt="Certificat ISO 22716"
            width={1654}
            height={2339}
            className="h-auto w-full"
          />
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
