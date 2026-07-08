"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
import logo from "@/app/assets/logo.png";
import { useUiStore } from "@/store/uiStore";

export function LoadingScreen() {
  const [mounted, setMounted] = useState(true);
  const el = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.set(glowRef.current, { opacity: 0, scale: 0.6 })
      .set(logoRef.current, { opacity: 0, scale: 0.92 })
      .set(lineRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" })
      .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.4, ease: "power1.out" })
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.9 }, "-=1.1")
      .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.2")
      .to({}, { duration: 0.6 })
      .to(el.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          useUiStore.getState().setLoaded();
          setMounted(false);
        },
      });
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={el}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-ink"
      role="status"
      aria-label="Chargement"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-5">
        <div ref={logoRef} className="brightness-0 invert">
          <Image src={logo} alt="Anissa Cosmetics" priority className="h-28 w-auto sm:h-36" />
        </div>
        <div className="h-px w-14 overflow-hidden bg-gold/20">
          <span ref={lineRef} className="block h-px w-full bg-gold" />
        </div>
      </div>
    </div>
  );
}
