"use client";

import Image from "next/image";
import { Droplet, Gift, Leaf, Shield, Sparkles, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";
import eclatImage from "@/app/assets/categories/eclat.webp";
import eclat2Image from "@/app/assets/eclat2.png";

const ECLAT_FEATURES = [
  { icon: Sparkles, label: "Éclaircit le teint" },
  { icon: Waves, label: "Unifie la peau" },
  { icon: Droplet, label: "Hydrate et nourrit" },
  { icon: Shield, label: "Renforce la barrière cutanée" },
];

export function EclatSpotlight() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={scopeRef}
      className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="text-center mb-10">
        <h2
          data-reveal
          className="font-serif text-3xl font-bold tracking-wide text-black uppercase sm:text-4xl"
        >
          Éclaircissant
        </h2>
        <div
          data-reveal
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-[#0252ba]" aria-hidden="true" />
          <Leaf
            className="h-4 w-4 text-[#0252ba]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="h-px w-16 bg-[#0252ba]" aria-hidden="true" />
        </div>
        <p data-reveal className="mt-4 text-[15px] text-[#5c534a]">
          Révélez une peau plus jeune, plus ferme et éclatante.
        </p>
      </div>
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="relative w-full">
          <Image
            data-reveal
            src={eclatImage}
            alt="Masque Éclaircissant Anissa Cosmetics"
            sizes="(min-width: 898px) 90vw, 90vw"
            className="h-auto w-full rounded-2xl"
          />
          <div
            data-reveal
            className="mt-12 flex items-center gap-3 rounded-full bg-[#3985e9]/20 p-3 pr-5 sm:gap-5 sm:p-5 sm:pr-10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-14 sm:w-14">
              <Gift
                className="h-4 w-4 text-[#3985e9] sm:h-6 sm:w-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="text-[12px] font-bold tracking-wide text-[#3985e9] uppercase sm:text-[15px]">
                Offert pour tout achat d&apos;un pack
              </div>
              <div className="mt-1 text-[11px] text-[#5c534a] sm:text-[13px]">
                Profitez de ce masque éclaircissant en cadeau.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-black uppercase"
          >
            Masque Éclaircissant
          </div>
          <h2
            data-reveal
            className="mt-3 font-serif text-3xl leading-tight font-semibold text-black sm:text-4xl"
          >
            Un teint lumineux, une peau uniforme et éclatante
          </h2>
          <div data-reveal className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-black/30" aria-hidden="true" />
            <Sparkles
              className="h-4 w-4 text-black"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <p
            data-reveal
            className="mt-5 text-[15px] leading-relaxed text-[#5c534a]"
          >
            Notre Masque Éclaircissant à la Nila et Niacinamide est spécialement
            formulé pour illuminer le teint, atténuer les taches et unifier la
            peau. Il aide à réduire l&apos;hyperpigmentation, à lisser le grain
            de peau et à révéler un éclat naturel dès les premières
            utilisations.
          </p>

          <div className="mt-8 grid grid-cols-4 gap-3 text-center">
            {ECLAT_FEATURES.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                data-reveal
                className={cn(
                  "flex flex-col items-center gap-2 px-1",
                  i > 0 && "border-l border-black/10",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-black">
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-[10px] font-semibold tracking-wide text-black uppercase sm:text-[11px]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <h3
            data-reveal
            className="mt-10 text-center font-serif text-lg font-bold text-black uppercase"
          >
            Des Résultats Visibles
          </h3>

          <div className="mt-5 overflow-hidden rounded-2xl">
            <Image
              data-reveal
              src={eclat2Image}
              alt="Résultats avant/après 28 jours - Masque Éclaircissant Anissa Cosmetics"
              sizes="(min-width: 768px) 60vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
