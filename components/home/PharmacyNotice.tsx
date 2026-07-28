"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export function PharmacyNotice() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={scopeRef}
      className="bg-ink px-4 py-20 text-center sm:px-6 sm:py-18"
    >
      <div className="mx-auto max-w-xl">
        <div
          data-reveal
          className="mb-5 flex items-center justify-center gap-3 text-xs tracking-[0.35em] text-gold uppercase"
        >
          <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
          Prochainement
          <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
        </div>

        <h2
          data-reveal
          className="font-serif text-4xl leading-[1.15] font-normal text-cream sm:text-5xl"
        >
          Anissa Cosmetics arrive
          <br />
          <em className="font-light text-gold italic">en pharmacie</em>
        </h2>

        <p
          data-reveal
          className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-cream/60"
        >
          Nos soins seront très prochainement disponibles dans une sélection de
          pharmacies partenaires, partout au Maroc.
        </p>
      </div>
    </div>
  );
}
