import Link from "next/link";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="mb-5 flex items-center gap-3 text-xs tracking-[0.25em] text-brown uppercase">
          <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          Erreur 404
          <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
        </div>
        <h1 className="font-serif text-[32px] leading-[0.98] font-semibold text-ink sm:text-5xl lg:text-6xl">
          Page <span className="text-brown italic">introuvable</span>
        </h1>
        <p className="mt-6 max-w-md text-sm text-[#8a7c6c] sm:text-base">
          Cette page n&apos;existe pas ou plus. Découvrez plutôt notre collection de soins et de cosmétiques.
        </p>
        <Link href="/boutique" className={buttonVariants({ className: "mt-9" })}>
          Voir la boutique
        </Link>
      </main>
      <Footer />
    </>
  );
}
