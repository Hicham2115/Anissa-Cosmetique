"use client";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function FeaturedBanner() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className="group relative mt-16 h-[340px] overflow-hidden sm:h-[400px] md:mt-24 md:h-[460px]">
      <ImagePlaceholder
        label="Image lifestyle collection saisonnière"
        className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink/50 via-ink/10 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-4 sm:px-6">
        <div className="max-w-[480px]">
          <div data-reveal className="mb-4 text-xs tracking-[0.2em] text-sand-light uppercase">
            Édition Limitée
          </div>
          <h2 data-reveal className="mb-5.5 font-serif text-[28px] leading-tight font-semibold text-cream sm:text-[38px]">
            Le Sérum À La Rose, réinventé.
          </h2>
          <button data-reveal className="cursor-pointer rounded-lg border border-cream bg-transparent px-8 py-3.5 text-xs tracking-wider text-cream uppercase transition-all duration-200 hover:scale-105 hover:bg-white/10 active:scale-95">
            Découvrir
          </button>
        </div>
      </div>
    </div>
  );
}
