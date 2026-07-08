"use client";

import Image from "next/image";
import { HeartHandshake, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import productLaitCorporel from "@/app/assets/product-lait-corporel-editorial.png";

const VALUES = [
  { icon: HeartHandshake, label: "Non testé sur les animaux" },
  { icon: Leaf, label: "Ingrédients naturels" },
  { icon: MapPin, label: "Fabriqué au Maroc" },
];

export function ValueProps() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div id="value-props" ref={scopeRef} className="mt-16 scroll-mt-24 bg-cream sm:mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-22 md:grid-cols-2 md:gap-16">
        <div data-reveal className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-light md:aspect-4/5">
          <Image
            src={productLaitCorporel}
            alt="Lait Corporel Argan Anissa"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <div data-reveal className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Notre Promesse</div>
          <h2 data-reveal className="mb-6 font-serif text-[32px] leading-tight font-semibold text-ink sm:text-[40px]">
            Des formules propres, faites avec soin au Maroc
          </h2>
          <p data-reveal className="mb-8 max-w-md text-[15px] leading-relaxed text-[#5c534a]">
            Chaque formule Anissa n&rsquo;est jamais testée sur les animaux et repose sur des
            ingrédients botaniques sourcés, sans rien de synthétique par facilité. Nous
            formulons et produisons chaque lot nous-mêmes à Casablanca, pour garder la
            main sur la qualité.
          </p>

          <div className="mb-9 flex flex-wrap gap-6">
            {VALUES.map(({ icon: Icon, label }) => (
              <div key={label} data-reveal className="group flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-light transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-4 w-4 text-brown" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="text-[13px] text-ink transition-colors duration-200 group-hover:text-brown">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Button data-reveal className="rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95">
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
