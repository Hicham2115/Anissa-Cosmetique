"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import {
  productSchema,
  productListSchema,
  type Product,
} from "@/lib/validations";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/home/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore, type WishlistItem } from "@/store/wishlistStore";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { getLenisInstance } from "@/lib/lenis";

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
    items: [
      "Livraison 24–48h partout au Maroc.",
      "Suivi de commande par SMS et email.",
    ],
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
    items: [
      "Paiement à la livraison disponible.",
      "Paiement par carte 100% sécurisé.",
    ],
  },
];

function MobileWishlistCard({ item }: { item: WishlistItem }) {
  const removeItem = useWishlistStore((s) => s.removeItem);
  return (
    <Link
      href={`/produits/${item.slug}`}
      className="group flex w-32 shrink-0 flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-sand">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-300 group-active:scale-95"
          />
        ) : (
          <ImagePlaceholder
            label={item.name}
            className="absolute inset-0 h-full w-full"
          />
        )}
        <button
          type="button"
          aria-label={`Retirer ${item.name} des favoris`}
          onClick={(e) => {
            e.preventDefault();
            removeItem(item.productId);
          }}
          className="absolute top-1.5 right-1.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brown"
        >
          <Heart className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 truncate text-xs font-medium text-ink">
        {item.name}
      </div>
      <div className="text-xs font-semibold text-brown">{item.price}</div>
    </Link>
  );
}

async function fetchProduct(slug: string) {
  const { data } = await api.get(`/products/${slug}`);
  return productSchema.parse(data);
}

async function fetchProducts() {
  const { data } = await api.get("/products");
  return productListSchema.parse(data);
}

