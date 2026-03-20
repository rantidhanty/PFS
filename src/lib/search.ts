import { products, sportLabels } from "@/data/products";
import { blogPosts } from "@/lib/blog";
import { projectCards } from "@/data/projects";

export type SearchItem = {
  type: "product" | "blog" | "page" | "project" | "faq";
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
    keywords: "katalog produk olahraga peralatan ring basket tiang voli badminton futsal padel tenis",
  },
  {
    type: "page",
    title: "Portfolio Project",
    subtitle: "Dokumentasi proyek yang telah kami kerjakan",
    badge: "Halaman",
    href: "/projects",
    keywords: "proyek portfolio project referensi dokumentasi sekolah venue",
  },
  {
    type: "page",
    title: "Blog & Tips",
    subtitle: "Panduan dan edukasi seputar olahraga",
    badge: "Halaman",
    href: "/blog",
    keywords: "blog tips panduan edukasi artikel cara memilih standar lapangan",
  },
  {
    type: "page",
    title: "FAQ",
    subtitle: "Pertanyaan yang sering ditanyakan",
    badge: "Halaman",
    href: "/faq",
    keywords: "faq pertanyaan jawaban informasi pengiriman custom garansi pemasangan harga",
  },
  {
    type: "page",
    title: "Tentang Kami",
    subtitle: "Profil ProFabric Steel, Bekasi · Sukatani, Cikarang",
    badge: "Halaman",
    href: "/tentang",
    keywords: "tentang profil perusahaan sejarah bekasi cikarang sukatani fabrikasi besi profesional tim workshop",
  },
  {
    type: "page",
    title: "Kontak & Lokasi",
    subtitle: "Jl. Mawar Raya No.1, Sukatani, Cikarang, Bekasi, Jawa Barat",
    badge: "Halaman",
    href: "/kontak",
    keywords: "kontak telepon alamat lokasi whatsapp maps bekasi sukatani cikarang jawa barat hubungi",
  },
];

// FAQ items — setiap pertanyaan & jawaban bisa ditemukan lewat search
const faqItems: SearchItem[] = [
  {
    type: "faq",
    title: "Apakah produk memenuhi standar internasional?",
    subtitle: "FIBA, FIVB, FIFA, BWF, FIP, ITF",
    badge: "FAQ",
    href: "/faq?open=0",
    keywords: "standar internasional fiba fivb fifa bwf fip itf ring basket tiang voli badminton futsal padel tenis kompetisi sekolah klub venue",
  },
  {
    type: "faq",
    title: "Apakah bisa dikirim ke luar Bekasi?",
    subtitle: "Pengiriman ke seluruh Indonesia",
    badge: "FAQ",
    href: "/faq?open=1",
    keywords: "kirim pengiriman luar bekasi seluruh indonesia ongkir ekspedisi estimasi 2 7 hari kerja",
  },
  {
    type: "faq",
    title: "Apakah ukuran bisa dikustom?",
    subtitle: "Custom ukuran, spesifikasi, dan finishing",
    badge: "FAQ",
    href: "/faq?open=2",
    keywords: "custom kustom ukuran spesifikasi finishing desain material venue lapangan pesanan order",
  },
  {
    type: "faq",
    title: "Bagaimana cara memesan atau konsultasi?",
    subtitle: "Hubungi via WhatsApp",
    badge: "FAQ",
    href: "/faq?open=3",
    keywords: "pesan order konsultasi whatsapp cara beli harga penawaran proses produksi",
  },
  {
    type: "faq",
    title: "Berapa lama proses pengerjaan?",
    subtitle: "3–7 hari kerja untuk produk standar",
    badge: "FAQ",
    href: "/faq?open=4",
    keywords: "lama pengerjaan waktu proses produksi 3 7 hari kerja standar custom estimasi",
  },
  {
    type: "faq",
    title: "Apakah tersedia layanan pemasangan?",
    subtitle: "Tersedia untuk area Bekasi dan sekitarnya",
    badge: "FAQ",
    href: "/faq?open=5",
    keywords: "pemasangan pasang instalasi jasa bekasi sekitar lokasi tim lapangan",
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
  badge: "Project",
  href: `/projects/${p.slug}`,
  keywords: [p.name, p.tag, p.location ?? "", p.summary ?? ""].join(" ").toLowerCase(),
}));

export const searchIndex: SearchItem[] = [
  ...productItems,
  ...blogItems,
  ...projectItems,
  ...faqItems,
  ...staticPages,
];

export function search(query: string, limit = 12): SearchItem[] {
  if (!query.trim()) return [];

  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const subtitleLower = item.subtitle.toLowerCase();
      const fullText = `${titleLower} ${item.keywords} ${subtitleLower}`;

      // Exact phrase match anywhere in full text — highest score
      const exactPhrase = query.toLowerCase().trim();
      if (titleLower.includes(exactPhrase)) return { item, score: 10 };
      if (fullText.includes(exactPhrase)) return { item, score: 6 };

      // All words must match (AND) — scores based on where they match
      const allMatch = words.every((w) => fullText.includes(w));
      if (!allMatch) return null;

      // Score: more words matching in title = higher
      const titleWordMatches = words.filter((w) => titleLower.includes(w)).length;
      const score = 3 + titleWordMatches;

      return { item, score };
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
  project: "Project",
  faq: "FAQ",
};

export const typeColor: Record<SearchItem["type"], string> = {
  product: "bg-orange-100 text-orange-800",
  blog: "bg-sky-100 text-sky-800",
  page: "bg-zinc-100 text-zinc-700",
  project: "bg-emerald-100 text-emerald-800",
  faq: "bg-violet-100 text-violet-800",
};
