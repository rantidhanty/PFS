import { products, sportLabels } from "@/data/products";
import { blogPosts } from "@/lib/blog";
import { projectCards } from "@/data/projects";

export type SearchItem = {
  type: "product" | "blog" | "page" | "project";
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  keywords: string;
};

const staticPages: SearchItem[] = [
  {
    type: "page",
    title: "Katalog Produk",
    subtitle: "Semua produk olahraga standar kompetisi",
    badge: "Halaman",
    href: "/products",
    keywords: "katalog produk olahraga peralatan",
  },
  {
    type: "page",
    title: "Portfolio Proyek",
    subtitle: "Dokumentasi proyek yang telah kami kerjakan",
    badge: "Halaman",
    href: "/projects",
    keywords: "proyek portfolio project referensi",
  },
  {
    type: "page",
    title: "Blog & Tips",
    subtitle: "Panduan dan edukasi seputar olahraga",
    badge: "Halaman",
    href: "/blog",
    keywords: "blog tips panduan edukasi artikel",
  },
  {
    type: "page",
    title: "FAQ",
    subtitle: "Pertanyaan yang sering ditanyakan",
    badge: "Halaman",
    href: "/faq",
    keywords: "faq pertanyaan jawaban informasi",
  },
  {
    type: "page",
    title: "Tentang Kami",
    subtitle: "Profil ProFabric Steel, Bekasi",
    badge: "Halaman",
    href: "/tentang",
    keywords: "tentang profil perusahaan sejarah bekasi fabrikasi",
  },
  {
    type: "page",
    title: "Kontak & Lokasi",
    subtitle: "Jl. Mawar Raya No.1, Sukatani, Bekasi",
    badge: "Halaman",
    href: "/kontak",
    keywords: "kontak telepon alamat lokasi whatsapp maps bekasi sukatani",
  },
];

const productItems: SearchItem[] = products.map((p) => ({
  type: "product" as const,
  title: p.name,
  subtitle: `${sportLabels[p.sport]} · ${p.standards.join(", ")}`,
  badge: p.standards[0] ?? sportLabels[p.sport],
  href: `/products/${p.slug}`,
  keywords: [p.name, p.sport, sportLabels[p.sport], ...p.standards, p.type, p.variant ?? "", ...p.sportTags].join(" ").toLowerCase(),
}));

const blogItems: SearchItem[] = blogPosts.map((p) => ({
  type: "blog" as const,
  title: p.title,
  subtitle: `${p.category} · ${p.readingTime} menit baca`,
  badge: p.category,
  href: `/blog/${p.slug}`,
  keywords: [p.title, p.description, p.category, ...p.tags].join(" ").toLowerCase(),
}));

const projectItems: SearchItem[] = projectCards.map((p) => ({
  type: "project" as const,
  title: p.name,
  subtitle: p.location ?? p.tag,
  badge: "Proyek",
  href: `/projects/${p.slug}`,
  keywords: [p.name, p.tag, p.location ?? "", p.summary ?? ""].join(" ").toLowerCase(),
}));

export const searchIndex: SearchItem[] = [
  ...productItems,
  ...blogItems,
  ...projectItems,
  ...staticPages,
];

export function search(query: string, limit = 10): SearchItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const scored = searchIndex
    .map((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const keywordMatch = item.keywords.includes(q);
      if (!titleMatch && !keywordMatch) return null;
      // title match scores higher
      return { item, score: titleMatch ? 2 : 1 };
    })
    .filter(Boolean) as { item: SearchItem; score: number }[];

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}

export const typeLabel: Record<SearchItem["type"], string> = {
  product: "Produk",
  blog: "Blog",
  page: "Halaman",
  project: "Proyek",
};

export const typeColor: Record<SearchItem["type"], string> = {
  product: "bg-orange-100 text-orange-800",
  blog: "bg-sky-100 text-sky-800",
  page: "bg-zinc-100 text-zinc-700",
  project: "bg-emerald-100 text-emerald-800",
};
