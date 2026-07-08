import { z } from "zod";

// Strips characters with no legitimate use in an email/name field but that
// are common SQL-injection payload building blocks (quotes, semicolons,
// comment markers, backslashes). Defense-in-depth alongside parameterized
// queries wherever this project talks to a real database.
const SQL_DANGEROUS_CHARS = /['";\\-]|(--)|(\/\*)|(\*\/)/g;

export function sanitizeInput(value: string): string {
  return value.replace(SQL_DANGEROUS_CHARS, "").trim();
}

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est requis")
    .max(254, "L'email est trop long")
    .email("Saisissez une adresse email valide")
    .transform(sanitizeInput),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),
  email: z
    .string()
    .trim()
    .min(1, "L'email est requis")
    .max(254, "L'email est trop long")
    .email("Saisissez une adresse email valide"),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message est trop long (2000 caractères maximum)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const productSchema = z.object({
  id: z.string(),
  slotId: z.string(),
  name: z.string(),
  subtitle: z.string(),
  price: z.string(),
  badge: z.string().nullable(),
  image: z.string().nullable().optional(),
});
export type Product = z.infer<typeof productSchema>;
export const productListSchema = z.array(productSchema);

export const categorySchema = z.object({
  num: z.string(),
  name: z.string(),
  count: z.number(),
});
export type Category = z.infer<typeof categorySchema>;
export const categoryListSchema = z.array(categorySchema);

export const reviewSchema = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  stars: z.number().min(1).max(5),
  timeAgo: z.string(),
});
export type Review = z.infer<typeof reviewSchema>;
export const reviewListSchema = z.array(reviewSchema);
