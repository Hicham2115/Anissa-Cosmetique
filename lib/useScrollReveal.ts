"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Animates every [data-reveal] descendant of the returned ref: fades and
// rises into place, staggered in DOM order, once the container is ~85% up
// the viewport. Re-runs when `deps` changes so it can pick up elements that
// only exist after async data (e.g. useQuery) has rendered.
export function useScrollReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const scopeRef = useRef<T | null>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scopeRef.current);
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 28 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        // Drop the inline transform once revealed so it stops overriding
        // any CSS-driven hover transforms (e.g. hover:translate-x-2).
        clearProps: "transform",
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: scopeRef, dependencies: deps }
  );

  return scopeRef;
}
