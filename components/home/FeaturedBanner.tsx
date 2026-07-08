"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";
import bannerLifestyle from "@/app/assets/banner.png";

export function FeaturedBanner() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={scopeRef}
      className="group relative mt-16 h-[340px] overflow-hidden sm:h-[400px] md:mt-24 md:h-[680px]"
    >
      <Image
        src={bannerLifestyle}
        alt="Trio Crème Anti-Rides, Crème Éclaircissante et Fluide Solaire Anissa"
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-700 "
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink/50 via-ink/10 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-4 sm:px-6">
        <div className="max-w-[480px]">
          <div
            data-reveal
            className="mb-4 text-xs tracking-[0.2em] text-sand-light uppercase"
          >
            Collection Signature
          </div>
          <h2
            data-reveal
            className="mb-5.5 font-serif text-[28px] leading-tight font-semibold text-cream sm:text-[38px]"
          >
            Trois essentiels, un seul rituel.
          </h2>
          <button
            data-reveal
            className="cursor-pointer rounded-lg border border-cream bg-transparent px-8 py-3.5 text-xs tracking-wider text-cream uppercase transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            Découvrir
          </button>
        </div>
      </div>
    </div>
  );
}
