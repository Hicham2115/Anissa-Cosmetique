"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { reviewListSchema } from "@/lib/validations";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

async function fetchReviews() {
  const { data } = await api.get("/reviews");
  return reviewListSchema.parse(data);
}

const RATING_BREAKDOWN = [
  { label: "5.0", count: "14K avis", pct: 82 },
  { label: "4.0", count: "6K avis", pct: 58 },
  { label: "3.0", count: "4K avis", pct: 34 },
  { label: "2.0", count: "800 avis", pct: 18 },
  { label: "1.0", count: "9K avis", pct: 62 },
];

const CATEGORY_SCORES = [
  { label: "Efficacité", score: "4.5" },
  { label: "Parfum", score: "4.0" },
  { label: "Emballage", score: "4.0" },
  { label: "Texture", score: "3.5" },
  { label: "Rapport qualité-prix", score: "3.5" },
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

export function Testimonials() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.reviews(),
    queryFn: fetchReviews,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="mb-1 font-serif text-[28px] font-semibold text-ink sm:text-3xl">Avis</h2>
      <div className="mb-8 border-b border-border-sand pt-4" />

      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex shrink-0 flex-col items-center gap-1 sm:border-r sm:border-border-sand sm:pr-10">
          <div className="font-serif text-5xl text-ink">4.3</div>
          <StarRow stars={4} />
          <div className="text-xs text-[#8a7c6c]">35K évaluations</div>
        </div>

        <div className="flex-1 space-y-2.5">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.label} className="flex items-center gap-3 text-xs text-[#5c534a]">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-linear-to-r from-brown to-gold"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <div className="w-28 shrink-0 text-right">
                {row.label} &nbsp;{row.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {CATEGORY_SCORES.map((cat) => (
          <div
            key={cat.label}
            className="rounded-full border border-border-sand bg-sand-light px-4 py-2 text-xs text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brown hover:shadow-sm"
          >
            <span className="font-semibold text-brown">{cat.score}</span> {cat.label}
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border-sand">
        {isError && (
          <div className="pt-8">
            <ErrorState message={(error as Error).message ?? "Impossible de charger les avis."} />
          </div>
        )}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b border-border-sand py-6">
              <div className="mb-3 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="mb-2 h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}

        {data?.map((r) => (
          <div key={r.id} className="group border-b border-border-sand py-6 transition-colors duration-200 last:border-b-0 hover:bg-sand-light/40">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-light font-serif text-sm text-brown transition-transform duration-300 group-hover:scale-110">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-semibold text-ink">{r.name}</span>{" "}
                  <span className="text-xs text-[#8a7c6c]">{r.timeAgo}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">{r.stars}.0</span>
                <StarRow stars={r.stars} />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#3a332c]">{r.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
