import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";
import { GenericProductDetail } from "./GenericProductDetail";

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  const description = `Découvrez ${title}, formulé et fabriqué à Casablanca par ${SITE_NAME}.`;
  const ogTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: pageOpenGraph({ title: ogTitle, description, url: `/produits/${slug}` }),
    twitter: pageTwitter({ title: ogTitle, description }),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <ErrorBoundary>
      <SiteHeader />
      <main>
        <GenericProductDetail slug={slug} />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
