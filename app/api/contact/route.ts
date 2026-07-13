import { NextResponse } from "next/server";
import { contactSchema, zodErrorResponse } from "@/lib/validations";
import { getResend, resendConfigured } from "@/lib/resend";
import { CONTACT_EMAIL } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return zodErrorResponse(result, "Entrée invalide");
    }

    // result.data is validated (name/email/message, length-capped) by contactSchema.
    const { name, email, message } = result.data;

    if (!resendConfigured) {
      return NextResponse.json(
        { message: "Le service d'email n'est pas configuré." },
        { status: 500 }
      );
    }

    const { error } = await getResend().emails.send({
      from: `Anissa Cosmetics <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nouveau message de contact — ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ message: "Échec de l'envoi du message." }, { status: 502 });
    }

    return NextResponse.json({ message: "Message envoyé avec succès" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
