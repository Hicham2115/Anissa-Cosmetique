"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Search,
  X,
} from "lucide-react";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import {
  categoryListSchema,
  productListSchema,
  type Product,
} from "@/lib/validations";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/home/ProductCard";
import { useScrollReveal } from "@/lib/useScrollReveal";

type PriceSort = "asc" | "desc" | null;

async function fetchCategories() {
  const { data } = await api.get("/categories");
  return categoryListSchema.parse(data);
}

async function fetchProducts(category: string | null) {
  const { data } = await api.get("/products", {
    params: category ? { category } : undefined,
  });
  return productListSchema.parse(data);
}

function parsePrice(price: string) {
  return parseFloat(price.replace(/[^0-9.,]/g, "").replace(",", ".")) || 0;
}

function normalize(text: string) {
  return text.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function filterAndSortProducts(
  products: Product[],
  search: string,
  priceSort: PriceSort,
) {
  const query = normalize(search);
  const filtered = query
    ? products.filter(
        (p) =>
          normalize(p.name).includes(query) ||
          normalize(p.subtitle).includes(query),
      )
    : products;

  if (!priceSort) return filtered;

  return [...filtered].sort((a, b) => {
    const diff = parsePrice(a.price) - parsePrice(b.price);
    return priceSort === "asc" ? diff : -diff;
  });
}

export function BoutiqueGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState<PriceSort>(null);

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: fetchCategories,
  });

  const productsQuery = useQuery({
    queryKey: queryKeys.products(activeCategory ?? undefined),
    queryFn: () => fetchProducts(activeCategory),
  });

  const visibleProducts = useMemo(
    () => filterAndSortProducts(productsQuery.data ?? [], search, priceSort),
    [productsQuery.data, search, priceSort],
  );

  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="group relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-black/35 transition-colors group-focus-within:text-brown" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full rounded-full border-border-sand bg-sand-light py-3 pr-10 pl-11 shadow-none transition-colors focus:border-brown focus:bg-cream"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Effacer la recherche"
              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-black/35 transition-colors hover:text-brown"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriceSort(priceSort === "asc" ? null : "asc")}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-colors duration-200 hover:shadow-sm ${
              priceSort === "asc"
                ? "border-brown bg-brown text-cream"
                : "border-border-sand bg-sand-light text-ink hover:border-brown"
            }`}
          >
            <ArrowUpNarrowWide className="h-3.5 w-3.5" />
            Prix croissant
          </button>
          <button
            type="button"
            onClick={() => setPriceSort(priceSort === "desc" ? null : "desc")}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-colors duration-200 hover:shadow-sm ${
              priceSort === "desc"
                ? "border-brown bg-brown text-cream"
                : "border-border-sand bg-sand-light text-ink hover:border-brown"
            }`}
          >
            <ArrowDownWideNarrow className="h-3.5 w-3.5" />
            Prix décroissant
          </button>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          data-reveal
          onClick={() => setActiveCategory(null)}
          className={`cursor-pointer rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-colors duration-200 hover:shadow-sm ${
            activeCategory === null
              ? "border-brown bg-brown text-cream"
              : "border-border-sand bg-sand-light text-ink hover:border-brown"
          }`}
        >
          Tous
        </button>

        {categoriesQuery.isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full" />
          ))}

        {categoriesQuery.data?.map((c) => (
          <button
            key={c.num}
            type="button"
            data-reveal
            onClick={() => setActiveCategory(c.name)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-colors duration-200 hover:shadow-sm ${
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
        <ErrorState
          message={
            (productsQuery.error as Error).message ??
            "Impossible de charger les produits."
          }
        />
      )}
      <div className="grid grid-cols-2 gap-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {productsQuery.isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {productsQuery.data && visibleProducts.length === 0 && (
        <p className="py-16 text-center text-sm text-[#8a7c6c]">
          {search
            ? "Aucun produit ne correspond à votre recherche."
            : "Aucun produit dans cette catégorie."}
        </p>
      )}
    </div>
  );
}
