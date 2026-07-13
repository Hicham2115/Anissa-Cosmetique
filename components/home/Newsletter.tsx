"use client";

import { ArrowRight } from "lucide-react";
import { useNewsletterForm } from "@/lib/useNewsletterForm";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Newsletter() {
  const { email, setEmail, fieldError, handleSubmit, mutation } = useNewsletterForm();
  const scopeRef = useScrollReveal<HTMLDivElement>();

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
