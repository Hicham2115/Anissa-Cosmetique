"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { getLenisInstance, setLenisInstance } from "@/lib/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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

  useEffect(() => {
    // Lenis measures scroll height from the viewport-sized <html> element, which
    // doesn't fire its own ResizeObserver when only the scrollable content changes,
    // so a route change to a page with different content height leaves it stuck
    // using the previous page's (shorter) scroll limit unless we resize it manually.
    const raf = requestAnimationFrame(() => getLenisInstance()?.resize());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
