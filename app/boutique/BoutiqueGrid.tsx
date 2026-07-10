"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { categoryListSchema, productListSchema } from "@/lib/validations";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard, ProductCardSkeleton } from "@/components/home/ProductCard";

async function fetchCategories() {
  const { data } = await api.get("/categories");
  return categoryListSchema.parse(data);
}

async function fetchProducts(category: string | null) {
  const { data } = await api.get("/products", { params: category ? { category } : undefined });
  return productListSchema.parse(data);
}

export function BoutiqueGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: fetchCategories,
  });

  const productsQuery = useQuery({
    queryKey: queryKeys.products(activeCategory ?? undefined),
    queryFn: () => fetchProducts(activeCategory),
  });

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`cursor-pointer rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
            activeCategory === null
              ? "border-brown bg-brown text-cream"
              : "border-border-sand bg-sand-light text-ink hover:border-brown"
          }`}
        >
          Tous
        </button>

        {categoriesQuery.isLoading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-9 w-28 rounded-full" />)}

        {categoriesQuery.data?.map((c) => (
          <button
            key={c.num}
            type="button"
            onClick={() => setActiveCategory(c.name)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
              activeCategory === c.name
                ? "border-brown bg-brown text-cream"
                : "border-border-sand bg-sand-light text-ink hover:border-brown"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {productsQuery.isError && (
        <ErrorState message={(productsQuery.error as Error).message ?? "Impossible de charger les produits."} />
      )}
      <div className="grid grid-cols-2 gap-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {productsQuery.isLoading && Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        {productsQuery.data?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {productsQuery.data?.length === 0 && (
        <p className="py-16 text-center text-sm text-[#8a7c6c]">Aucun produit dans cette catégorie.</p>
      )}
    </>
  );
}
