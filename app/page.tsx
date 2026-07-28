import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { BonusOffer } from "@/components/home/BonusOffer";
import { BestSellers } from "@/components/home/BestSellers";
import { AntiAgeSpotlight } from "@/components/home/AntiAgeSpotlight";
import { EclatSpotlight } from "@/components/home/EclatSpotlight";
import { CleanserSpotlight } from "@/components/home/CleanserSpotlight";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedBanner } from "@/components/home/FeaturedBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";
import { ContactForm } from "@/components/home/ContactForm";
import { Commitments } from "@/components/home/Commitments";
import { Footer } from "@/components/home/Footer";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";

const TITLE = "Accueil";
const DESCRIPTION =
  "Anissa Cosmetics — soins et cosmétiques de luxe discret, formulés à Casablanca. Formules propres, ingrédients naturels, fabriqués au Maroc.";
const OG_TITLE = `${TITLE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: OG_TITLE,
    description: DESCRIPTION,
    url: "/",
  }),
  twitter: pageTwitter({ title: OG_TITLE, description: DESCRIPTION }),
};

export default function Home() {
  return (
    <ErrorBoundary>
      <LoadingScreen />
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <BonusOffer />
        <Commitments />
        <BestSellers />
        <AntiAgeSpotlight />
        <EclatSpotlight />
        <CleanserSpotlight />
        <ValueProps />
        {/* <FeaturedBanner /> */}
        <Testimonials />
        <VideoTestimonials />
        {/* <Instagr
        amGallery /> */}
        <Newsletter />
        <ContactForm />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
