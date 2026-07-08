import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { BestSellers } from "@/components/home/BestSellers";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedBanner } from "@/components/home/FeaturedBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";
import { ContactForm } from "@/components/home/ContactForm";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Anissa Cosmetics — soins et cosmétiques de luxe discret, formulés à Casablanca. Formules propres, ingrédients naturels, fabriqués au Maroc.",
};

export default function Home() {
  return (
    <ErrorBoundary>
      <LoadingScreen />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <BestSellers />
        <ValueProps />
        <FeaturedBanner />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
        <ContactForm />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
