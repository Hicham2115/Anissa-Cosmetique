"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { categoryListSchema } from "@/lib/validations";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { useScrollReveal } from "@/lib/useScrollReveal";
import soinsImage from "@/app/assets/categories/antiage.webp";
import makiageImage from "@/app/assets/categories/eclat.webp";
import parfumImage from "@/app/assets/categories/nettoyant.webp";

const CATEGORY_IMAGES: Record<string, typeof soinsImage> = {
  "Anti-Âge": soinsImage,
  Éclat: makiageImage,
  "Nettoyants & Exfoliants": parfumImage,
};

const CATEGORY_LINKS: Record<string, string> = {
  "Anti-Âge": "/produits/masque-anti-age",
  Éclat: "/produits/creme-eclaircissante",
  "Nettoyants & Exfoliants": "/produits/gel-nettoyant-purifiant",
};

async function fetchCategories() {
  const { data } = await api.get("/categories");
  return categoryListSchema.parse(data);
}

export function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: fetchCategories,
  });
  const scopeRef = useScrollReveal<HTMLDivElement>([data]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const currentCategory = activeCategory ?? data?.[0]?.name ?? null;

  useGSAP(
    () => {
      if (!imageRef.current) return;
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    },
    { dependencies: [currentCategory] },
  );

  const activeImage = currentCategory
    ? CATEGORY_IMAGES[currentCategory]
    : undefined;

  return (
    <div
      id="categories"
      ref={scopeRef}
      className="mx-auto grid max-w-[1320px] scroll-mt-24 gap-10 px-4 pt-16 pb-5 sm:px-6 sm:pt-24 md:grid-cols-[0.85fr_1.15fr] md:items-center"
    >
      <div>
        <div
          data-reveal
          className="mb-3.5 text-xs tracking-[0.2em] text-black uppercase"
        >
          Catégories
        </div>
        <h2
          data-reveal
          className="mb-9 font-serif text-3xl font-semibold text-ink"
        >
          Acheter par catégorie
        </h2>

        {isError && (
          <ErrorState
            message={
              (error as Error).message ??
              "Impossible de charger les catégories."
            }
          />
        )}

        {isLoading && (
          <div className="flex flex-col gap-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-black/10 py-5.5"
              >
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        )}

        {data && (
          <>
            {data.map((c) => (
              <div
                key={c.num}
                data-reveal
                onMouseEnter={() => setActiveCategory(c.name)}
                className={`group flex cursor-pointer items-center justify-between border-t border-black/10 py-5.5 transition-all duration-300 hover:translate-x-2 hover:border-black ${
                  currentCategory === c.name ? "translate-x-2 border-black" : ""
                }`}
              >
                <div className="flex items-baseline gap-4.5">
                  <span className="text-xs text-black/40 transition-colors duration-300">
                    {c.num}
                  </span>
                  <Link
                    href={CATEGORY_LINKS[c.name] ?? "/boutique"}
                    className={`font-serif text-xl text-black transition-all duration-300 group-hover:font-semibold sm:text-[22px] ${
                      currentCategory === c.name ? "font-semibold" : ""
                    }`}
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
            <div className="border-t border-black/10" />
          </>
        )}
      </div>
      <div
        data-reveal
        ref={imageRef}
        className="group relative aspect-4/3 overflow-hidden rounded-xl"
      >
        {activeImage ? (
          <Image
            src={activeImage}
            alt={currentCategory ?? "Catégorie Anissa Cosmetics"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 "
          />
        ) : (
          <ImagePlaceholder
            label="Image éditoriale de catégorie"
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
    </div>
  );
}
