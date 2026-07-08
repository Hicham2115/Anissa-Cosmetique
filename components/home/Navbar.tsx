"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { scrollToSection } from "@/lib/lenis";
import logo from "@/app/assets/logo.png";

type NavLink =
  | { label: string; type: "route"; href: string }
  | { label: string; type: "scroll"; target: string };

const LEFT_LINKS: NavLink[] = [
  { label: "Boutique", type: "route", href: "/boutique" },
  { label: "Catégories", type: "scroll", target: "#categories" },
  { label: "Meilleures Ventes", type: "scroll", target: "#best-sellers" },
  { label: "Avis", type: "scroll", target: "#avis" },
];

const RIGHT_LINKS: NavLink[] = [
  { label: "À propos", type: "scroll", target: "#value-props" },
  { label: "Contact", type: "scroll", target: "#footer-contact" },
];

function NavAnchor({
  link,
  className,
  onNavigate,
}: {
  link: NavLink;
  className: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  if (link.type === "route") {
    return (
      <Link
        href={link.href}
        className={`group relative ${className}`}
        onClick={onNavigate}
      >
        {link.label}
        <span className="absolute -bottom-1 left-0 h-px max-w-0 bg-brown transition-all duration-300 group-hover:max-w-full" />
      </Link>
    );
  }

  return (
    <Link
      href={`/${link.target}`}
      className={`group relative ${className}`}
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/") {
          e.preventDefault();
          scrollToSection(link.target);
        }
      }}
    >
      {link.label}
      <span className="absolute -bottom-1 left-0 h-px max-w-0 bg-brown transition-all duration-300 group-hover:max-w-full" />
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());

  return (
    <div className="border-b border-border-sand bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4  sm:px-6">
        <nav className="hidden flex-1 items-center gap-9 lg:flex">
          {LEFT_LINKS.map((link) => (
            <NavAnchor
              key={link.label}
              link={link}
              className="text-[13px] tracking-wider text-ink transition-colors duration-200 hover:text-brown"
            />
          ))}
        </nav>

        <button
          className="flex items-center gap-1 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <Link
          href="/"
          className="shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={logo}
            alt="Anissa Cosmetics"
            priority
            className="h-16 w-auto sm:h-20"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
          <nav className="hidden items-center gap-5 lg:flex">
            {RIGHT_LINKS.map((link) => (
              <NavAnchor
                key={link.label}
                link={link}
                className="text-[13px] tracking-wider text-ink transition-colors duration-200 hover:text-brown"
              />
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              aria-label="Liste de souhaits"
              className="hidden transition-transform duration-200 hover:scale-110 sm:inline-flex"
            >
              <Heart
                className="h-[18px] w-[18px] text-ink"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
            <button
              aria-label="Panier"
              className="relative transition-transform duration-200 hover:scale-110"
            >
              <ShoppingBag
                className="h-[19px] w-[19px] text-ink"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-brown text-[9px] text-cream">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-border-sand px-6 py-6 lg:hidden">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
            <NavAnchor
              key={link.label}
              link={link}
              className="text-sm tracking-wider text-ink"
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </nav>
      )}
    </div>
  );
}
