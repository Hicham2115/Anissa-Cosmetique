"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { productListSchema } from "@/lib/validations";
import { ErrorState } from "@/components/ui/error-state";
import { ProductCard, ProductCardSkeleton } from "@/components/home/ProductCard";

async function fetchProducts() {
  const { data } = await api.get("/products");
  return productListSchema.parse(data);
}

export function BestSellers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: fetchProducts,
  });

  return (
    <div id="best-sellers" className="mx-auto max-w-[1320px] scroll-mt-24 px-4 pt-16 pb-5 sm:px-6 sm:pt-24">
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="font-serif text-[28px] font-semibold text-ink sm:text-[34px]">Meilleures Ventes</h2>
        <a
          href="/boutique"
          className="group text-[13px] tracking-wider text-ink transition-colors duration-200 hover:text-brown"
        >
          Tout Voir{" "}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>

      {isError && <ErrorState message={(error as Error).message ?? "Impossible de charger les produits."} />}

      <div className="grid grid-cols-2 gap-4 sm:gap-5.5 lg:grid-cols-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        {data?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
