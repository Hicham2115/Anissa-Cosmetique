import type { Metadata } from "next";
import { Urbanist, Mukta_Mahee, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PromoPopup } from "@/components/PromoPopup";

// Brand type spec calls for Roden (headings) and Lavender (slogan), which
// aren't distributed on Google Fonts — Urbanist and Josefin Sans stand in
// as the closest geometric/extended matches until real font files arrive.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const muktaMahee = Mukta_Mahee({
  variable: "--font-mukta-mahee",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Anissa Cosmetics", template: "%s | Anissa Cosmetics" },
  description: "Soins et cosmétiques de luxe discret, formulés à Casablanca.",
  openGraph: { type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${urbanist.variable} ${muktaMahee.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream font-sans text-ink">
        <Providers>{children}</Providers>
        <PromoPopup />
      </body>
    </html>
  );
}
