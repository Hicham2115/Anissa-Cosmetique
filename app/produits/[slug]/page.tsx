import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Footer } from "@/components/home/Footer";
import { SITE_NAME, pageOpenGraph, pageTwitter } from "@/lib/site";
import { getProductBySlug } from "@/lib/getProductBySlug";
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
  const product = await getProductBySlug(slug).catch(() => null);

  // Prefers Shopify's "Search engine listing" SEO override (product.seo.*)
  // when set in admin, then the product's own name/description, and only
  // falls back to a slug-derived title when the product can't be fetched
  // (e.g. Shopify unreachable).
  const plainTitle = product?.name ?? titleFromSlug(slug);
  const description =
    product?.seoDescription ||
    (product ? `${product.subtitle} — ${SITE_NAME}, formulé et fabriqué à Casablanca.` : null) ||
    `Découvrez ${plainTitle}, formulé et fabriqué à Casablanca par ${SITE_NAME}.`;
  // Shopify's SEO title already includes the site name, so it must bypass
  // the root layout's `%s | Anissa Cosmetics` template (via `absolute`)
  // instead of going through the templated `title` field, which would
  // append the site name a second time.
  const ogTitle = product?.seoTitle || `${plainTitle} | ${SITE_NAME}`;

  return {
    title: product?.seoTitle ? { absolute: product.seoTitle } : plainTitle,
    description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: pageOpenGraph({
      title: ogTitle,
      description,
      url: `/produits/${slug}`,
      ...(product?.image ? { images: [{ url: product.image, width: 1200, height: 1200, alt: plainTitle }] } : {}),
    }),
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
