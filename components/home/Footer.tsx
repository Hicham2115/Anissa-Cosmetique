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
    links: ["Anti-Âge", "Éclat", "Nettoyants & Exfoliants", "Soins Ciblés"],
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
          ? (err.response?.data?.message ??
              "Échec de l'inscription. Veuillez réessayer.")
          : "Échec de l'inscription. Veuillez réessayer.",
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
    <div className="relative overflow-hidden bg-cream px-4 pt-16 sm:px-6">
      <div className="relative mx-auto max-w-[1320px] rounded-[32px] border border-border-sand bg-white p-8 shadow-[0_20px_60px_rgba(42,36,32,0.06)] sm:p-12">
        <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src={logo}
                alt="Anissa Cosmetics"
                className="h-28 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-64 text-[13px] leading-relaxed text-[#8a8378]">
              Soins et cosmétiques de luxe discret, formulés avec soin à
              Casablanca.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown"
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
              <div className="mb-5 text-sm font-semibold text-ink">
                {col.title}
              </div>
              <div className="flex flex-col gap-3.5 text-[14px] text-[#8a8378]">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="w-fit transition-colors duration-200 hover:text-brown"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mb-5 text-sm font-semibold text-ink">
              Newsletter
            </div>
            <p className="mb-4 max-w-56 text-[13px] leading-relaxed text-[#8a8378]">
              Accès anticipé aux nouvelles formules, et un cadeau à
              l&rsquo;occasion.
            </p>
            <form onSubmit={handleSubmit} className="max-w-72">
              <div className="flex items-center justify-between rounded-full border border-border-sand bg-sand-light py-1.5 pr-1.5 pl-4 transition-colors duration-200 focus-within:border-brown">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!fieldError}
                  aria-describedby={
                    fieldError ? "footer-newsletter-error" : undefined
                  }
                  className="w-full bg-transparent text-[14px] text-ink placeholder:text-[#8a8378] outline-none"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire"
                  disabled={mutation.isPending}
                  className="group/btn flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-cream transition-transform duration-200 hover:scale-105 disabled:opacity-50"
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
                className="mt-3 text-xs text-red-600"
              >
                {fieldError}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="mt-3 text-xs text-[#8a8378]">
                Inscription réussie.
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-3 border-t border-border-sand pt-6 text-xs text-[#8a8378] sm:flex-row sm:justify-between">
          <div>
            &copy; {new Date().getFullYear()} Anissa. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/conditions-generales"
              className="underline decoration-[#8a8378]/30 underline-offset-2 transition-colors duration-200 hover:text-brown"
            >
              Conditions Générales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="underline decoration-[#8a8378]/30 underline-offset-2 transition-colors duration-200 hover:text-brown"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative mx-auto h-24 max-w-[1320px] overflow-hidden sm:h-32">
        <div className="absolute inset-x-0 -top-6 text-center font-serif text-[19vw] leading-none font-bold text-ink/[0.045] select-none sm:text-[15vw]">
          Anissa
        </div>
      </div>

      <p className="relative pb-6 text-center text-[11px] text-[#8a8378]">
        &copy; {new Date().getFullYear()} – Designed &amp; developed by{" "}
        <a
          className="underline decoration-[#8a8378]/30 underline-offset-2 transition-colors duration-200 hover:text-brown"
          href="https://www.stallionadvertising.ma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stallion Advertising
        </a>
        .
      </p>
    </div>
  );
}
