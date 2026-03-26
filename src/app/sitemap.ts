import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { projectCards } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { blogPosts } from "@/lib/blog";

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
    priority: 0.9,
  }));

  const projectUrls: MetadataRoute.Sitemap = projectCards.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogListPage: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogListPage, ...projectUrls, ...productUrls, ...blogPostUrls];
}
