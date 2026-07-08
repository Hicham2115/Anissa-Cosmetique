export const queryKeys = {
  products: (category?: string) => ["products", category ?? "all"] as const,
  product: (slug: string) => ["products", slug] as const,
  categories: () => ["categories"] as const,
  reviews: () => ["reviews"] as const,
};
