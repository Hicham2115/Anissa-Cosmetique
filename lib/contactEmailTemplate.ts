import type { ContactInput } from "@/lib/validations";

// Inline-styled, table-based layout — required for consistent rendering
// across email clients (Outlook/Gmail strip <style> tags and flexbox/grid).
export function buildContactEmailHtml({ name, email, message }: ContactInput): string {
  const safeMessage = message.replace(/\n/g, "<br />");
  const receivedAt = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Casablanca",
  });

  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nouveau message de contact</title>
  </head>
  <body style="margin:0; padding:0; background-color:#efe8dc; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efe8dc; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#faf7f2; border-radius:12px; overflow:hidden; box-shadow:0 2px 20px rgba(42,36,32,0.08);">
            <!-- Header -->
            <tr>
              <td style="background-color:#2a2420; padding:32px 40px; text-align:center;">
                <p style="margin:0; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#c9a86a;">Anissa Cosmetics</p>
                <h1 style="margin:8px 0 0; font-size:22px; font-weight:700; color:#faf7f2;">Nouveau message de contact</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:18px;">
                      <p style="margin:0 0 4px; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#7e5836;">De</p>
                      <p style="margin:0; font-size:16px; color:#2a2420; font-weight:600;">${escapeHtml(name)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:18px; border-bottom:1px solid #e4d9c7;">
                      <p style="margin:0 0 4px; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#7e5836;">Email</p>
                      <p style="margin:0; font-size:16px;">
                        <a href="mailto:${escapeHtml(email)}" style="color:#2a2420; text-decoration:none; font-weight:600;">${escapeHtml(email)}</a>
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 8px; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#7e5836;">Message</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4efe5; border-radius:8px; border:1px solid #e4d9c7;">
                  <tr>
                    <td style="padding:20px 22px; font-size:15px; line-height:1.7; color:#2a2420;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:8px 40px 36px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:999px; background-color:#2a2420;">
                      <a href="mailto:${escapeHtml(email)}" style="display:inline-block; padding:13px 28px; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#faf7f2; text-decoration:none; font-weight:600;">
                        Répondre à ${escapeHtml(name.split(" ")[0] ?? name)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 40px; background-color:#f4efe5; border-top:1px solid #e4d9c7; text-align:center;">
                <p style="margin:0; font-size:12px; color:#7e5836;">Reçu le ${receivedAt} via le formulaire de contact du site</p>
                <p style="margin:6px 0 0; font-size:12px; color:#a89a85;">Anissa Cosmetics · Casablanca, Maroc</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildContactEmailText({ name, email, message }: ContactInput): string {
  return `Nouveau message de contact\n\nDe: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
