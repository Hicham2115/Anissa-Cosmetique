// Single source of truth for the delivery fee, shared by the cart drawer,
// the checkout page, and the order API route (which re-derives it from the
// validated cart rather than trusting a client-sent value).
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_FEE = 35;

export function computeShippingFee(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
