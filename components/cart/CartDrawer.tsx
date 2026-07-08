"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import { formatMad, parsePriceAmount } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useUiStore((s) => s.isCartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  const subtotal = items.reduce((sum, i) => sum + parsePriceAmount(i.price) * i.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 250;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={isOpen ? "fixed inset-0 z-[60]" : "pointer-events-none fixed inset-0 z-[60]"}>
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="absolute inset-0 bg-ink/50 opacity-0 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className="absolute top-0 right-0 flex h-full w-full max-w-[420px] translate-x-full flex-col bg-cream shadow-[-24px_0_48px_rgba(42,36,32,0.22)]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-gold/60 to-transparent" />

        <div className="flex items-center justify-between border-b border-border-sand px-6 py-5">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-brown uppercase">Votre sélection</div>
            <h2 className="mt-1 font-serif text-lg text-ink">Panier ({items.length})</h2>
          </div>
          <button
            type="button"
            aria-label="Fermer le panier"
            onClick={closeCart}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#8a7c6c] transition-all duration-200 hover:bg-sand-light hover:text-ink"
          >
            <X className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-border-sand bg-sand-light/50 px-6 py-4">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#5c534a]">
                Plus que{" "}
                <span className="font-semibold text-brown">{formatMad(remainingForFreeShipping)}</span>{" "}
                pour la livraison gratuite.
              </p>
            ) : (
              <p className="text-xs font-semibold text-brown">Livraison gratuite débloquée ✓</p>
            )}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-linear-to-r from-brown to-gold transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-light">
                <ShoppingBag className="h-6 w-6 text-brown" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <p className="text-sm text-[#8a7c6c]">Votre panier est vide.</p>
              <Link href="/boutique" onClick={closeCart}>
                <Button size="sm">Découvrir la boutique</Button>
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-3.5">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="group flex gap-4 rounded-xl border border-border-sand bg-white/40 p-3 transition-all duration-300 hover:border-brown/40 hover:shadow-[0_8px_20px_rgba(126,88,54,0.1)]"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder label={item.name} className="absolute inset-0 h-full w-full" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-serif text-sm text-ink">{item.name}</span>
                      <button
                        type="button"
                        aria-label={`Retirer ${item.name} du panier`}
                        onClick={() => removeItem(item.productId)}
                        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a7c6c] transition-all duration-200 hover:bg-sand hover:text-ink"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="mt-1 text-xs font-semibold text-brown">{item.price}</span>
                    <div className="mt-2.5 flex w-fit items-center rounded-full border border-border-sand bg-cream">
                      <button
                        type="button"
                        aria-label="Diminuer la quantité"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-ink">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Augmenter la quantité"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="relative border-t border-border-sand px-6 py-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-[#8a7c6c]">Sous-total</span>
              <span className="font-serif text-xl text-ink">{formatMad(subtotal)}</span>
            </div>
            <Link href="/boutique" onClick={closeCart}>
              <Button className="w-full">Passer la commande</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
