"use client";

import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useDrawerAnimation(
  isOpen: boolean,
  overlayRef: RefObject<HTMLDivElement | null>,
  panelRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
        gsap.to(panelRef.current, { x: "100%", duration: 0.35, ease: "power3.in" });
      }
    },
    { dependencies: [isOpen] }
  );
}
