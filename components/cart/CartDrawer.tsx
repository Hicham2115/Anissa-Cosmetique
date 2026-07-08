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

  return (
    <div className={isOpen ? "fixed inset-0 z-[60]" : "pointer-events-none fixed inset-0 z-[60]"}>
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="absolute inset-0 bg-ink/50 opacity-0"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className="absolute top-0 right-0 flex h-full w-full max-w-[420px] translate-x-full flex-col bg-cream shadow-[-20px_0_40px_rgba(42,36,32,0.18)]"
      >
        <div className="flex items-center justify-between border-b border-border-sand px-6 py-5">
          <h2 className="font-serif text-lg text-ink">Panier ({items.length})</h2>
          <button
            type="button"
            aria-label="Fermer le panier"
            onClick={closeCart}
            className="cursor-pointer text-[#8a7c6c] transition-colors duration-200 hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBag className="h-8 w-8 text-[#8a7c6c]" strokeWidth={1.4} aria-hidden="true" />
              <p className="text-sm text-[#8a7c6c]">Votre panier est vide.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
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
                        className="cursor-pointer text-[#8a7c6c] transition-colors duration-200 hover:text-ink"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="mt-1 text-xs text-[#8a7c6c]">{item.price}</span>
                    <div className="mt-2 flex items-center rounded-full border border-border-sand">
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
          <div className="border-t border-border-sand px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-[#8a7c6c]">Sous-total</span>
              <span className="font-serif text-lg text-ink">{formatMad(subtotal)}</span>
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
