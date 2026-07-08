"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { setLenisInstance } from "@/lib/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    setLenisInstance(lenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      setLenisInstance(null);
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);
  return <>{children}</>;
}
