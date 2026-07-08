"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { productSchema, productListSchema, type Product } from "@/lib/validations";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "@/components/home/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useScrollReveal } from "@/lib/useScrollReveal";

const TRUST_BADGES = [
  { icon: Truck, label: "Livraison 24–48h", sub: "Partout au Maroc" },
  { icon: Undo2, label: "Retours 30 jours", sub: "Satisfait ou remboursé" },
  { icon: ShoppingBag, label: "Paiement à la livraison", sub: "Disponible" },
];

const SPECS = [
  { label: "Référence", value: (p: Product) => p.slotId },
  { label: "Description", value: (p: Product) => p.subtitle },
  { label: "Fabriqué à", value: () => "Casablanca, Maroc" },
];

const INFO_CARDS = [
  {
    icon: Truck,
    title: "Livraison",
    accent: "border-l-brown",
    iconBg: "bg-brown/10 text-brown",
    items: ["Livraison 24–48h partout au Maroc.", "Suivi de commande par SMS et email."],
  },
  {
    icon: Undo2,
    title: "Garantie & Retours",
    accent: "border-l-gold",
    iconBg: "bg-gold/15 text-brown",
    items: [
      "Satisfait ou remboursé sous 14 jours.",
      "Retours gratuits, sans justificatif.",
      "Assistance 7j/7 par le formulaire de contact.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Paiement",
    accent: "border-l-ink",
    iconBg: "bg-ink/10 text-ink",
    items: ["Paiement à la livraison disponible.", "Paiement par carte 100% sécurisé."],
  },
];

async function fetchProduct(slug: string) {
  const { data } = await api.get(`/products/${slug}`);
  return productSchema.parse(data);
}

async function fetchProducts() {
  const { data } = await api.get("/products");
  return productListSchema.parse(data);
}

export function GenericProductDetail({ slug }: { slug: string }) {
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => fetchProduct(slug),
  });

  const { data: allProducts } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: fetchProducts,
  });

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isLiked = useWishlistStore((s) => (product ? s.isLiked(product.id) : false));
  const specsRef = useScrollReveal<HTMLDivElement>([product]);
  const relatedRef = useScrollReveal<HTMLDivElement>([allProducts]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6">
        <ErrorState message={(error as Error)?.message ?? "Impossible de charger ce produit."} />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ productId: product.id, slug: product.slotId, name: product.name, price: product.price, image: product.image ?? null });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
    toast("Ajouté au panier", { description: product.name });
  };

  const relatedProducts: Product[] = (allProducts ?? []).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-xs text-[#8a7c6c]">
          <Link href="/" className="transition-colors duration-200 hover:text-brown">
            Accueil
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/boutique" className="transition-colors duration-200 hover:text-brown">
            Boutique
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border-sand">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <ImagePlaceholder label={product.name} className="absolute inset-0 h-full w-full" />
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-brown px-2.5 py-0.5 text-[10px] tracking-wider text-cream uppercase">
                {product.badge}
              </span>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="text-xs tracking-[0.2em] text-brown uppercase">Anissa Cosmetics</div>
              <button
                type="button"
                aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={() => {
                  toggleWishlist({
                    productId: product.id,
                    slug: product.slotId,
                    name: product.name,
                    price: product.price,
                    image: product.image ?? null,
                  });
                  toast(isLiked ? "Retiré des favoris" : "Ajouté aux favoris", {
                    description: product.name,
                  });
                }}
                className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                  isLiked ? "border-brown text-brown" : "border-border-sand hover:border-brown hover:text-brown"
                }`}
              >
                <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>

            <h1 className="mb-6 font-serif text-[32px] leading-tight font-semibold text-ink sm:text-[40px]">
              {product.name}
            </h1>

            <div className="mb-6 rounded-2xl border border-border-sand bg-sand-light px-6 py-5">
              <div className="font-serif text-3xl text-ink">{product.price}</div>
              <div className="mt-2 text-xs text-[#8a7c6c]">Paiement à la livraison disponible</div>
            </div>

            <p className="text-[15px] leading-relaxed text-[#5c534a]">{product.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-border-sand">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-ink">{quantity}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="group flex-1 transition-transform duration-200 hover:scale-105 active:scale-95 sm:flex-none"
              >
                {added ? (
                  <>
                    <Check className="h-[13px] w-[13px]" aria-hidden="true" />
                    Ajouté
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-[13px] w-[13px]" aria-hidden="true" />
                    Ajouter au panier
                  </>
                )}
              </Button>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border-sand px-2 py-4 text-center"
                >
                  <Icon className="h-4 w-4 text-brown" strokeWidth={1.5} aria-hidden="true" />
                  <div className="text-[11px] leading-tight text-ink">{label}</div>
                  <div className="text-[10px] leading-tight text-[#8a7c6c]">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={specsRef} className="border-t border-border-sand">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[280px_1fr] md:gap-16">
          <div data-reveal>
            <div className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">Fiche technique</div>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink sm:text-5xl">
              Caractéris­tiques
            </h2>
          </div>
          <div data-reveal className="flex flex-col">
            {SPECS.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-6 border-b border-border-sand py-4 first:pt-0 last:border-b-0"
              >
                <dt className="text-sm font-semibold text-ink">{label}</dt>
                <dd className="text-right text-sm text-[#8a7c6c]">{value(product)}</dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-20">
          <div data-reveal className="mb-9">
            <div className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">À savoir</div>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink sm:text-5xl">Infos pratiques</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {INFO_CARDS.map(({ icon: Icon, title, accent, iconBg, items }) => (
              <div
                key={title}
                data-reveal
                className={`rounded-2xl border border-border-sand border-l-4 ${accent} bg-white p-6`}
              >
                <div className="mb-5 flex items-center gap-3 border-b border-border-sand pb-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#5c534a]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brown" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(!allProducts || relatedProducts.length > 0) && (
        <div ref={relatedRef} className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6">
          <div data-reveal className="mb-9 text-xs tracking-[0.2em] text-brown uppercase">Vous aimerez aussi</div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5.5 lg:grid-cols-4">
            {!allProducts
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : relatedProducts.map((p) => (
                  <div key={p.id} data-reveal>
                    <ProductCard product={p} />
                  </div>
                ))}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border-sand bg-cream px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] sm:hidden">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-ink">{product.name}</div>
          <div className="font-serif text-lg text-ink">{product.price}</div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="group shrink-0 transition-transform duration-200 active:scale-95"
        >
          {added ? (
            <>
              <Check className="h-[13px] w-[13px]" aria-hidden="true" />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingBag className="h-[13px] w-[13px]" aria-hidden="true" />
              Ajouter
            </>
          )}
        </Button>
      </div>
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}
