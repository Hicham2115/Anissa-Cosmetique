import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0]?.message ?? "Entrée invalide" },
        { status: 400 }
      );
    }

    // result.data.email is validated + sanitized by newsletterSchema.
    // A real backend would persist this via a parameterized query /
    // ORM binding (never string-concatenated SQL) to stay injection-safe.

    return NextResponse.json({ message: "Inscription réussie" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Une erreur est survenue" }, { status: 500 });
  }
}
