"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/uiStore";
import heroLifestyle from "@/app/assets/hero-lifestyle.png";
import heroMobile from "@/app/assets/hero-mobile.png";

const MARQUEE = [
  "Formules Propres",
  "Ingrédients Naturels",
  "Fabriqué au Maroc",
  "Non Testé sur les Animaux",
];

export function Hero() {
  const loop = [...MARQUEE, ...MARQUEE];
  const isLoading = useUiStore((s) => s.isLoading);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isLoading) return;

      const textEls = [
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        paragraphRef.current,
        ctaRef.current,
      ];

      // Absolute positions keep everything moving while the loading overlay
      // is still fading out (0.7s), so the entrance reads as one seamless
      // handoff rather than a pause then a second animation.
      const mobileTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      mobileTl
        .set(mobileImageRef.current, { opacity: 0, scale: 1.06 })
        .set(mobileTextRef.current, { opacity: 0, y: 20 })
        .to(
          mobileImageRef.current,
          { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
          0,
        )
        .to(mobileTextRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.2);

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
        .to(marqueeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.9);
    },
    { dependencies: [isLoading] },
  );

  return (
    <div className="relative overflow-hidden bg-[#EFE3D6]">
      <div className="relative block h-160 sm:h-180 md:hidden">
        <div ref={mobileImageRef} className="absolute inset-0">
          <Image
            src={heroMobile}
            alt="Masque Anti-Âge et Gel Exfoliant Anissa Cosmetics"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#efe3d6] via-[#efe3d6]/70 to-transparent" />

        <div
          ref={mobileTextRef}
          className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-6"
        >
          {/* <div className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">
            // Soins de la peau
          </div> */}
          <h2 className="font-serif text-[38px] leading-[0.98] font-semibold text-ink">
            Là où <span className="text-brown">la peau</span>
            <br />
            <span className="italic">rayonne</span>
          </h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#5c534a]">
            Découvrez une sélection de soins et cosmétiques à formules propres,
            pensés pour un éclat au quotidien.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button className="group transition-transform duration-200 hover:scale-105 active:scale-95">
              Acheter
              <ArrowRight
                className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <a
              href="/boutique"
              className="inline-flex cursor-pointer items-center rounded-full border border-ink/20 px-8 py-4 text-xs tracking-wider text-ink uppercase transition-all duration-200 hover:scale-105 hover:border-ink active:scale-95"
            >
              Tout Explorer
            </a>
          </div>
        </div>
      </div>

      <div className="relative hidden h-165 md:block lg:h-180">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={heroLifestyle}
            alt="Coffret de soins Anissa Cosmetics, masque anti-âge et gel exfoliant"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[85%_center] sm:object-[75%_center] md:object-[62%_center]"
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-4 sm:px-6">
          <div className="max-w-md">
            <div
              ref={eyebrowRef}
              className="mb-5 text-xs tracking-[0.2em] text-brown uppercase"
            >
              // Soins de la peau
            </div>
            <h1 className="font-serif text-[32px] leading-[0.98] font-semibold text-ink sm:text-[56px] md:text-[64px] lg:text-[74px] lg:leading-[0.96]">
              <span ref={line1Ref} className="block">
                Là où <span className="text-brown">la peau</span>
              </span>
              <span ref={line2Ref} className="block italic">
                rayonne
              </span>
            </h1>
            <p
              ref={paragraphRef}
              className="mt-7 max-w-sm text-[15px] leading-relaxed text-[#5c534a]"
            >
              Découvrez une sélection de soins et cosmétiques à formules
              propres, pensés pour un éclat au quotidien.
            </p>
            <div
              ref={ctaRef}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button className="group transition-transform duration-200 hover:scale-105 active:scale-95">
                Acheter
                <ArrowRight
                  className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <a
                href="/boutique"
                className="inline-flex cursor-pointer items-center rounded-full border border-ink/20 px-8 py-4 text-xs tracking-wider text-ink uppercase transition-all duration-200 hover:scale-105 hover:border-ink active:scale-95"
              >
                Tout Explorer
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="overflow-hidden border-t border-b border-border-sand bg-cream py-4 whitespace-nowrap"
      >
        <div className="animate-marquee inline-block font-serif text-lg text-ink sm:text-xl">
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
