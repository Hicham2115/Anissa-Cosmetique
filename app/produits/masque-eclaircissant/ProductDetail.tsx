"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useScrollReveal } from "@/lib/useScrollReveal";
import productMain from "@/app/assets/product-masque-eclaircissant.png";
import productLifestyle from "@/app/assets/hero-lifestyle.png";
import productBanner from "@/app/assets/banner.png";
import productMasqueAntiAge from "@/app/assets/product-masque-anti-age.png";
import productGelExfoliant from "@/app/assets/product-gel-exfoliant.png";
import productSerum from "@/app/assets/product-serum-eclaircissant.png";
import productLait from "@/app/assets/product-lait-corporel.png";

const GALLERY: { src: StaticImageData; alt: string }[] = [
  { src: productMain, alt: "Masque Éclaircissant Anissa, tube 75ml" },
  { src: productLifestyle, alt: "Masque Éclaircissant mis en scène avec le Gel Exfoliant Anissa" },
  { src: productBanner, alt: "Le Masque Éclaircissant au sein de la collection Anissa" },
];

const TRUST_BADGES = [
  { icon: Truck, label: "Livraison 24–48h", sub: "Partout au Maroc" },
  { icon: Undo2, label: "Retours 30 jours", sub: "Satisfait ou remboursé" },
  { icon: ShoppingBag, label: "Paiement à la livraison", sub: "Disponible" },
];

const COMPOSITION = [
  { label: "Actifs", value: "Nila, Niacinamide" },
  { label: "Volume", value: "75 ml" },
  { label: "Type de peau", value: "Toutes, y compris sensibles" },
  { label: "Texture", value: "Crème-masque" },
  { label: "Fabriqué à", value: "Casablanca, Maroc" },
  { label: "Conservation", value: "12 mois après ouverture" },
];

const USAGE_STEPS = [
  "Appliquer sur peau propre et sèche, en évitant le contour des yeux.",
  "Laisser poser 10 à 15 minutes.",
  "Rincer à l'eau tiède puis sécher en tamponnant.",
  "Utiliser 2 à 3 fois par semaine, idéalement le soir.",
];

const GUARANTEE_ITEMS = [
  "Satisfait ou remboursé sous 14 jours.",
  "Retours gratuits, sans justificatif.",
  "Assistance 7j/7 par le formulaire de contact.",
];

interface RelatedProduct {
  name: string;
  price: string;
  image: StaticImageData;
}

