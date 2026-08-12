"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { reviewListSchema } from "@/lib/validations";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { StarRow } from "@/components/ui/star-row";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useScrollReveal } from "@/lib/useScrollReveal";

async function fetchReviews() {
  const { data } = await api.get("/reviews");
  return reviewListSchema.parse(data);
}

const RATING_BREAKDOWN = [
  { label: "5.0", count: "20K avis", pct: 100 },

  { label: "1.0", count: "17K avis", pct: 95 },
];

const CATEGORY_SCORES = [
  { label: "Efficacité", score: "4.9" },
  { label: "Parfum", score: "4.8" },
  { label: "Emballage", score: "4.8" },
  { label: "Texture", score: "5.0" },
  { label: "Rapport qualité-prix", score: "5.0" },
];

export function Testimonials() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.reviews(),
    queryFn: fetchReviews,
  });
  const scopeRef = useScrollReveal<HTMLDivElement>([data]);

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div
      id="avis"
      ref={scopeRef}
      className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <h2
        data-reveal
        className="mb-1 font-serif text-[28px] font-semibold text-ink sm:text-3xl"
      >
        Avis
      </h2>
      <div className="mb-8 border-b border-border-sand pt-4" />

      <div
        data-reveal
        className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10"
      >
        <div className="flex shrink-0 flex-col items-center gap-1 sm:border-r sm:border-border-sand sm:pr-10">
          <div className="font-serif text-5xl text-ink">4.8</div>
          <StarRow stars={4} />
          <div className="text-xs text-[#8a7c6c]">35K évaluations</div>
        </div>

        <div className="flex-1 space-y-2.5">
          {RATING_BREAKDOWN.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3 text-xs text-[#5c534a]"
            >
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
            data-reveal
            className="rounded-full border border-border-sand bg-sand-light px-4 py-2 text-xs text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brown hover:shadow-sm"
          >
            <span className="font-semibold text-brown">{cat.score}</span>{" "}
            {cat.label}
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border-sand pt-10">
        {isError && (
          <ErrorState
            message={
              (error as Error).message ?? "Impossible de charger les avis."
            }
          />
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border-sand p-6"
              >
                <Skeleton className="mb-4 h-5 w-5 rounded-full" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="mb-5 h-3 w-2/3" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.length > 0 && (
          <Carousel
            opts={{ align: "start" }}
            setApi={setApi}
            className="w-full"
          >
            <div
              data-reveal
              className="mb-8 flex items-end justify-between gap-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  Ce que disent{" "}
                  <span className="text-brown italic">nos clientes</span>
                </h3>
                <p className="mt-1 text-sm text-[#8a7c6c]">
                  Avis vérifiés de nos clientes
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <CarouselPrevious className="static h-9 w-9 translate-y-0 sm:h-10 sm:w-10" />
                <CarouselNext className="static h-9 w-9 translate-y-0 border-brown bg-brown text-cream hover:bg-brown/90 hover:text-cream sm:h-10 sm:w-10" />
              </div>
            </div>

            <CarouselContent>
              {data.map((r) => (
                <CarouselItem
                  key={r.id}
                  data-reveal
                  className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-100 border-border-sand/70 bg-white transition-all duration-300 hover:border-brown/40 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
                    <CardContent className="flex h-full flex-col overflow-hidden p-6">
                      <div className="flex items-center justify-between">
                        <Quote
                          className="h-6 w-6 text-gold/50"
                          fill="currentColor"
                          strokeWidth={0}
                          aria-hidden="true"
                        />
                        <StarRow stars={r.stars} />
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#3a332c]">
                        {r.quote}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-light font-serif text-sm text-brown">
                          {r.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-ink">
                            {r.name}
                          </div>
                          {r.timeAgo && (
                            <div className="text-xs text-[#8a7c6c]">
                              {r.timeAgo}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {scrollSnaps.length > 1 && (
              <div className="mt-7 flex items-center justify-center gap-1.5">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Aller au groupe d'avis ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === selectedIndex
                        ? "w-5 bg-brown"
                        : "w-1.5 bg-border-sand"
                    }`}
                  />
                ))}
              </div>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
}
