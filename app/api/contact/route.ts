import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0]?.message ?? "Entrée invalide" },
        { status: 400 }
      );
    }

    // result.data is validated (name/email/message, length-capped) by contactSchema.
    // A real backend would persist this via a parameterized query / ORM binding
    // (never string-concatenated SQL) to stay injection-safe.

    return NextResponse.json({ message: "Message envoyé avec succès" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
