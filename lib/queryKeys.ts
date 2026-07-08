export const queryKeys = {
  products: (category?: string) => ["products", category ?? "all"] as const,
  categories: () => ["categories"] as const,
  reviews: () => ["reviews"] as const,
};
