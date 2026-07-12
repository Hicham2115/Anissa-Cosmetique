import "server-only";
import { Resend } from "resend";

// Server-only: the API key must never reach client bundles. Route Handlers
// are the sole caller — see app/api/contact/route.ts.
//
// The Resend constructor throws immediately if the key is missing, which
// would crash the build (env vars aren't available at build time on most
// hosts) if instantiated eagerly at module scope — so it's built lazily,
// only when a route actually sends an email.
export const resendConfigured = Boolean(process.env.RESEND_API_KEY);

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
