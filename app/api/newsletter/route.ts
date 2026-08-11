import { NextResponse } from "next/server";
import { newsletterSchema, zodErrorResponse } from "@/lib/validations";
import { getResend, resendConfigured } from "@/lib/resend";
import { buildNewsletterEmailHtml, buildNewsletterEmailText } from "@/lib/contactEmailTemplate";
import { CONTACT_EMAIL } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return zodErrorResponse(result, "Entrée invalide");
    }

    // result.data.email is validated + sanitized by newsletterSchema.
    // A real backend would persist this via a parameterized query /
    // ORM binding (never string-concatenated SQL) to stay injection-safe.
    const { email } = result.data;

    if (resendConfigured) {
      const { error } = await getResend().emails.send({
        // Sandbox sender — anissacosmetics.com isn't verified on Resend yet.
        // Switch to `Anissa Cosmetics <${CONTACT_EMAIL}>` once the domain is verified.
        from: "Anissa Cosmetics <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: "Nouvelle inscription newsletter",
        html: buildNewsletterEmailHtml(email),
        text: buildNewsletterEmailText(email),
      });

      if (error) {
        console.error(error);
        return NextResponse.json({ message: "Échec de l'inscription." }, { status: 502 });
      }
    }

    return NextResponse.json({ message: "Inscription réussie" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
