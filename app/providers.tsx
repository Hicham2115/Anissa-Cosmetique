"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LenisProvider } from "@/components/LenisProvider";
import { Toaster } from "@/components/ui/sonner";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60_000, retry: 2 } },
      })
  );

  // Stores use skipHydration so the first client render matches the
  // server (empty state); rehydrate from localStorage only after mount
  // to avoid a hydration mismatch.
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>{children}</LenisProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