const RELATED_PRODUCTS: RelatedProduct[] = [
  { name: "Masque Anti-Âge", price: "410 MAD", image: productMasqueAntiAge },
  { name: "Gel Exfoliant AHA", price: "320 MAD", image: productGelExfoliant },
  { name: "Sérum Éclaircissant", price: "450 MAD", image: productSerum },
  { name: "Lait Corporel Argan", price: "260 MAD", image: productLait },
];

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < stars ? "h-3.5 w-3.5 fill-gold text-gold" : "h-3.5 w-3.5 text-border-sand"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ProductDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isLiked = useWishlistStore((s) => s.isLiked("masque-eclaircissant"));
  const [added, setAdded] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const specsRef = useScrollReveal<HTMLDivElement>();
  const relatedRef = useScrollReveal<HTMLDivElement>();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(galleryRef.current, { opacity: 0, y: 24 })
        .set(infoRef.current, { opacity: 0, y: 24 })
        .to(galleryRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(infoRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
    },
    { scope: heroRef }
  );

  const handleAddToCart = () => {
    addItem({
      productId: "masque-eclaircissant",
      slug: "masque-eclaircissant",
      name: "Masque Éclaircissant — Nila & Niacinamide",
      price: "390 MAD",
      image: null,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
    toast("Ajouté au panier", { description: "Masque Éclaircissant — Nila & Niacinamide" });
  };

  return (
    <div>
      <div ref={heroRef} className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-xs text-[#8a7c6c]">
          Accueil <span className="mx-1.5">/</span> Boutique <span className="mx-1.5">/</span>{" "}
          <span className="text-ink">Masque Éclaircissant</span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div ref={galleryRef}>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Image
                src={GALLERY[activeImage].src}
                alt={GALLERY[activeImage].alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {GALLERY.map((img, i) => (
                <button
                  key={img.alt}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Voir l'image ${i + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-white transition-all duration-200 ${
                    activeImage === i ? "ring-2 ring-brown" : "ring-1 ring-border-sand hover:ring-brown/50"
                  }`}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div ref={infoRef}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div className="text-xs tracking-[0.2em] text-brown uppercase">Anissa Cosmetics</div>
              <button
                type="button"
                aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={() => {
                  toggleWishlist({
                    productId: "masque-eclaircissant",
                    slug: "masque-eclaircissant",
                    name: "Masque Éclaircissant — Nila & Niacinamide",
                    price: "390 MAD",
                    image: null,
                  });
                  toast(isLiked ? "Retiré des favoris" : "Ajouté aux favoris", {
                    description: "Masque Éclaircissant — Nila & Niacinamide",
                  });
                }}
                className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 ${
                  isLiked ? "border-brown text-brown" : "border-border-sand hover:border-brown hover:text-brown"
                }`}
              >
                <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>

            <h1 className="mb-3 font-serif text-[32px] leading-tight font-semibold text-ink sm:text-[40px]">
              Masque Éclaircissant — Nila &amp; Niacinamide
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <StarRow stars={5} />
              <span className="text-sm text-[#8a7c6c]">4.6 · 128 avis</span>
            </div>

            <div className="mb-6 rounded-2xl border border-border-sand bg-sand-light px-6 py-5">
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-[#8a7c6c] line-through">450 MAD</span>
                <span className="rounded-full bg-brown px-2.5 py-0.5 text-[10px] tracking-wider text-cream uppercase">
                  -13%
                </span>
              </div>
              <div className="mt-1 font-serif text-3xl text-ink">390 MAD</div>
              <div className="mt-2 text-xs text-[#8a7c6c]">Paiement à la livraison disponible</div>
            </div>

            <p className="text-[15px] leading-relaxed text-[#5c534a]">
              Une formule crème-masque à la nila et à la niacinamide qui unifie
              le teint et redonne de l&rsquo;éclat aux peaux ternes, sans
              agresser la barrière cutanée.
              {expanded && (
                <>
                  {" "}
                  Enrichie en acide hyaluronique, elle raffermit et repulpe la
                  peau dès les premières applications. Sa texture riche
                  s&rsquo;applique en couche généreuse et se rince facilement,
                  sans laisser de film gras.
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-xs tracking-wider text-ink underline underline-offset-4 transition-colors duration-200 hover:text-brown"
            >
              {expanded ? "Voir moins" : "Lire la suite"}
            </button>

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

      <div className="relative mt-4 h-[320px] overflow-hidden sm:h-[380px]">
        <Image
          src={productLifestyle}
          alt="Le Masque Éclaircissant Anissa dans son univers"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative flex h-full items-end px-4 pb-8 sm:px-6">
          <div className="text-xs tracking-[0.2em] text-cream uppercase">
            // Une formule qui illumine, pas qui agresse
          </div>
        </div>
      </div>

      <div ref={specsRef} className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div data-reveal className="rounded-2xl border border-border-sand border-l-4 border-l-brown p-6">
            <h3 className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Composition</h3>
            <dl className="flex flex-col gap-3">
              {COMPOSITION.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
                  <dt className="text-[#8a7c6c]">{row.label}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="rounded-2xl border border-border-sand border-l-4 border-l-gold p-6">
            <h3 className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Mode d&rsquo;emploi</h3>
            <ul className="flex flex-col gap-3">
              {USAGE_STEPS.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-[#5c534a]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brown" aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-2xl border border-border-sand border-l-4 border-l-ink p-6">
            <h3 className="mb-4 text-xs tracking-[0.2em] text-brown uppercase">Garantie &amp; Retours</h3>
            <ul className="flex flex-col gap-3">
              {GUARANTEE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#5c534a]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brown" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div ref={relatedRef} className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6">
        <div data-reveal className="mb-9 text-xs tracking-[0.2em] text-brown uppercase">Vous aimerez aussi</div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5.5 lg:grid-cols-4">
          {RELATED_PRODUCTS.map((p) => (
            <div key={p.name} data-reveal className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-sand transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(126,88,54,0.16)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 font-serif text-[15px] transition-colors duration-200 group-hover:text-brown sm:text-base">
                {p.name}
              </div>
              <div className="mt-2 text-sm font-semibold text-brown">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
