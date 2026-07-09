"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/axios";
import { newsletterSchema } from "@/lib/validations";
import logo from "@/app/assets/logo.png";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const FOOTER_COLUMNS = [
  {
    title: "Boutique",
    links: ["Soins", "Maquillage", "Parfums", "Coffrets Cadeaux"],
  },
  {
    title: "Service Client",
    links: [
      "Nous Contacter",
      "Livraison & Retours",
      "FAQ",
      "Suivre ma Commande",
    ],
  },
];

const SOCIAL_LINKS = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575226775162",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/anissacosmeticsofficiel/",
  },
];

async function subscribe(email: string) {
  const { data } = await api.post("/newsletter", { email });
  return data as { message: string };
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: subscribe,
    onError: (err) =>
      toast.error(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? "Échec de l'inscription. Veuillez réessayer.")
          : "Échec de l'inscription. Veuillez réessayer."
      ),
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
      setFieldError(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ??
              "Échec de l'inscription. Veuillez réessayer.")
          : "Échec de l'inscription. Veuillez réessayer.",
      );
    }
  };

  return (
    <div className="relative overflow-hidden bg-ink px-4 pt-24 pb-8 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1320px] gap-12 sm:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <div className="w-fit brightness-0 invert transition-transform duration-300 hover:-translate-y-0.5">
            <Image src={logo} alt="Anissa Cosmetics" className="h-24 w-auto" />
          </div>
          <p className="mt-5 max-w-60 text-[13px] leading-relaxed text-cream/50">
            Soins et cosmétiques de luxe discret, formulés avec soin à
            Casablanca.
          </p>

          <div className="mt-7 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="mb-6 text-xs tracking-[0.2em] text-gold uppercase">
              {col.title}
            </div>
            <div className="flex flex-col gap-4 text-[15px] text-cream/70">
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="group w-fit transition-colors duration-200 hover:text-cream"
                >
                  {link}
                  <span className="block h-px max-w-0 bg-gold transition-all duration-300 group-hover:max-w-full" />
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="mb-6 text-xs tracking-[0.2em] text-gold uppercase">
            Rejoindre notre newsletter
          </div>
          <p className="mb-5 max-w-64 text-[13px] leading-relaxed text-cream/50">
            Accès anticipé aux nouvelles formules, et un cadeau à
            l&rsquo;occasion.
          </p>
          <form onSubmit={handleSubmit} className="max-w-72">
            <div className="flex items-center justify-between rounded-full border border-cream/15 bg-cream/5 py-2 pr-2 pl-4 transition-colors duration-200 focus-within:border-gold">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!fieldError}
                aria-describedby={
                  fieldError ? "footer-newsletter-error" : undefined
                }
                className="w-full bg-transparent text-[14px] text-cream placeholder:text-cream/40 outline-none"
              />
              <button
                type="submit"
                aria-label="S'inscrire"
                disabled={mutation.isPending}
                className="group/btn flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gold text-ink transition-transform duration-200 hover:scale-105 disabled:opacity-50"
              >
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
          {fieldError && (
            <p
              id="footer-newsletter-error"
              className="mt-3 text-xs text-red-300"
            >
              {fieldError}
            </p>
          )}
          {mutation.isSuccess && (
            <p className="mt-3 text-xs text-cream/50">Inscription réussie.</p>
          )}
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-[1320px] border-t border-cream/10 pt-8">
        <div className="flex flex-col items-center gap-3 text-xs text-white/90 sm:flex-row sm:justify-between">
          <div>
            &copy; {new Date().getFullYear()} Anissa. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/conditions-generales"
              className="transition-colors duration-200 hover:text-gold"
            >
              Conditions Générales
            </Link>
            <span
              className="h-1 w-1 rounded-full bg-cream/20"
              aria-hidden="true"
            />
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors duration-200 hover:text-gold"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/90 sm:text-left">
          &copy; {new Date().getFullYear()} – Designed &amp; developed by{" "}
          <a
            className="underline decoration-cream/20 underline-offset-2 transition-colors duration-200 hover:text-gold hover:decoration-gold"
            href="https://www.stallionadvertising.ma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stallion Advertising
          </a>
          .
        </p>
      </div>
    </div>
  );
}
