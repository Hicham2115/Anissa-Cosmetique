"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tag, Clock, Check, ArrowRight, X } from "lucide-react";

const PROMO_PRODUCT_HANDLE = "pack-eclaircissant";
const PROMO_SAVINGS = "-299 MAD";
const PROMO_PRICE_FROM = "À partir de 399 DH";

const FEATURES = ["Certifié ISO 22716", "100% Naturel", "Livraison Offerte", "Non Testé sur Animaux"];

const FIRST_DELAY = 9000;
const MAX_DISMISSALS = 2;
const STATE_KEY = "anissa-promo-state";
const DEADLINE_KEY = "anissa-promo-deadline";
const OFFER_WINDOW_MS = 4 * 24 * 60 * 60 * 1000;

type PopupState = "hidden" | "expanded" | "minimized" | "closed";

function getDeadline(): number {
  const stored = Number(localStorage.getItem(DEADLINE_KEY) ?? "0");
  if (stored > Date.now()) return stored;
  const next = Date.now() + OFFER_WINDOW_MS;
  localStorage.setItem(DEADLINE_KEY, String(next));
  return next;
}

function splitCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownSegment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-xl font-semibold text-cream tabular-nums">{String(value).padStart(2, "0")}</span>
      <span className="mt-0.5 text-[9px] tracking-[0.15em] text-cream/50 uppercase">{label}</span>
    </div>
  );
}

export function PromoPopup() {
  const [state, setState] = useState<PopupState>("hidden");
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dismissCount = Number(sessionStorage.getItem(STATE_KEY) ?? "0");
    if (dismissCount >= MAX_DISMISSALS) return;

    const timer = setTimeout(() => setState("expanded"), FIRST_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state !== "expanded") return;
    const deadline = getDeadline();
    setRemainingMs(deadline - Date.now());
    const tick = setInterval(() => {
      setRemainingMs(Math.max(0, deadline - Date.now()));
    }, 1000);
    return () => clearInterval(tick);
  }, [state]);

  useGSAP(
    () => {
      if (cardRef.current) {
        if (state === "expanded") {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
          );
        } else {
          gsap.to(cardRef.current, { opacity: 0, y: 16, duration: 0.3, ease: "power2.in" });
        }
      }
      if (pillRef.current && state === "minimized") {
        gsap.fromTo(pillRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
      }
    },
    { dependencies: [state] }
  );

  const minimize = () => setState("minimized");

  const close = () => {
    setState("closed");
    const count = Number(sessionStorage.getItem(STATE_KEY) ?? "0") + 1;
    sessionStorage.setItem(STATE_KEY, String(count));
  };

  if (state === "hidden" || state === "closed") return null;

  if (state === "minimized") {
    return (
      <button
        ref={pillRef}
        type="button"
        onClick={() => setState("expanded")}
        className="fixed bottom-13 left-5 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-3 text-xs font-semibold tracking-wide text-cream shadow-[0_12px_28px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-105 sm:bottom-17"
      >
        <Tag className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        Offre de Lancement
      </button>
    );
  }

  const countdown = remainingMs !== null ? splitCountdown(remainingMs) : null;

  return (
    <div
      ref={cardRef}
      role="status"
      className="fixed bottom-5 left-5 z-50 w-[calc(100%-2.5rem)] max-w-[380px] rounded-3xl bg-ink p-6 text-cream shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-center justify-between border-b border-cream/15 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          <Tag className="h-4 w-4" aria-hidden="true" />
          Offre de Lancement
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={close}
          className="cursor-pointer text-cream/40 transition-colors duration-200 hover:text-cream"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold tracking-[0.15em] text-cream/50 uppercase">{PROMO_SAVINGS}</div>
        <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold">L&rsquo;offre se termine dans</h3>
      </div>

      {countdown && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-cream/10 px-4 py-3.5">
          <Clock className="h-4 w-4 shrink-0 text-cream/50" aria-hidden="true" />
          <div className="flex flex-1 items-center justify-between">
            <CountdownSegment value={countdown.days} label="Jours" />
            <span className="text-cream/30">:</span>
            <CountdownSegment value={countdown.hours} label="Heures" />
            <span className="text-cream/30">:</span>
            <CountdownSegment value={countdown.minutes} label="Min" />
            <span className="text-cream/30">:</span>
            <CountdownSegment value={countdown.seconds} label="Sec" />
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs text-cream/70">
        <div className="flex items-center gap-1.5">
          <Check className="h-3 w-3 shrink-0 text-gold" aria-hidden="true" />
          {PROMO_PRICE_FROM}
        </div>
        {FEATURES.map((f) => (
          <div key={f} className="flex items-center gap-1.5">
            <Check className="h-3 w-3 shrink-0 text-gold" aria-hidden="true" />
            {f}
          </div>
        ))}
      </div>

      <Link
        href={`/produits/${PROMO_PRODUCT_HANDLE}`}
        onClick={close}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cream py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:scale-[1.02] hover:bg-white"
      >
        Commander maintenant
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      <button
        type="button"
        onClick={minimize}
        className="mt-4 w-full cursor-pointer text-center text-[11px] tracking-[0.2em] text-cream/40 uppercase transition-colors duration-200 hover:text-cream/70"
      >
        Réduire
      </button>
    </div>
  );
}
