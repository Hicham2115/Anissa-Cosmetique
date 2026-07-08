import { create } from "zustand";

interface UiState {
  isLoading: boolean;
  setLoaded: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoading: true,
  setLoaded: () => set({ isLoading: false }),
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true, isWishlistOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  isWishlistOpen: false,
  openWishlist: () => set({ isWishlistOpen: true, isCartOpen: false }),
  closeWishlist: () => set({ isWishlistOpen: false }),
}));
