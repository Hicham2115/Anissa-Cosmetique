"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bubbles, Droplet, Gift, Leaf, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";
import nettoyantImage from "@/app/assets/categories/nettoyant.png";
import nettoyant2Image from "@/app/assets/nottoyant2.png";

const CLEANSER_FEATURES = [
  { icon: Bubbles, label: "Nettoie en profondeur" },
  { icon: Droplet, label: "Élimine l'excès de sébum" },
  { icon: Leaf, label: "Hydrate et apaise" },
  { icon: Sparkles, label: "Révèle l'éclat naturel" },
];

export function CleanserSpotlight() {
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
          Nettoyants
        </h2>
        <div
          data-reveal
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-[#30c23a]" aria-hidden="true" />
          <Leaf
            className="h-4 w-4 text-[#30c23a]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="h-px w-16 bg-[#30c23a]" aria-hidden="true" />
        </div>
        <p data-reveal className="mt-4 text-[15px] text-[#5c534a]">
          Révélez une peau plus jeune, plus ferme et éclatante.
        </p>
      </div>
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="relative w-full">
          <Image
            data-reveal
            src={nettoyantImage}
            alt="Nettoyant Purifiant Anissa Cosmetics"
            sizes="(min-width: 898px) 90vw, 90vw"
            className="h-auto w-full rounded-2xl"
          />
          <Link
            href="/produits/pack-purifiant-anti-imperfections-niacinamide-acide-salicylique"
            data-reveal
            className="mt-12 flex items-center gap-3 rounded-full bg-[#30c23a]/15 p-3 pr-5 transition-colors duration-300 hover:bg-[#30c23a]/25 sm:gap-5 sm:p-5 sm:pr-10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-14 sm:w-14">
              <Gift
                className="h-4 w-4 text-[#30c23a] sm:h-6 sm:w-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-bold tracking-wide text-[#30c23a] uppercase sm:text-[15px]">
                Offert pour tout achat d&apos;un pack
              </div>
              <div className="mt-1 text-[11px] text-[#5c534a] sm:text-[13px]">
                Profitez de ce nettoyant purifiant en cadeau.
              </div>
            </div>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#30c23a] px-3 py-2 text-[11px] font-semibold tracking-wide text-white uppercase sm:px-4 sm:text-[12px]">
              Voir le pack
              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        <div>
          <div
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-[#5c534a] uppercase"
          >
            Nettoyants
          </div>
          <h2
            data-reveal
            className="mt-3 font-serif text-3xl leading-tight font-semibold text-black sm:text-4xl"
          >
            Une peau propre, fraîche et équilibrée
          </h2>
          <div data-reveal className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
            <Leaf
              className="h-4 w-4 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <p
            data-reveal
            className="mt-5 text-[15px] leading-relaxed text-[#5c534a]"
          >
            Le nettoyage est la première étape d&apos;une routine de soin
            efficace. Notre nettoyant purifiant élimine en douceur les
            impuretés, l&apos;excès de sébum et les traces de maquillage tout en
            respectant l&apos;équilibre naturel de la peau. Enrichi en extraits
            naturels, il laisse la peau fraîche, nette et lumineuse, prête à
            recevoir les soins.
          </p>

          <div className="mt-8 grid grid-cols-4 gap-3 text-center">
            {CLEANSER_FEATURES.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                data-reveal
                className={cn(
                  "flex flex-col items-center gap-2 px-1",
                  i > 0 && "border-l border-black/10",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
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
              src={nettoyant2Image}
              alt="Résultats avant/après 21 jours - Nettoyant Purifiant Anissa Cosmetics"
              sizes="(min-width: 768px) 60vw, 90vw"
              className="h-auto w-full"
            />
          </div>

          <p
            data-reveal
            className="mt-5 text-center text-[14px] leading-relaxed text-[#5c534a]"
          >
            Après plusieurs semaines d&apos;utilisation régulière, la peau
            paraît plus nette, plus uniforme et retrouve tout son éclat naturel.
          </p>
          <p
            data-reveal
            className="mt-3 text-center text-[11px] leading-relaxed text-[#8a7c6c]"
          >
            *Les résultats peuvent varier selon le type de peau et la régularité
            d&apos;utilisation. Les photos sont présentées à titre illustratif.
          </p>
        </div>
      </div>
    </div>
  );
}
