"use client";

import Image from "next/image";
import { Droplet, Gift, Leaf, Sparkles, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";
import antirideImage from "@/app/assets/categories/antiage.png";
import antiride2Image from "@/app/assets/antiride2.png";

const RESULT_FEATURES = [
  { icon: Waves, label: "Lisse les rides et ridules" },
  { icon: Droplet, label: "Hydrate & repulpe" },
  { icon: Sparkles, label: "Unifie le teint et ravive l'éclat" },
];

export function AntiAgeSpotlight() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={scopeRef}
      className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="text-center">
        <h2
          data-reveal
          className="font-serif text-3xl font-bold tracking-wide text-black uppercase sm:text-4xl"
        >
          Anti-Âge
        </h2>
        <div
          data-reveal
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-[#c23b56]/40" aria-hidden="true" />
          <Leaf
            className="h-4 w-4 text-[#c23b56]/60"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="h-px w-16 bg-[#c23b56]/40" aria-hidden="true" />
        </div>
        <p data-reveal className="mt-4 text-[15px] text-[#5c534a]">
          Révélez une peau plus jeune, plus ferme et éclatante.
        </p>
      </div>

      <div className="mt-14 grid gap-16 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="relative w-full">
          <Image
            data-reveal
            src={antirideImage}
            alt="Crème Anti-Rides Anissa Cosmetics"
            sizes="(min-width: 898px) 90vw, 90vw"
            className="h-auto w-full rounded-2xl"
          />
          <div
            data-reveal
            className="mt-12 flex items-center gap-5 rounded-full bg-[#c23b56]/8 p-4 pr-8 sm:p-5 sm:pr-10"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#c23b56]">
              <Gift className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-wide text-[#c23b56] uppercase">
                Offert pour tout achat d&apos;un pack
              </div>
              <div className="mt-1 text-[13px] text-[#5c534a]">
                Profitez de cette crème anti-rides en cadeau.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            data-reveal
            className="flex items-center justify-center gap-3 md:justify-start"
          >
            <span className="h-px w-10 bg-[#c23b56]/40" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#c23b56] uppercase">
              Résultats Visibles
            </span>
            <span className="h-px w-10 bg-[#c23b56]/40" aria-hidden="true" />
          </div>
          <h3
            data-reveal
            className="mt-3 text-center text-xl font-bold text-black sm:text-2xl md:text-left"
          >
            Une peau visiblement plus lisse et rajeunie
          </h3>

          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              data-reveal
              src={antiride2Image}
              alt="Résultats avant/après 4 semaines - Crème Anti-Rides Anissa Cosmetics"
              sizes="(min-width: 768px) 60vw, 90vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {RESULT_FEATURES.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                data-reveal
                className={cn(
                  "flex flex-col items-center gap-2 px-2",
                  i > 0 && "border-l border-black/10",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c23b56]/40 text-[#c23b56]">
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-[11px] font-semibold tracking-wide text-[#c23b56] uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="mt-8 text-center text-[14px] leading-relaxed text-[#5c534a] md:text-left"
          >
            Notre gamme Anti-Âge a été spécialement conçue pour atténuer
            visiblement les rides et les signes du vieillissement tout en
            redonnant à la peau fermeté, douceur et éclat. Enrichie en Acide
            Hyaluronique et en actifs soigneusement sélectionnés, elle hydrate
            intensément, améliore l&apos;élasticité de la peau et révèle un
            teint plus lisse, plus lumineux et visiblement rajeuni jour après
            jour.
          </p>
        </div>
      </div>
    </div>
  );
}
