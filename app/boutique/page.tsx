import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { BoutiqueGrid } from "./BoutiqueGrid";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Découvrez toute la gamme Anissa Cosmetics : soins, maquillage, parfums et coffrets cadeaux.",
};

export default function BoutiquePage() {
  return (
    <ErrorBoundary>
      <AnnouncementBar />
      <Navbar />
      <main className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-xs tracking-[0.2em] text-brown uppercase">Boutique</div>
        <h1 className="mb-12 font-serif text-4xl font-semibold text-ink sm:text-5xl">Toute la collection</h1>
        <BoutiqueGrid />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
