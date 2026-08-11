"use client";

import Link from "next/link";
import {
  Stethoscope,
  Layers,
  Star,
  ShieldCheck,
  Leaf,
  Quote,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/lib/useScrollReveal";

const VALUES: {
  icon: typeof Leaf;
  label: string;
  description: string;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    icon: Stethoscope,
    label: "Double Expertise",
    description:
      "Caution scientifique (chimiste) et dermatologique (dermo-conseillère), unique sur le marché.",
  },
  {
    icon: Layers,
    label: "Routines Ciblées",
    description:
      "Un catalogue structuré en 3 routines : anti-âge, éclat, anti-imperfections.",
  },
  {
    icon: Star,
    label: "Preuve Sociale",
    description: "Des formules déjà plébiscitées, notées 5/5 par nos clientes.",
  },
  {
    icon: ShieldCheck,
    label: "Qualité",
    description:
      "Certifié ISO 22716 (N° 2022CBPF01.16) par l'IMANOR, valable jusqu'en 2029.",
    href: "/certificat-iso-22716.pdf",
    linkLabel: "Voir le certificat",
  },
];

export function ValueProps() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      id="value-props"
      ref={scopeRef}
      className="mt-16 scroll-mt-24 bg-cream py-12 sm:mt-24 sm:py-16"
    >
      <div className="mx-auto max-w-330 px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16">
          <div>
            <div
              data-reveal
              className="mb-2 flex items-center gap-4 text-[11px] font-semibold tracking-[0.28em] text-brown uppercase"
            >
              <span>Notre Histoire</span>
              <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
            </div>
            <h2
              data-reveal
              className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-4xl"
            >
              Le savoir scientifique{" "}
              <span className="font-normal text-brown italic">
                au service de la nature
              </span>
            </h2>

            <div className="mt-5 flex max-w-lg gap-3">
              <Quote
                data-reveal
                className="mt-0.5 h-6 w-6 shrink-0 text-gold/60"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <div className="border-l border-border-sand pl-4">
                <p
                  data-reveal
                  className="text-[15px] leading-relaxed text-[#5c534a]"
                >
                  Anissa est née de la vision d&rsquo;un couple maroco-belge 
                  une conseillère dermatologique et un chimiste revenus au
                  Maroc avec une ambition commune : mettre leur savoir
                  scientifique au service de la nature.
                </p>
                <p
                  data-reveal
                  className="mt-2 text-[15px] leading-relaxed text-[#5c534a]"
                >
                  Anissa Cosmetics, c&rsquo;est la rencontre entre nature et
                  innovation pour une jeunesse sans âge : trois routines
                  anti-âge, éclat et anti-imperfections formulées avec rigueur
                  et fabriquées selon la norme ISO 22716.
                </p>
              </div>
            </div>

            <Link href="/boutique">
              <Button
                data-reveal
                className="mt-5 px-6 text-[11px] tracking-[0.18em] transition-transform duration-200 hover:scale-105 active:scale-95"
                size="sm"
              >
                <Leaf
                  className="mr-2 h-3.5 w-3.5 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Découvrir nos soins
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {VALUES.map(
              ({ icon: Icon, label, description, href, linkLabel }) => (
                <div
                  key={label}
                  data-reveal
                  className="group rounded-xl border border-border-sand bg-white p-4 transition-colors duration-300 hover:bg-sand-light sm:p-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      className="h-4 w-4 text-brown"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-brown transition-colors duration-200 group-hover:text-ink">
                    {label}
                  </div>
                  <div className="mt-1 text-sm leading-snug text-[#000000]">
                    {description}
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-brown underline underline-offset-2"
                    >
                      <FileText
                        className="h-3 w-3"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {linkLabel}
                    </a>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
