"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Lightbulb, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import productLaitCorporel from "@/app/assets/product-lait-corporel-editorial.png";

const VALUES = [
  {
    icon: Leaf,
    label: "Authenticité",
    description: "L'héritage ancestral marocain, dans chaque formule.",
  },
  {
    icon: Lightbulb,
    label: "Innovation",
    description: "La recherche au service de l'argan et du naturel.",
  },
  {
    icon: HeartHandshake,
    label: "Éthique",
    description: "Une chaîne d'approvisionnement transparente et responsable.",
  },
  {
    icon: ShieldCheck,
    label: "Qualité",
    description: "Certifié ISO 22716, contrôlé à chaque lot.",
  },
];

export function ValueProps() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      id="value-props"
      ref={scopeRef}
      className="mt-16 scroll-mt-24 bg-cream sm:mt-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-22 md:grid-cols-2 md:gap-16">
        <div
          data-reveal
          className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-light md:aspect-4/5"
        >
          <Image
            src={productLaitCorporel}
            alt="Lait Corporel Argan Anissa"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <div
            data-reveal
            className="mb-4 text-xs tracking-[0.2em] text-brown uppercase"
          >
            Notre Histoire
          </div>
          <h2
            data-reveal
            className="mb-6 font-serif text-[32px] leading-tight font-semibold text-ink sm:text-[40px]"
          >
            Le savoir scientifique au service de la nature
          </h2>
          <p
            data-reveal
            className="mb-4 max-w-md text-[15px] leading-relaxed text-[#5c534a]"
          >
            Anissa est née de la vision d&rsquo;un couple maroco-belge — une
            conseillère dermatologique et un chimiste — revenus au Maroc avec
            une ambition commune : mettre leur savoir scientifique au service de
            la nature.
          </p>
          <p
            data-reveal
            className="mb-8 max-w-md text-[15px] leading-relaxed text-[#5c534a]"
          >
            Nous croyons au pouvoir de l&rsquo;argan et à la force
            transformatrice de la nature, pour offrir aux femmes les clés
            d&rsquo;une beauté durable et d&rsquo;une jeunesse éternelle — à
            travers des soins nourrissants, protecteurs et régénérants qui
            allient science et nature.
          </p>

          <div className="mb-9 grid grid-cols-2 gap-x-6 gap-y-6">
            {VALUES.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                data-reveal
                className="group flex items-start gap-2.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    className="h-4 w-4 text-brown"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-ink transition-colors duration-200 group-hover:text-brown">
                    {label}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-[#8a7c6c]">
                    {description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/boutique">
            <Button
              data-reveal
              className="rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Découvrir nos soins
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
