import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(err: unknown, fallback: string): string {
  return axios.isAxiosError(err) ? (err.response?.data?.message ?? fallback) : fallback;
}

// Prices are stored as display strings (e.g. "390 MAD") since that's what
// the Shopify formatter and fallback data produce — parse out the numeric
// amount only where arithmetic (cart subtotal) is actually needed.
export function parsePriceAmount(price: string): number {
  const match = price.replace(/\s/g, "").match(/[\d.,]+/);
  if (!match) return 0;
  return Number(match[0].replace(",", "."));
}

export function formatMad(amount: number): string {
  return `${Math.round(amount)} MAD`;
}
