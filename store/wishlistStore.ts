import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  price: string;
  image: string | null;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) =>
        set((state) => {
          const existing = state.items.some((i) => i.productId === item.productId);
          return {
            items: existing
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      isLiked: (productId) => get().items.some((i) => i.productId === productId),
      count: () => get().items.length,
    }),
    { name: "wishlist-storage", partialize: (state) => ({ items: state.items }) }
  )
);
