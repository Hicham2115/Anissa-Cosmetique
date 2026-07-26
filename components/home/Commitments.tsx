"use client";

import { Factory, FlaskConical, Globe, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

const COMMITMENTS = [
  {
    icon: Leaf,
    title: "Produits Naturels",
    description:
      "Nos formules sont enrichies en actifs naturels rigoureusement sélectionnés pour respecter votre peau et révéler sa beauté naturelle.",
    dark: true,
  },
  {
    icon: FlaskConical,
    title: "Laboratoire Pharmaceutique",
    description:
      "Nos produits sont développés et testés dans des laboratoires pharmaceutiques, respectant les normes les plus strictes de qualité et de sécurité.",
    dark: false,
  },
  {
    icon: Factory,
    title: "Fabrication Marocaine",
    description:
      "Tous nos produits sont fabriqués au Maroc, garantissant savoir-faire, traçabilité et soutien à l'économie locale.",
    dark: true,
  },
  {
    icon: Globe,
    title: "Livraison dans le Maroc",
    description:
      "Nous proposons la livraison au Maroc afin que nos produits de qualité soient accessibles où que vous soyez.",
    dark: false,
  },
];

export function Commitments() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <div
            data-reveal
            className="mb-3 font-serif text-[13px] tracking-[0.35em] text-brown uppercase"
          >
            Nos Engagements
          </div>
          <div
            data-reveal
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-gold/50" aria-hidden="true" />
            <Leaf
              className="h-4 w-4 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="h-px w-16 bg-gold/50" aria-hidden="true" />
          </div>
          <h2
            data-reveal
            className="font-serif text-4xl leading-[1.15] font-normal tracking-[0.01em] text-ink sm:text-5xl"
          >
            La <em className="font-light text-brown italic">qualité</em>, au
            cœur
            <br className="hidden sm:block" /> de tout ce que nous faisons
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map(({ icon: Icon, title, description, dark }) => (
            <div
              key={title}
              data-reveal
              className={cn(
                "flex flex-col items-center rounded-2xl border px-6 py-5 text-center transition-transform duration-300 hover:-translate-y-1",
                dark
                  ? "border-gold/30 bg-ink text-cream"
                  : "border-gold/30 bg-white text-ink",
              )}
            >
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full border",
                  dark
                    ? "border-gold/60 text-gold"
                    : "border-gold/60 text-brown",
                )}
              >
                <Icon
                  className="h-6 w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold tracking-[0.04em] uppercase">
                {title}
              </h3>
              <span
                className={cn(
                  "mt-3 mb-3 h-px w-10",
                  dark ? "bg-gold/50" : "bg-gold/60",
                )}
                aria-hidden="true"
              />
              <p
                className={cn(
                  "max-w-[22ch] text-[13px] leading-relaxed tracking-[0.01em]",
                  dark ? "text-cream/75" : "text-[#5c534a]",
                )}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
