// Thin wrapper around window.fbq for the standard Meta commerce events.
// Every call is a no-op if the pixel script (components/MetaPixel.tsx)
// hasn't loaded yet — e.g. an ad blocker, or firing before hydration.
"use client";

interface PixelItem {
  slug: string;
  name: string;
  price: number;
  quantity?: number;
}

function fire(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}

export function trackViewContent(item: PixelItem) {
  fire("ViewContent", {
    content_ids: [item.slug],
    content_type: "product",
    content_name: item.name,
    value: item.price,
    currency: "MAD",
  });
}

export function trackAddToCart(item: PixelItem) {
  fire("AddToCart", {
    content_ids: [item.slug],
    content_type: "product",
    content_name: item.name,
    value: item.price * (item.quantity ?? 1),
    currency: "MAD",
  });
}

export function trackInitiateCheckout(items: PixelItem[], value: number) {
  fire("InitiateCheckout", {
    content_ids: items.map((i) => i.slug),
    content_type: "product",
    num_items: items.reduce((n, i) => n + (i.quantity ?? 1), 0),
    value,
    currency: "MAD",
  });
}

export function trackPurchase(items: PixelItem[], value: number) {
  fire("Purchase", {
    content_ids: items.map((i) => i.slug),
    content_type: "product",
    value,
    currency: "MAD",
  });
}

export function trackLead() {
  fire("Lead", {});
}
