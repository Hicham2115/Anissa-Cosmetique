"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function BoutiqueHeader() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className="mb-12">
      <div data-reveal className="mb-5 text-xs tracking-[0.2em] text-brown uppercase">
        // Boutique
      </div>
      <h1 data-reveal className="font-serif text-[32px] leading-[0.98] font-semibold text-ink sm:text-5xl lg:text-6xl">
        Toute la <span className="text-brown italic">collection</span>
      </h1>
      <div data-reveal className="mt-8 border-b border-border-sand" />
    </div>
  );
}
