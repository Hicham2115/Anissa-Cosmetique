import { create } from "zustand";

interface UiState {
  isLoading: boolean;
  setLoaded: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoading: true,
  setLoaded: () => set({ isLoading: false }),
}));