export function GenericProductDetail({ slug }: { slug: string }) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => fetchProduct(slug),
  });

  const { data: allProducts } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: fetchProducts,
  });

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeImageProductId, setActiveImageProductId] = useState(product?.id);
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const [thumbRatios, setThumbRatios] = useState<Record<number, number>>({});
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  if (product?.id !== activeImageProductId) {
    setActiveImageProductId(product?.id);
    setActiveImage(0);
    setImageRatio(null);
    setThumbRatios({});
  }
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isLiked = useWishlistStore((s) =>
    product ? s.isLiked(product.id) : false,
  );
  const wishlistItems = useWishlistStore((s) => s.items);
  const specsRef = useScrollReveal<HTMLDivElement>([product]);
  const relatedRef = useScrollReveal<HTMLDivElement>([allProducts]);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The related-products grid and skeleton→content swap both change the
    // page height after Lenis has already measured it, so without this its
    // scroll limit stays stuck at the shorter pre-data height.
    const raf = requestAnimationFrame(() => getLenisInstance()?.resize());
    return () => cancelAnimationFrame(raf);
  }, [product, allProducts]);

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
        <ErrorState
          message={
            (error as Error)?.message ?? "Impossible de charger ce produit."
          }
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        slug: product.slotId,
        name: product.name,
        price: product.price,
        image: product.image ?? null,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
    toast("Ajouté au panier", {
      description: product.name,
      icon: (
        <ShoppingBag className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      ),
    });
  };

  const relatedProducts: Product[] = (allProducts ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  return (
    <div>
      <div className="hidden md:block">
      <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-xs text-[#8a7c6c]">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-brown"
          >
            Accueil
          </Link>
          <span className="mx-1.5">/</span>
          <Link
            href="/boutique"
            className="transition-colors duration-200 hover:text-brown"
          >
            Boutique
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex gap-4">
            {gallery.length > 1 && (
              <div className="flex shrink-0 flex-col gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setActiveImage(i);
                      setImageRatio(null);
                    }}
                    aria-label={`Voir l'image ${i + 1}`}
                    style={{ aspectRatio: thumbRatios[i] ?? 1 }}
                    className={`relative w-20 overflow-hidden rounded-xl bg-transparent transition-all duration-200 sm:w-24 ${
                      activeImage === i
                        ? "ring-2 ring-brown"
                        : "ring-1 ring-border-sand hover:ring-brown/50"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — vue ${i + 1}`}
                      fill
                      sizes="96px"
                      className="object-contain"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        setThumbRatios((prev) => ({ ...prev, [i]: img.naturalWidth / img.naturalHeight }));
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            <div
              className={`relative flex-1 overflow-hidden rounded-2xl bg-transparent shadow-sm ring-1 ring-border-sand ${
                gallery.length > 0 ? "cursor-zoom-in" : ""
              }`}
              style={{ aspectRatio: Math.min(1.4, Math.max(0.75, imageRatio ?? 1)) }}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setZoomPos({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                });
              }}
            >
              {gallery.length > 0 ? (
                <Image
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                  className="object-contain transition-transform duration-200 ease-out"
                  style={
                    isZooming
                      ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                      : undefined
                  }
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setImageRatio(img.naturalWidth / img.naturalHeight);
                  }}
                />
              ) : (
                <ImagePlaceholder
                  label={product.name}
                  className="absolute inset-0 h-full w-full"
                />
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-brown px-2.5 py-0.5 text-[10px] tracking-wider text-cream uppercase">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="text-xs tracking-[0.2em] text-brown uppercase">
                Anissa Cosmetics
              </div>
              <button
                type="button"
                aria-label={
                  isLiked ? "Retirer des favoris" : "Ajouter aux favoris"
                }
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
                  isLiked
                    ? "border-brown text-brown"
                    : "border-border-sand hover:border-brown hover:text-brown"
                }`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isLiked ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            </div>

            <h1 className="mb-6 font-serif text-[32px] leading-tight font-semibold text-ink sm:text-[40px]">
              {product.name}
            </h1>

            <div className="mb-6 rounded-2xl border border-border-sand bg-sand-light px-6 py-5">
              <div className="font-serif text-3xl text-ink">
                {product.price}
              </div>
              <div className="mt-2 text-xs text-[#8a7c6c]">
                Paiement à la livraison disponible
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-[#5c534a]">
              {product.subtitle}
            </p>

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
                <span className="w-8 text-center text-sm font-semibold text-ink">
                  {quantity}
                </span>
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
                    <ShoppingBag
                      className="h-[13px] w-[13px]"
                      aria-hidden="true"
                    />
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
                  <Icon
                    className="h-4 w-4 text-brown"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div className="text-[11px] leading-tight text-ink">
                    {label}
                  </div>
                  <div className="text-[10px] leading-tight text-[#8a7c6c]">
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={specsRef} className="border-t border-border-sand">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[280px_1fr] md:gap-16">
          <div data-reveal>
            <div className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">
              Fiche technique
            </div>
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
                <dd className="text-right text-sm text-[#8a7c6c]">
                  {value(product)}
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-20">
          <div data-reveal className="mb-9">
            <div className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">
              À savoir
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink sm:text-5xl">
              Infos pratiques
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {INFO_CARDS.map(({ icon: Icon, title, accent, iconBg, items }) => (
              <div
                key={title}
                data-reveal
                className={`rounded-2xl border border-border-sand border-l-4 ${accent} bg-white p-6`}
              >
                <div className="mb-5 flex items-center gap-3 border-b border-border-sand pb-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#5c534a]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brown"
                        aria-hidden="true"
                      />
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
        <div
          ref={relatedRef}
          className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6"
        >
          <div
            data-reveal
            className="mb-9 text-xs tracking-[0.2em] text-brown uppercase"
          >
            Vous aimerez aussi
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5.5 lg:grid-cols-4">
            {!allProducts
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : relatedProducts.map((p) => (
                  <div key={p.id} data-reveal>
                    <ProductCard product={p} />
                  </div>
                ))}
          </div>
        </div>
      )}
      </div>

      <div className="md:hidden">
        <div className="relative">
          <div
            ref={mobileGalleryRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
              if (idx !== activeImage) setActiveImage(idx);
            }}
            className="flex aspect-square snap-x snap-mandatory overflow-x-auto bg-sand-light [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.length > 0 ? (
              gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative w-full shrink-0 snap-center"
                >
                  <Image
                    src={src}
                    alt={`${product.name} — vue ${i + 1}`}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-contain"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full shrink-0 snap-center">
                <ImagePlaceholder label={product.name} className="absolute inset-0 h-full w-full" />
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {gallery.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === activeImage ? "w-5 bg-brown" : "w-1.5 bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}

          <Link
            href="/boutique"
            aria-label="Retour à la boutique"
            className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>

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
            className={`absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors duration-200 ${
              isLiked ? "text-brown" : "text-ink"
            }`}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
          </button>

          {product.badge && (
            <span className="absolute top-4 left-16 rounded-full bg-brown px-2.5 py-0.5 text-[10px] tracking-wider text-cream uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <div className="px-4 pt-5 pb-4">
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

          <div className="text-xs tracking-[0.2em] text-brown uppercase">Anissa Cosmetics</div>
          <h1 className="mt-2 font-serif text-[28px] leading-tight font-semibold text-ink">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border-sand bg-sand-light px-5 py-4">
            <div>
              <div className="font-serif text-2xl text-ink">{product.price}</div>
              <div className="mt-1 text-[11px] text-[#8a7c6c]">Paiement à la livraison disponible</div>
            </div>
            <div className="flex items-center rounded-full border border-border-sand bg-white">
              <button
                type="button"
                aria-label="Diminuer la quantité"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="w-6 text-center text-sm font-semibold text-ink">{quantity}</span>
              <button
                type="button"
                aria-label="Augmenter la quantité"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#5c534a]">{product.subtitle}</p>

          <Button
            onClick={handleAddToCart}
            className="group mt-5 w-full transition-transform duration-200 active:scale-95"
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

          <div className="mt-6 flex gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-border-sand px-3.5 py-2"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-brown" strokeWidth={1.5} aria-hidden="true" />
                <div className="text-[11px] leading-tight whitespace-nowrap text-ink">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {wishlistItems.length > 0 && (
          <div className="border-t border-border-sand px-4 py-6">
            <div className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Vos favoris</div>
            <div className="flex gap-3.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {wishlistItems.map((item) => (
                <MobileWishlistCard key={item.productId} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border-sand px-4 py-6">
          <details className="group border-b border-border-sand py-4 first:pt-0" open>
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
              Fiche technique
              <ChevronDown className="h-4 w-4 text-brown transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <dl className="mt-3 flex flex-col gap-3">
              {SPECS.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between gap-6">
                  <dt className="text-[13px] text-ink">{label}</dt>
                  <dd className="text-right text-[13px] text-[#8a7c6c]">{value(product)}</dd>
                </div>
              ))}
            </dl>
          </details>

          {INFO_CARDS.map(({ icon: Icon, title, iconBg, items }) => (
            <details key={title} className="group border-b border-border-sand py-4 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
                <span className="flex items-center gap-2.5">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {title}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-brown transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="mt-3 flex flex-col gap-2.5 pl-9.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-[#5c534a]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brown" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        {(!allProducts || relatedProducts.length > 0) && (
          <div className="border-t border-border-sand px-4 py-6 pb-8">
            <div className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Vous aimerez aussi</div>
            <div className="flex gap-3.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {!allProducts
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-36 shrink-0">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : relatedProducts.map((p) => (
                    <div key={p.id} className="w-36 shrink-0">
                      <ProductCard product={p} />
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border-sand bg-cream px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden">
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-ink">
            {product.name}
          </div>
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
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}
