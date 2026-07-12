import "server-only";
import { Resend } from "resend";

// Server-only: the API key must never reach client bundles. Route Handlers
// are the sole caller — see app/api/contact/route.ts.
export const resend = new Resend(process.env.RESEND_API_KEY);

export const resendConfigured = Boolean(process.env.RESEND_API_KEY);
