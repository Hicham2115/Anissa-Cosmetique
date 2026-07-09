"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { api } from "@/lib/axios";
import { contactSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

const CONTACT_INFO = [
  { icon: Mail, label: "bonjour@anissacosmetics.ma", href: "mailto:bonjour@anissacosmetics.ma" },
  { icon: Phone, label: "+212 6 61 93 34 16", href: "tel:+212661933416" },
  { icon: MapPin, label: "Casablanca, Maroc", href: "https://maps.google.com/?q=Casablanca,Maroc" },
];

async function sendMessage(payload: FormState) {
  const { data } = await api.post("/contact", payload);
  return data as { message: string };
}

const inlineField =
  "min-w-0 flex-1 border-0 border-b-2 border-ink/15 bg-transparent px-1 pb-1 font-serif text-2xl text-ink outline-none transition-colors duration-200 placeholder:font-sans placeholder:text-lg placeholder:text-ink/30 focus:border-gold sm:text-3xl";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const scopeRef = useScrollReveal<HTMLDivElement>();

  const mutation = useMutation({
    mutationFn: sendMessage,
    onError: (err) =>
      toast.error(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? "Échec de l'envoi. Veuillez réessayer.")
          : "Échec de l'envoi. Veuillez réessayer."
      ),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }

    try {
      await mutation.mutateAsync(result.data);
      setForm(INITIAL_STATE);
    } catch (err) {
      setFieldError(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? "Échec de l'envoi. Veuillez réessayer.")
          : "Échec de l'envoi. Veuillez réessayer."
      );
    }
  };

  return (
    <div id="footer-contact" className="relative scroll-mt-24 overflow-hidden bg-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-gold/10 blur-3xl" />

      <div ref={scopeRef} className="relative mx-auto max-w-4xl">
        <div data-reveal className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">/ Contact</div>
        <h2 data-reveal className="mb-14 font-serif text-[34px] leading-tight font-bold text-ink sm:text-[48px]">
          Une question ? Écrivez-nous
        </h2>

        <form onSubmit={handleSubmit}>
          <div data-reveal className="flex flex-wrap items-end gap-x-3 gap-y-2 text-lg text-ink sm:text-xl">
            <span className="pb-1">Bonjour, je m&rsquo;appelle</span>
            <input
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`${inlineField} basis-40`}
              required
            />
          </div>

          <div data-reveal className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-2 text-lg text-ink sm:text-xl">
            <span className="pb-1">Vous pouvez me joindre à</span>
            <input
              type="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`${inlineField} basis-56`}
              required
            />
            <span className="pb-1">!</span>
          </div>

          <div data-reveal className="mt-10">
            <label className="mb-2 block text-[11px] tracking-[0.15em] text-brown uppercase">
              Mon message
            </label>
            <Textarea
              placeholder="Comment pouvons-nous vous aider ?"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              aria-invalid={!!fieldError}
              aria-describedby={fieldError ? "contact-form-error" : undefined}
              className="w-full resize-none rounded-none border-0 border-b border-border-sand bg-transparent px-0 py-2.5 font-sans text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-[#b3a897] focus:border-gold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            data-reveal
            className="group mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-xs tracking-wider text-cream uppercase transition-all duration-200 hover:scale-105 hover:bg-brown active:scale-95 disabled:opacity-50"
          >
            {mutation.isPending ? "Envoi..." : "Envoyer"}
            <ArrowRight
              className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          {fieldError && (
            <p id="contact-form-error" className="mt-4 text-xs text-red-700">
              {fieldError}
            </p>
          )}
          {mutation.isSuccess && (
            <p className="mt-4 text-xs text-brown">Merci, votre message a bien été envoyé.</p>
          )}
        </form>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-border-sand pt-10">
          {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-reveal
              className="group flex items-center gap-3.5 rounded-full py-1 pr-2 transition-colors duration-200 hover:bg-white/60"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/15 group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] group-hover:ring-gold/30">
                <Icon className="h-4 w-4 text-brown transition-colors duration-200 group-hover:text-brown" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="text-[14px] font-medium text-ink transition-colors duration-200 group-hover:text-brown">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
