"use client";

import Image from "next/image";
import { Gift } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import bonusImage from "@/app/assets/categories/bonus.webp";

export function BonusOffer() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={scopeRef}
      className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-14"
    >
      <div className="flex items-start gap-6">
        <div
          data-reveal
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#e8732a] bg-sand-light text-black"
        >
          <Gift
            className="h-7 w-7 text-[#e8732a]"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </div>
        <div>
          <div
            data-reveal
            className="mb-4 flex items-center gap-3 text-xs tracking-[0.25em] text-[#e8732a] uppercase"
          >
            Cadeau Exclusif
            <span className="h-px w-8 bg-gold/40" aria-hidden="true" />
          </div>
          <h2
            data-reveal
            className="font-serif text-[32px] leading-[1.05] font-semibold text-black sm:text-4xl"
          >
            Un produit
            <br />
            <span className="italic">offert.</span>
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#5c534a]"
          >
            La Crème Éclaircissante Mains ou le Fluide Solaire SPF 50+, au
            choix, pour tout achat d&apos;un pack Anissa Cosmetics.
          </p>
        </div>
      </div>

      <div data-reveal className="overflow-hidden rounded-[28px]">
        <Image
          src={bonusImage}
          alt="Cadeau exclusif : recevez la Crème Éclaircissante Mains ou le Fluide Solaire SPF 50+ offert pour tout achat d'un pack Anissa Cosmetics"
          className="h-auto w-full"
          sizes="(min-width: 768px) 60vw, 100vw"
        />
      </div>
    </div>
  );
}
