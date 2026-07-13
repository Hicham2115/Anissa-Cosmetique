"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { reviewListSchema } from "@/lib/validations";
import { Skeleton } from "@/components/ui/skeleton";
import { StarRow } from "@/components/ui/star-row";

async function fetchProductReviews(slug: string) {
  const { data } = await api.get(`/products/${slug}/reviews`);
  return reviewListSchema.parse(data);
}

export function ProductReviews({ slug, className }: { slug: string; className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.productReviews(slug),
    queryFn: () => fetchProductReviews(slug),
  });

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <div className={className}>
      <div className="mb-9 text-xs tracking-[0.2em] text-brown uppercase">Avis clients</div>

      <div className="grid gap-5 sm:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border-sand p-5">
              <div className="mb-3 flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-3.5 w-20" />
              </div>
              <Skeleton className="mb-2 h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}

        {data?.map((review) => (
          <div key={review.id} className="rounded-2xl border border-border-sand bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(126,88,54,0.08)]">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light font-serif text-sm text-brown">
                {review.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{review.name}</div>
                <StarRow stars={review.stars} />
              </div>
            </div>
            <p dir="auto" className="text-[13px] leading-relaxed text-[#5c534a]">
              {review.quote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
