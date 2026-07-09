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

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isLiked = useWishlistStore((s) => s.isLiked(product.id));

  return (
    <div data-reveal className="group flex flex-col">
      <Link href={`/produits/${product.slotId}`} className="relative aspect-square overflow-hidden rounded-lg bg-sand transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(126,88,54,0.16)]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            label={product.name}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {product.badge && (
          <div className="absolute top-3 left-3 rounded-full bg-cream px-2.5 py-1 text-[10px] tracking-wider text-brown uppercase">
            {product.badge}
          </div>
        )}
        <button
          type="button"
          aria-label={isLiked ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({ productId: product.id, slug: product.slotId, name: product.name, price: product.price, image: product.image ?? null });
            toast(isLiked ? "Retiré des favoris" : "Ajouté aux favoris", { description: product.name });
          }}
          className={`absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cream transition-transform duration-200 hover:scale-110 active:scale-95 ${
            isLiked ? "text-brown" : "text-ink"
          }`}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Ajouter ${product.name} au panier`}
          onClick={(e) => {
            e.preventDefault();
            addItem({ productId: product.id, slug: product.slotId, name: product.name, price: product.price, image: product.image ?? null });
            toast("Ajouté au panier", {
              description: product.name,
              icon: <ShoppingBag className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />,
            });
          }}
          className="absolute right-3 bottom-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brown transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <ShoppingBag className="h-4 w-4 text-cream" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </Link>
      <Link href={`/produits/${product.slotId}`} className="mt-4 font-serif text-[15px] transition-colors duration-200 group-hover:text-brown sm:text-base">
        {product.name}
      </Link>
      <div className="mt-1 text-xs text-[#8a7c6c]">{product.subtitle}</div>
      <div className="mt-2 text-sm font-semibold text-brown">{product.price}</div>
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
