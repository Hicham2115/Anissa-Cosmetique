import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div>
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 sm:py-14">
          <Skeleton className="mb-8 h-3.5 w-56" />

          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="flex gap-4">
              <div className="flex shrink-0 flex-col gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-20 rounded-xl sm:w-24" />
                ))}
              </div>
              <Skeleton className="aspect-square flex-1 rounded-2xl" />
            </div>

            <div>
              <div className="mb-2 flex items-start justify-between gap-4">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              </div>

              <Skeleton className="mb-6 h-10 w-3/4" />

              <Skeleton className="mb-6 h-20 w-full rounded-2xl" />

              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-40 flex-1 rounded-full sm:flex-none" />
              </div>

              <div className="mt-9 grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Skeleton className="aspect-square w-full rounded-none" />
        <div className="px-4 pt-5 pb-4">
          <Skeleton className="mb-8 h-3.5 w-48" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-2 h-8 w-4/5" />
          <Skeleton className="mt-4 h-16 w-full rounded-2xl" />
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
          <Skeleton className="mt-5 h-12 w-full rounded-full" />
          <div className="mt-6 flex gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-32 shrink-0 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
