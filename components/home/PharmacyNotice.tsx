"use client";

import { FlaskConical, Leaf } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function PharmacyNotice() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className=" px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-full overflow-hidden rounded-3xl border border-gold/30 bg-emerald-950 px-6 py-20 text-center sm:px-10 sm:py-24">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-64 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <Leaf
          className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 -rotate-12 text-gold/10"
          strokeWidth={1}
          aria-hidden="true"
        />
        <FlaskConical
          className="pointer-events-none absolute -right-8 -bottom-8 h-48 w-48 rotate-12 text-gold/10"
          strokeWidth={1}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-xl">
          <Leaf
            data-reveal
            className="mx-auto mb-3 h-4 w-4 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
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

          <div
            data-reveal
            className="mt-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
            <Leaf
              className="h-4 w-4 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
          </div>

          <p
            data-reveal
            className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-cream/60"
          >
            Nos soins seront très prochainement disponibles dans une sélection
            de pharmacies partenaires, partout au Maroc.
          </p>
        </div>

        <div
          className="absolute right-10 bottom-0 left-10 h-px bg-gold/40"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
