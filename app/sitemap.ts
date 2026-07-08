import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/boutique", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/conditions-generales", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/politique-de-confidentialite", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
