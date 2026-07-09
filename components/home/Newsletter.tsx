"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/axios";
import { newsletterSchema } from "@/lib/validations";
import { useScrollReveal } from "@/lib/useScrollReveal";

async function subscribe(email: string) {
  const { data } = await api.post("/newsletter", { email });
  return data as { message: string };
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const scopeRef = useScrollReveal<HTMLDivElement>();

  const mutation = useMutation({
    mutationFn: subscribe,
    onError: (err) => {
      toast.error(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? "Échec de l'inscription. Veuillez réessayer.")
          : "Échec de l'inscription. Veuillez réessayer."
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? "Email invalide");
      return;
    }

    try {
      await mutation.mutateAsync(result.data.email);
      setEmail("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFieldError(err.response?.data?.message ?? "Échec de l'inscription. Veuillez réessayer.");
      } else {
        setFieldError("Échec de l'inscription. Veuillez réessayer.");
      }
    }
  };

  return (
    <div id="newsletter" ref={scopeRef} className="scroll-mt-24 bg-brown px-4 py-20 text-center sm:px-6">
      <div className="mx-auto max-w-md">
        <div data-reveal className="mb-3 font-serif text-3xl text-cream sm:text-4xl">Rejoignez le cercle Anissa</div>
        <div data-reveal className="mb-9 text-sm text-sand-light">
          Accès anticipé aux nouvelles formules, et un cadeau à l&rsquo;occasion.
        </div>

        <form
          data-reveal
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-sm items-center gap-2 border-b border-cream/40 pb-3 transition-colors duration-200 focus-within:border-cream"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-sm text-cream placeholder:text-sand-light outline-none"
            aria-invalid={!!fieldError}
            aria-describedby={fieldError ? "newsletter-error" : undefined}
          />
          <button
            type="submit"
            aria-label="S'inscrire"
            disabled={mutation.isPending}
            className="group/btn shrink-0 cursor-pointer text-cream transition-transform duration-200 hover:scale-110 disabled:opacity-50"
          >
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </form>

        {fieldError && (
          <p id="newsletter-error" className="mt-4 text-xs text-red-200">
            {fieldError}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="mt-4 text-xs text-sand-light">Vous êtes inscrite. Bienvenue dans le cercle.</p>
        )}
      </div>
    </div>
  );
}
