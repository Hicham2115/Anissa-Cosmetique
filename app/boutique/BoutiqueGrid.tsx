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

export function BoutiqueGrid() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.products(),
    queryFn: fetchProducts,
  });

  return (
    <>
      {isError && <ErrorState message={(error as Error).message ?? "Impossible de charger les produits."} />}
      <div className="grid grid-cols-2 gap-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        {data?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
