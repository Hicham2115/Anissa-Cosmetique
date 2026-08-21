import { z } from "zod";
import { NextResponse } from "next/server";
import { GIFT_OPTIONS } from "@/lib/packs";

export function zodErrorResponse(result: z.ZodSafeParseError<unknown>, fallback: string) {
  return NextResponse.json({ message: result.error.issues[0]?.message ?? fallback }, { status: 400 });
}

// Strips characters with no legitimate use in an email/name field but that
// are common SQL-injection payload building blocks (quotes, semicolons,
// comment markers, backslashes). Defense-in-depth alongside parameterized
// queries wherever this project talks to a real database.
const SQL_DANGEROUS_CHARS = /['";\\-]|(--)|(\/\*)|(\*\/)/g;

export function sanitizeInput(value: string): string {
  return value.replace(SQL_DANGEROUS_CHARS, "").trim();
}

const nameField = z.string().trim().min(1, "Le nom est requis");

const emailField = z.string().trim().min(1, "L'email est requis");

export const newsletterSchema = z.object({
  email: emailField.transform(sanitizeInput),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  message: z.string().trim().min(1, "Le message est requis"),
});

export type ContactInput = z.infer<typeof contactSchema>;

const phoneField = z.string().trim().min(1, "Le numéro de téléphone est requis");

const addressField = z.string().trim().min(1, "L'adresse est requise");

export const codOrderSchema = z.object({
  productSlug: z.string().trim().min(1),
  productName: z.string().trim().min(1),
  name: nameField,
  phone: phoneField,
  address: addressField,
  quantity: z.number().int().positive().max(20).default(1),
  // Restricted to the known free-gift handles server-side (not just trusted
  // from the client) so a crafted request can't get an arbitrary product
  // for free — see GIFT_OPTIONS in lib/packs.ts.
  giftSlug: z
    .string()
    .trim()
    .refine((val) => GIFT_OPTIONS.some((g) => g.handle === val), "Cadeau invalide")
    .optional(),
});

export type CodOrderInput = z.infer<typeof codOrderSchema>;

// The subset of codOrderSchema the shopper actually fills in — productSlug/
// productName/quantity come from page context, not form fields — used to
// validate each TanStack Form field individually.
export const codOrderFormSchema = codOrderSchema.pick({ name: true, phone: true, address: true });

// Same contact fields as codOrderSchema, but for a full cart (checkout page)
// instead of a single product — see app/checkout.
export const cartOrderSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().trim().min(1),
        name: z.string().trim().min(1),
        price: z.string().trim().min(1),
        quantity: z.number().int().positive().max(20),
      })
    )
    .min(1, "Le panier est vide"),
  name: nameField,
  phone: phoneField,
  address: addressField,
});

export type CartOrderInput = z.infer<typeof cartOrderSchema>;

export const cartOrderFormSchema = cartOrderSchema.pick({ name: true, phone: true, address: true });

export const productSchema = z.object({
  id: z.string(),
  slotId: z.string(),
  name: z.string(),
  subtitle: z.string(),
  description: z.string().nullable().optional(),
  descriptionHtml: z.string().nullable().optional(),
  price: z.string(),
  compareAtPrice: z.string().nullable().optional(),
  badge: z.string().nullable(),
  image: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  availableForSale: z.boolean().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
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

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        handle: z.string().trim().min(1, "Le produit est requis"),
        quantity: z.number().int().positive().max(20),
      })
    )
    .min(1, "Le panier est vide"),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
