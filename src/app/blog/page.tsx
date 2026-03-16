import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { blogPosts, formatDate } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, panduan, dan edukasi seputar peralatan olahraga standar kompetisi dari ProFabric Steel.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog ProFabric Steel",
    description:
      "Tips, panduan, dan edukasi seputar peralatan olahraga standar kompetisi.",
    url: `${siteConfig.url}/blog`,
  },
};

const POSTS_PER_PAGE = 6;

const categoryColor: Record<string, string> = {
  Panduan: "bg-orange-100 text-orange-800",
  Edukasi: "bg-sky-100 text-sky-800",
  Tips: "bg-emerald-100 text-emerald-800",
};

const allCategories = [
  "Semua",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

function buildUrl(params: {
  kategori: string;
  page: number;
}) {
  const qs = new URLSearchParams();
  if (params.kategori !== "Semua") qs.set("kategori", params.kategori);
  if (params.page > 1) qs.set("page", String(params.page));
  const str = qs.toString();
  return `/blog${str ? `?${str}` : ""}`;
}

type Props = { searchParams: Promise<{ kategori?: string; page?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { kategori, page } = await searchParams;

  const activeCategory = kategori ?? "Semua";
  const currentPage = Math.max(1, parseInt(page ?? "1", 10));

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const filtered =
    activeCategory === "Semua"
      ? sorted
      : sorted.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  const featured = safePage === 1 ? paginated[0] : null;
  const rest = safePage === 1 ? paginated.slice(1) : paginated;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-5 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Blog
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Tips &amp; Edukasi Olahraga
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Panduan memilih peralatan, standar kompetisi, dan tips lapangan
            untuk atlet, sekolah, dan venue olahraga.
          </p>

          {/* Category tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={buildUrl({ kategori: cat, page: 1 })}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Jumlah artikel ──────────────────────────────────────────────── */}
        <p className="mb-4 text-sm font-medium text-zinc-500">
          {filtered.length === 0 ? (
            "Belum ada artikel di kategori ini."
          ) : (
            <>
              Menampilkan{" "}
              <span className="font-bold text-zinc-900">
                {start + 1}–{Math.min(start + POSTS_PER_PAGE, filtered.length)}
              </span>{" "}
              dari{" "}
              <span className="font-bold text-zinc-900">{filtered.length}</span>{" "}
              artikel
            </>
          )}
        </p>

        {filtered.length > 0 && (
          <>
            {/* ── Featured (halaman 1 saja) ──────────────────────────────── */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-4 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:flex-row sm:items-center sm:p-6"
              >
                {/* Label featured */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      Terbaru
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${categoryColor[featured.category] ?? "bg-zinc-100 text-zinc-700"}`}
                    >
                      {featured.category}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {featured.readingTime} menit baca
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-zinc-900 transition group-hover:text-orange-700 sm:text-2xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-base line-clamp-3">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-zinc-400">
                      {formatDate(featured.date)}
                    </span>
                    <span className="text-sm font-bold text-orange-600 transition group-hover:translate-x-0.5">
                      Baca Artikel →
                    </span>
                  </div>
                </div>

                {/* Cover image */}
                <div className="relative hidden shrink-0 overflow-hidden rounded-2xl bg-zinc-100 sm:block sm:h-36 sm:w-36 lg:h-44 lg:w-44">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="176px"
                    className="object-contain p-3 transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            )}

            {/* ── Grid artikel ───────────────────────────────────────────── */}
            {rest.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                  >
                    {/* Thumbnail */}
                    <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-zinc-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                        className="object-contain p-3 transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${categoryColor[post.category] ?? "bg-zinc-100 text-zinc-700"}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {post.readingTime} menit baca
                      </span>
                    </div>
                    <h2 className="mt-3 flex-1 text-base font-bold leading-snug text-zinc-900 transition group-hover:text-orange-700 sm:text-lg">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
                      <span className="text-xs text-zinc-400">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-xs font-semibold text-orange-600 transition group-hover:translate-x-0.5">
                        Baca →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ── Pagination ─────────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {/* Prev */}
                {safePage > 1 ? (
                  <Link
                    href={buildUrl({ kategori: activeCategory, page: safePage - 1 })}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
                    aria-label="Halaman sebelumnya"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 text-zinc-300">
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <Link
                    key={pg}
                    href={buildUrl({ kategori: activeCategory, page: pg })}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                      pg === safePage
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                    }`}
                    aria-label={`Halaman ${pg}`}
                    aria-current={pg === safePage ? "page" : undefined}
                  >
                    {pg}
                  </Link>
                ))}

                {/* Next */}
                {safePage < totalPages ? (
                  <Link
                    href={buildUrl({ kategori: activeCategory, page: safePage + 1 })}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
                    aria-label="Halaman berikutnya"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 text-zinc-300">
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
