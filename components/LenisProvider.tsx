"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance, setLenisInstance } from "@/lib/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    // Loaded dynamically (not statically imported) so lenis + gsap aren't
    // part of the initial bundle every route has to parse before hydrating —
    // smooth scroll isn't needed for first paint, only after mount.
    let cleanup = () => {};

    Promise.all([import("lenis"), import("gsap")]).then(([{ default: Lenis }, { default: gsap }]) => {
      if (cancelled) return;

      const lenis = new Lenis();
      setLenisInstance(lenis);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Lenis caches document height in `dimensions` and only re-measures it
      // via its own ResizeObserver on <html> — which in practice can miss
      // layout shifts (async content, sticky/fixed elements, images/fonts
      // settling), leaving its cached scroll limit shorter than the real page.
      // Once that happens, scrolling silently caps out before the actual
      // bottom and only a full refresh re-measures it. Rather than chase every
      // possible trigger, poll the real height and force a re-sync the moment
      // it drifts from what Lenis thinks it is — this is cheap (one property
      // read) and self-heals regardless of the cause.
      let lastKnownHeight = document.documentElement.scrollHeight;
      const watchdog = window.setInterval(() => {
        const height = document.documentElement.scrollHeight;
        if (height !== lastKnownHeight) {
          lastKnownHeight = height;
          lenis.resize();
        }
      }, 400);

      cleanup = () => {
        window.clearInterval(watchdog);
        setLenisInstance(null);
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    // Lenis measures scroll height from the viewport-sized <html> element, which
    // doesn't fire its own ResizeObserver when only the scrollable content changes,
    // so a route change to a page with different content height leaves it stuck
    // using the previous page's (shorter) scroll limit unless we resize it manually.
    const raf = requestAnimationFrame(() => {
      const lenis = getLenisInstance();
      lenis?.resize();
      // Next.js's own scroll restoration doesn't reach Lenis's virtual scroll
      // position, so without this a new route keeps showing the previous
      // page's scroll offset instead of starting at the top.
      lenis?.scrollTo(0, { immediate: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
