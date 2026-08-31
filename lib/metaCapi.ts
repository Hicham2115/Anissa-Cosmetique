import "server-only";
import { createHash } from "node:crypto";

// Server-side mirror of lib/metaPixel.ts. The browser pixel misses events
// when JS never finishes loading (slow mobile, in-app browsers, ad blockers)
// — exactly the gap causing ad clicks to not show up as landings/purchases.
// Sending the same event here, keyed by the same eventId the client sends,
// gives Meta a second, more reliable path and lets it dedupe the two.
const PIXEL_ID = "1066896412464459";
const GRAPH_API_VERSION = "v21.0";

export const metaCapiConfigured = Boolean(process.env.META_CAPI_ACCESS_TOKEN);

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

// Best-effort extraction of Meta's own click-tracking cookies, when present,
// to improve event match quality — never required for the call to succeed.
function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1];
}

interface MetaCapiEvent {
  eventName: "Purchase" | "Lead" | "InitiateCheckout";
  eventId: string;
  value?: number;
  currency?: string;
  contentIds?: string[];
  phone?: string;
  request: Request;
}

export async function sendMetaCapiEvent(event: MetaCapiEvent) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    console.warn("[metaCapi] META_CAPI_ACCESS_TOKEN not set — skipping server-side event", event.eventName);
    return;
  }

  const cookieHeader = event.request.headers.get("cookie");
  const userData: Record<string, unknown> = {
    client_ip_address: event.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    client_user_agent: event.request.headers.get("user-agent") ?? undefined,
    fbp: readCookie(cookieHeader, "_fbp"),
    fbc: readCookie(cookieHeader, "_fbc"),
    ph: event.phone ? [sha256(event.phone.replace(/\D/g, ""))] : undefined,
  };

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.request.headers.get("referer") ?? undefined,
        user_data: userData,
        custom_data: {
          currency: event.currency ?? "MAD",
          value: event.value,
          content_ids: event.contentIds,
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      console.error("[metaCapi] Meta rejected the event:", res.status, await res.text());
    }
  } catch (err) {
    // Never let a tracking failure affect the order flow that triggered it.
    console.error("[metaCapi] Failed to reach Meta:", err);
  }
}
