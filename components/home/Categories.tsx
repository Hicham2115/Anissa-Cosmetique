"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { categoryListSchema } from "@/lib/validations";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { useScrollReveal } from "@/lib/useScrollReveal";

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

  return (
    <div
      id="categories"
      ref={scopeRef}
      className="mx-auto grid max-w-[1320px] scroll-mt-24 gap-10 px-4 pt-16 pb-5 sm:px-6 sm:pt-24 md:grid-cols-[0.85fr_1.15fr] md:items-center"
    >
      <div>
        <div data-reveal className="mb-3.5 text-xs tracking-[0.2em] text-brown uppercase">Catégories</div>
        <h2 data-reveal className="mb-9 font-serif text-3xl font-semibold text-ink">Acheter par catégorie</h2>

        {isError && <ErrorState message={(error as Error).message ?? "Impossible de charger les catégories."} />}

        {isLoading && (
          <div className="flex flex-col gap-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between border-t border-border-sand py-5.5">
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
                className="group flex cursor-pointer items-center justify-between border-t border-border-sand py-5.5 transition-all duration-300 hover:translate-x-2 hover:border-brown"
              >
                <div className="flex items-baseline gap-4.5">
                  <span className="text-xs text-gold transition-colors duration-300">{c.num}</span>
                  <span className="font-serif text-xl text-ink transition-colors duration-300 group-hover:text-brown sm:text-[22px]">
                    {c.name}
                  </span>
                </div>
                <span className="text-[13px] text-[#8a7c6c]">({c.count})</span>
              </div>
            ))}
            <div className="border-t border-border-sand" />
          </>
        )}
      </div>
      <div data-reveal className="group relative aspect-4/3 overflow-hidden rounded-xl">
        <ImagePlaceholder
          label="Image éditoriale de catégorie"
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
