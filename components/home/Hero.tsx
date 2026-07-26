"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Droplet, Heart, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/uiStore";

const MARQUEE = [
  "Formules Propres",
  "Ingrédients Naturels",
  "Fabriqué au Maroc",
  "Non Testé sur les Animaux",
];

const FEATURES = [
  { icon: Leaf, title: "Formules Propres", subtitle: "Ingrédients doux & sûrs" },
  { icon: Droplet, title: "Efficacité Prouvée", subtitle: "Résultats visibles" },
  { icon: Heart, title: "Conçu avec Amour", subtitle: "Pour toutes les peaux" },
];

export function Hero() {
  const loop = [...MARQUEE, ...MARQUEE];
  const isLoading = useUiStore((s) => s.isLoading);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isLoading) return;

      const textEls = [
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        paragraphRef.current,
        ctaRef.current,
        featuresRef.current,
      ];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(imageRef.current, { opacity: 0, scale: 1.06 })
        .set(textEls, { opacity: 0, y: 20 })
        .set(marqueeRef.current, { opacity: 0, y: 12 })
        .to(
          imageRef.current,
          { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
          0,
        )
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to(
          line1Ref.current,
          { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" },
          0.25,
        )
        .to(
          line2Ref.current,
          { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" },
          0.4,
        )
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .to(featuresRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to(marqueeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
    },
    { dependencies: [isLoading] },
  );

  return (
    <div className="relative overflow-hidden bg-black">
      <div className="relative h-160 sm:h-180 md:h-165 lg:h-180">
        <div ref={imageRef} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-top sm:object-[85%_center] md:object-[75%_center] lg:object-[62%_center]"
          >
            <source src="/hero.mp4" media="(min-width: 768px)" />
            <source src="/hero-mobile.mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-4 sm:px-6">
          <div className="max-w-xl">
            <div
              ref={eyebrowRef}
              className="mb-5 flex items-center gap-3 text-xs tracking-[0.25em] text-white/80 uppercase drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]"
            >
              Soins de la peau
              <span className="h-px w-8 bg-white/50" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-[32px] leading-[0.98] font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] sm:text-[56px] md:text-[64px] lg:text-[74px] lg:leading-[0.96] ">
              <span ref={line1Ref} className="mb-4 whitespace-nowrap">
                Votre Peau Mérite
              </span>
              <span ref={line2Ref} className="block italic">
                L&apos;excellence.
              </span>
            </h1>
            <p
              ref={paragraphRef}
              className="mt-7 max-w-lg text-[15px] leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)] sm:text-[17px]"
            >
              Découvrez une sélection de soins et cosmétiques à formules
              propres, pensés pour un éclat au quotidien.
            </p>
            <div
              ref={ctaRef}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/boutique"
                className="group inline-flex cursor-pointer items-center gap-2 bg-white px-8 py-4 text-sm tracking-wider text-black uppercase transition-all duration-500 ease-in-out hover:bg-black hover:text-white active:scale-95"
              >
                Découvrir la Boutique
                <ArrowRight
                  className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="/boutique"
                className="inline-flex cursor-pointer items-center border border-white/50 px-8 py-4 text-sm tracking-wider text-white uppercase transition-all duration-500 ease-in-out hover:border-white active:scale-95"
              >
                En savoir plus
              </a>
            </div>
            <div
              ref={featuresRef}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
            >
              {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
                <div
                  key={title}
                  className={cn(
                    "flex items-start gap-3",
                    i > 0 && "sm:border-l sm:border-white/15 sm:pl-6",
                  )}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25">
                    <Icon
                      className="h-5 w-5 text-white"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold tracking-wide text-white uppercase whitespace-nowrap">
                      {title}
                    </div>
                    <div className="mt-1 text-[12px] text-white whitespace-nowrap">
                      {subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="relative overflow-hidden border-t border-b border-gold/25 bg-black py-5 whitespace-nowrap mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="animate-marquee inline-block font-serif text-base tracking-[0.15em] text-white uppercase sm:text-lg">
          {loop.map((msg, i) => (
            <span key={i} className="mx-6">
              {msg}
              <span className="mx-6 text-gold">&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
