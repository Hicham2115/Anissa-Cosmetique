"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { X, Gift, Sparkles, Truck } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";

const MESSAGES = [
  {
    icon: Truck,
    text: "Livraison gratuite dès 500 MAD sur toute la boutique.",
    cta: "Découvrir",
    href: "/boutique",
  },
  {
    icon: Sparkles,
    text: "Le Sérum À La Rose est notre best-seller du moment.",
    cta: "Voir le produit",
    href: "/#best-sellers",
  },
  {
    icon: Gift,
    text: "Rejoignez le cercle Anissa pour un accès anticipé aux nouveautés.",
    cta: "S'inscrire",
    href: "/#newsletter",
  },
];

const FIRST_DELAY = 9000;
const VISIBLE_DURATION = 8000;
const INTERVAL = 40000;
const MAX_DISMISSALS = 2;
const DISMISS_KEY = "anissa-promo-dismiss-count";

export function PromoPopup() {
  const pathname = usePathname();
  const [messageIndex, setMessageIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [stopped, setStopped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const dismissCount = Number(sessionStorage.getItem(DISMISS_KEY) ?? "0");
    if (dismissCount >= MAX_DISMISSALS) {
      setStopped(true);
      return;
    }

    const showNext = () => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
      setVisible(true);
      hideTimer.current = setTimeout(() => setVisible(false), VISIBLE_DURATION);
    };

    const firstTimer = setTimeout(showNext, FIRST_DELAY);
    const interval = setInterval(showNext, INTERVAL);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      if (visible) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(cardRef.current, { opacity: 0, y: 16, duration: 0.35, ease: "power2.in" });
      }
    },
    { dependencies: [visible] }
  );

  const dismiss = () => {
    setVisible(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    const count = Number(sessionStorage.getItem(DISMISS_KEY) ?? "0") + 1;
    sessionStorage.setItem(DISMISS_KEY, String(count));
    if (count >= MAX_DISMISSALS) setStopped(true);
  };

  const handleCta = (href: string) => {
    dismiss();
    if (href.startsWith("/#") && pathname === "/") {
      scrollToSection(href.slice(1));
    } else {
      window.location.href = href;
    }
  };

  if (stopped || !visible) return null;

  const message = MESSAGES[messageIndex];
  const Icon = message.icon;

  return (
    <div
      ref={cardRef}
      role="status"
      className="fixed bottom-5 left-5 z-50 flex max-w-[320px] items-start gap-3 rounded-2xl border border-border-sand bg-cream p-4 shadow-[0_20px_40px_rgba(42,36,32,0.18)]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light">
        <Icon className="h-4 w-4 text-brown" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] leading-snug text-ink">{message.text}</p>
        <button
          type="button"
          onClick={() => handleCta(message.href)}
          className="mt-2 cursor-pointer text-xs font-semibold tracking-wide text-brown underline-offset-2 transition-colors duration-200 hover:text-ink hover:underline"
        >
          {message.cta} &rarr;
        </button>
      </div>
      <button
        type="button"
        aria-label="Fermer"
        onClick={dismiss}
        className="cursor-pointer text-[#8a7c6c] transition-colors duration-200 hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
