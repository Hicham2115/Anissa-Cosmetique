"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";

export function WishlistDrawer() {
  const isOpen = useUiStore((s) => s.isWishlistOpen);
  const closeWishlist = useUiStore((s) => s.closeWishlist);
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

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

  return (
    <div className={isOpen ? "fixed inset-0 z-[60]" : "pointer-events-none fixed inset-0 z-[60]"}>
      <div
        ref={overlayRef}
        onClick={closeWishlist}
        className="absolute inset-0 bg-ink/50 opacity-0 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Liste de souhaits"
        className="absolute top-0 right-0 flex h-full w-full max-w-[420px] translate-x-full flex-col bg-cream shadow-[-24px_0_48px_rgba(42,36,32,0.22)]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-gold/60 to-transparent" />

        <div className="flex items-center justify-between border-b border-border-sand px-6 py-5">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-brown uppercase">Vos coups de cœur</div>
            <h2 className="mt-1 font-serif text-lg text-ink">Favoris ({items.length})</h2>
          </div>
          <button
            type="button"
            aria-label="Fermer la liste de souhaits"
            onClick={closeWishlist}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#8a7c6c] transition-all duration-200 hover:bg-sand-light hover:text-ink"
          >
            <X className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-light">
                <Heart className="h-6 w-6 text-brown" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <p className="text-sm text-[#8a7c6c]">Aucun favori pour le moment.</p>
              <Link href="/boutique" onClick={closeWishlist}>
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
                  <Link
                    href={`/produits/${item.slug}`}
                    onClick={closeWishlist}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand"
                  >
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
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/produits/${item.slug}`}
                        onClick={closeWishlist}
                        className="font-serif text-sm text-ink transition-colors duration-200 hover:text-brown"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Retirer ${item.name} des favoris`}
                        onClick={() => removeItem(item.productId)}
                        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a7c6c] transition-all duration-200 hover:bg-sand hover:text-ink"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="mt-1 text-xs font-semibold text-brown">{item.price}</span>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          productId: item.productId,
                          slug: item.slug,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="mt-2.5 flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-border-sand px-3 py-1.5 text-[11px] tracking-wider text-ink uppercase transition-all duration-200 hover:border-brown hover:bg-brown hover:text-cream"
                    >
                      <ShoppingBag className="h-3 w-3" aria-hidden="true" />
                      Ajouter
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
