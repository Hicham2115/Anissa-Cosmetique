"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/validations";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { trackAddToCart } from "@/lib/metaPixel";
import { parsePriceAmount } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isLiked = useWishlistStore((s) => s.isLiked(product.id));
  const inStock = product.availableForSale !== false;

  return (
    <div data-reveal className="group flex flex-col">
      <Link href={`/produits/${product.slotId}`} className="relative aspect-square overflow-hidden rounded-lg bg-sand ring-1 ring-transparent transition-all duration-300 hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] hover:ring-black/10">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${inStock ? "" : "opacity-60 grayscale"}`}
          />
        ) : (
          <ImagePlaceholder
            label={product.name}
            className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${inStock ? "" : "opacity-60 grayscale"}`}
          />
        )}
        {!inStock ? (
          <div className="absolute top-3 left-3 rounded-full bg-black px-2.5 py-1 text-[10px] tracking-wider text-white uppercase">
            En rupture de stock
          </div>
        ) : (
          product.badge && (
            <div className="absolute top-3 left-3 rounded-full bg-black px-2.5 py-1 text-[10px] tracking-wider text-white uppercase">
              {product.badge}
            </div>
          )
        )}
        <button
          type="button"
          aria-label={isLiked ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ productId: product.id, slug: product.slotId, name: product.name, price: product.price, image: product.image ?? null });
            toast(isLiked ? "Retiré des favoris" : "Ajouté aux favoris", { description: product.name });
          }}
          className={`absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 ${
            isLiked ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
        </button>
        {inStock && (
          <button
            type="button"
            aria-label={`Ajouter ${product.name} au panier`}
            onClick={(e) => {
              e.preventDefault();
              addItem({ productId: product.id, slug: product.slotId, name: product.name, price: product.price, image: product.image ?? null });
              trackAddToCart({ slug: product.slotId, name: product.name, price: parsePriceAmount(product.price) });
              toast("Ajouté au panier", {
                description: product.name,
                icon: <ShoppingBag className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
                className: "max-sm:hidden",
              });
            }}
            className="absolute right-3 bottom-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black transition-all duration-200 hover:scale-110 active:scale-95 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden="true" />
          </button>
        )}
      </Link>
      <Link href={`/produits/${product.slotId}`} className="mt-4 font-serif text-[15px] text-black transition-all duration-200 group-hover:font-semibold sm:text-base">
        {product.name}
      </Link>
      <div className="mt-1 text-xs text-[#8a7c6c]">{product.subtitle}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <div className="text-sm font-semibold tracking-wide text-black">{product.price}</div>
        {product.compareAtPrice && (
          <div className="text-xs text-[#8a7c6c] line-through">{product.compareAtPrice}</div>
        )}
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-2 h-3.5 w-1/3" />
    </div>
  );
}
