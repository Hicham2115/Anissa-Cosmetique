"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function BoutiqueHeader() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className="mb-12">
      <div
        data-reveal
        className="mb-5 flex items-center gap-3 text-xs tracking-[0.25em] text-brown uppercase"
      >
        Boutique
        <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
      </div>
      <h1
        data-reveal
        className="font-serif text-[32px] leading-[0.98] font-semibold text-ink sm:text-5xl lg:text-6xl"
      >
        Toute la <span className="text-brown italic">Collection</span>
      </h1>
      <div
        data-reveal
        className="mt-8 h-px bg-linear-to-r from-border-sand via-border-sand to-transparent"
      />
    </div>
  );
}
