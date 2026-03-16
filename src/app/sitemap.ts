import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { projectCards } from "@/data/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteConfig.url}/tentang`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${siteConfig.url}/kontak`, changeFrequency: "monthly" as const, priority: 0.6 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectUrls: MetadataRoute.Sitemap = projectCards.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectUrls, ...productUrls];
}
