"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { products, sportLabels } from "@/data/products";
import type { SportCategory } from "@/data/products";
import { waUrl } from "@/config/site";

const PRODUCTS_PER_PAGE = 9;

const categoryTabs: Array<{ id: SportCategory | "all"; label: string }> = [
  { id: "all", label: "Semua" },
  { id: "basketball", label: "Basket" },
  { id: "volleyball", label: "Voli" },
  { id: "football", label: "Futsal" },
  { id: "badminton", label: "Badminton" },
  { id: "padel", label: "Padel" },
  { id: "tennis", label: "Tenis" },
  { id: "official-equipment", label: "Accesories" },
];

const standardColor: Record<string, string> = {
  FIBA: "bg-orange-100 text-orange-800",
  FIVB: "bg-sky-100 text-sky-800",
  FIFA: "bg-emerald-100 text-emerald-800",
  BWF: "bg-violet-100 text-violet-800",
  FIP: "bg-teal-100 text-teal-800",
  ITF: "bg-amber-100 text-amber-800",
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<SportCategory | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => activeCategory === "all" ? products : products.filter((p) => p.sport === activeCategory),
    [activeCategory],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  const changeCategory = (cat: SportCategory | "all") => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">

        {/* Header */}
        <div className="mb-6 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Katalog Produk
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Peralatan Olahraga Standar Kompetisi
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Seluruh produk sesuai standar internasional: FIBA, FIVB, FIFA, BWF, FIP, ITF. Custom ukuran tersedia.
          </p>

          {/* Category filter tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeCategory(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeCategory === tab.id
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product count */}
        <p className="mb-4 text-sm font-medium text-zinc-500">
          Menampilkan{" "}
          <span className="font-bold text-zinc-900">
            {start + 1}–{Math.min(start + PRODUCTS_PER_PAGE, filtered.length)}
          </span>{" "}
          dari{" "}
          <span className="font-bold text-zinc-900">{filtered.length}</span>{" "}
          produk
        </p>

        {/* Mobile: compact list */}
        <div className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm sm:hidden">
          {paginated.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-zinc-50"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                <Image
                  src={product.images.thumb}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className="object-contain p-1 transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-zinc-600">
                    {sportLabels[product.sport]}
                  </span>
                  {product.standards.map((std) => (
                    <span
                      key={std}
                      className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${standardColor[std] ?? "bg-zinc-100 text-zinc-700"}`}
                    >
                      {std}
                    </span>
                  ))}
                </div>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 transition group-hover:text-orange-700">
                  {product.name}
                </p>
                {product.variant && (
                  <p className="text-[11px] text-zinc-400">{product.variant}</p>
                )}
              </div>
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-zinc-300" aria-hidden="true">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {paginated.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
                <Image
                  src={product.images.thumb}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 30vw, 280px"
                  className="object-contain p-2 transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-600">
                    {sportLabels[product.sport]}
                  </span>
                  {product.standards.map((std) => (
                    <span
                      key={std}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${standardColor[std] ?? "bg-zinc-100 text-zinc-700"}`}
                    >
                      {std}
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-sm font-bold leading-snug text-zinc-900 transition group-hover:text-orange-700 sm:text-base">
                  {product.name}
                </h2>
                {product.variant && (
                  <p className="mt-0.5 text-xs text-zinc-500">{product.variant}</p>
                )}
                <p className="mt-2 text-xs font-semibold text-orange-600 sm:text-sm">
                  Lihat Detail →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {/* Prev */}
            {safePage > 1 ? (
              <button
                type="button"
                onClick={() => changePage(safePage - 1)}
                aria-label="Halaman sebelumnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 text-zinc-300">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => changePage(pg)}
                aria-label={`Halaman ${pg}`}
                aria-current={pg === safePage ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                  pg === safePage
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {pg}
              </button>
            ))}

            {/* Next */}
            {safePage < totalPages ? (
              <button
                type="button"
                onClick={() => changePage(safePage + 1)}
                aria-label="Halaman berikutnya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100 text-zinc-300">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        )}

        {/* CTA bottom */}
        <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 px-5 py-5 sm:px-6">
          <p className="font-semibold text-zinc-900 sm:text-lg">
            Tidak menemukan yang dicari? Kami menerima custom order.
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Konsultasikan spesifikasi dan kebutuhan Anda langsung dengan tim PFS.
          </p>
          <a
            href={waUrl("Halo admin PFS, saya mau konsultasi produk custom")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
          >
            <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Konsultasi Custom Order
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
