"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config/site";
import { products, sportLabels } from "@/data/products";
import type { SportCategory } from "@/data/products";
import { ProductPriceDisplay } from "@/components/ui/product-price";
import { waUrl } from "@/lib/wa";

const PRODUCTS_PER_PAGE = 9;
const PLACEHOLDER_SRC = "/images/placeholder-product.svg";
const mainProducts = products.filter((p) => p.images.thumb !== PLACEHOLDER_SRC);
const comingSoonProducts = products.filter((p) => p.images.thumb === PLACEHOLDER_SRC);

const mainTabs: Array<{ id: SportCategory | "all" | "referee-chair"; label: string }> = [
  { id: "all", label: "Semua" },
  { id: "basketball", label: "Basket" },
  { id: "volleyball", label: "Voli" },
  { id: "football", label: "Futsal" },
  { id: "badminton", label: "Badminton" },
  { id: "padel", label: "Padel" },
  { id: "tennis", label: "Tenis" },
  { id: "referee-chair", label: "Kursi Wasit" },
];

const REFEREE_CHAIR_SPORTS: SportCategory[] = [
  "referee-chair-badminton",
  "referee-chair-volleyball",
  "referee-chair-tennis",
];

const isRefereeChairActive = (cat: string) =>
  cat === "referee-chair" || cat.startsWith("referee-chair-");

const standardColor: Record<string, string> = {
  FIBA: "bg-orange-100 text-orange-800",
  FIVB: "bg-sky-100 text-sky-800",
  FIFA: "bg-emerald-100 text-emerald-800",
  BWF: "bg-violet-100 text-violet-800",
  FIP: "bg-teal-100 text-teal-800",
  ITF: "bg-amber-100 text-amber-800",
};

export default function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") as SportCategory | null;
  const activeCategory = (catParam as SportCategory | "all" | "referee-chair") ?? "all";
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return mainProducts;
    if (activeCategory === "referee-chair")
      return mainProducts.filter((p) => REFEREE_CHAIR_SPORTS.includes(p.sport as SportCategory));
    return mainProducts.filter((p) => p.sport === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  const changeCategory = (cat: SportCategory | "all" | "referee-chair") => {
    setCurrentPage(1);

    const nextParams = new URLSearchParams(searchParams.toString());
    if (cat === "all") {
      nextParams.delete("cat");
    } else {
      nextParams.set("cat", cat);
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
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
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Katalog Produk
          </h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(standardColor).map(([std, color]) => (
              <span
                key={std}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${color}`}
              >
                {std}
              </span>
            ))}
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-500">
              Custom order tersedia
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-2 -mx-4 sm:mx-0">
          <div className="overflow-x-auto px-4 sm:px-0">
            <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
              {mainTabs.map((tab) => {
                const isActive = isRefereeChairActive(activeCategory)
                  ? tab.id === "referee-chair"
                  : activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => changeCategory(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {tab.label}
                    {tab.id === "referee-chair" && (
                      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sub-filter kursi wasit */}
        {isRefereeChairActive(activeCategory) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              { id: "referee-chair", label: "Semua Kursi Wasit" },
              { id: "referee-chair-badminton", label: "Badminton" },
              { id: "referee-chair-volleyball", label: "Voli" },
              { id: "referee-chair-tennis", label: "Tenis" },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => changeCategory(sub.id as SportCategory | "referee-chair")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  activeCategory === sub.id
                    ? "bg-rose-600 text-white"
                    : "border border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Product count */}
        <p className="mb-4 text-sm font-medium text-zinc-500">
          Menampilkan{" "}
          <span className="font-bold text-zinc-900">
            {start + 1}–{Math.min(start + PRODUCTS_PER_PAGE, filtered.length)}
          </span>{" "}
          dari{" "}
          <span className="font-bold text-zinc-900">{filtered.length}</span>{" "}
          produk
          {activeCategory !== "all" && (
            <span className="ml-1 text-zinc-400">
              · {mainTabs.find((t) => t.id === (isRefereeChairActive(activeCategory) ? "referee-chair" : activeCategory))?.label}
              {activeCategory === "referee-chair-badminton" && " — Badminton"}
              {activeCategory === "referee-chair-volleyball" && " — Voli"}
            </span>
          )}
        </p>

        {/* Mobile: compact list */}
        <div className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm sm:hidden">
          {paginated.map((product) => (
            <div key={product.slug} className="flex items-center">
              <Link
                href={`/products/${product.slug}`}
                className="group flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 transition hover:bg-zinc-50"
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-50">
                  <Image
                    src={product.images.thumb}
                    alt={product.name}
                    fill
                    sizes="44px"
                    className="object-cover object-top transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold leading-snug text-zinc-900 transition group-hover:text-orange-700">
                    {product.name}
                  </p>
                  {product.price ? (
                    <div className="mt-0.5">
                      <ProductPriceDisplay price={product.price} size="sm" />
                    </div>
                  ) : null}
                  <div className="mt-0.5 flex flex-wrap gap-1">
                    <span className="rounded-full bg-zinc-100 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-zinc-500">
                      {sportLabels[product.sport]}
                    </span>
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className={`rounded-full px-1.5 py-px text-[9px] font-extrabold uppercase tracking-wide ${standardColor[std] ?? "bg-zinc-100 text-zinc-700"}`}
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0 text-zinc-300" aria-hidden="true">
                  <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {/* WA + Shopee */}
              <div className="flex shrink-0 border-l border-zinc-100">
                <a
                  href={waUrl(`Halo admin PFS, saya mau konsultasi tentang ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Konsultasi WhatsApp"
                  className="flex flex-col items-center justify-center gap-0.5 bg-[#f0fdf4] px-2.5 py-2.5 transition hover:bg-[#dcfce7]"
                >
                  <Image src="/images/logo/logo wa.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
                </a>
                <div className="w-px bg-zinc-100" />
                <a
                  href={siteConfig.marketplace.shopee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Beli di Shopee"
                  className="flex flex-col items-center justify-center gap-0.5 bg-orange-50 px-2.5 py-2.5 transition hover:bg-orange-100"
                >
                  <Image src="/images/logo/logo shopee.png" alt="Shopee" width={36} height={12} className="h-3.5 w-auto" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {paginated.map((product) => (
            <div
              key={product.slug}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <Link href={`/products/${product.slug}`} className="block p-3">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.images.thumb}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 30vw, 280px"
                    className="object-contain transition duration-300 group-hover:scale-105"
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
                  {product.price ? (
                    <div className="mt-1.5">
                      <ProductPriceDisplay price={product.price} size="md" />
                    </div>
                  ) : null}
                  <p className="mt-2 text-xs font-semibold text-orange-600 sm:text-sm">
                    Lihat Detail →
                  </p>
                </div>
              </Link>
              {/* WA + Shopee bar */}
              <div className="flex rounded-b-2xl border-t border-zinc-100 overflow-hidden">
                <a
                  href={waUrl(`Halo admin PFS, saya mau konsultasi tentang ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Konsultasi WhatsApp"
                  className="flex flex-1 items-center justify-center gap-1.5 bg-[#f0fdf4] py-2.5 text-[11px] font-semibold text-[#15803d] transition hover:bg-[#dcfce7]"
                >
                  <Image src="/images/logo/logo wa.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <div className="w-px bg-zinc-100" />
                <a
                  href={siteConfig.marketplace.shopee.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Beli di Shopee"
                  className="flex flex-1 items-center justify-center gap-1.5 bg-orange-50 py-2.5 transition hover:bg-orange-100"
                >
                  <Image src="/images/logo/logo shopee.png" alt="Shopee" width={52} height={16} className="h-4 w-auto" />
                </a>
              </div>
            </div>
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

            {/* Page numbers with ellipsis */}
            {(() => {
              const pages: (number | "...")[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (safePage > 3) pages.push("...");
                for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
                if (safePage < totalPages - 2) pages.push("...");
                pages.push(totalPages);
              }
              return pages.map((pg, i) =>
                pg === "..." ? (
                  <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-zinc-400">…</span>
                ) : (
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
                )
              );
            })()}

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

        {/* Segera Hadir */}
        {comingSoonProducts.length > 0 && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 sm:px-5">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-amber-600" aria-hidden="true">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-sm font-extrabold text-zinc-900">Segera Hadir</h2>
            </div>

            {/* List */}
            <div className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
              {comingSoonProducts.map((product) => (
                <div key={product.slug} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                  <span className="text-sm font-semibold text-zinc-700">
                    {product.name}
                    <span className="ml-1.5 font-normal text-zinc-400">· {sportLabels[product.sport]}</span>
                  </span>
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${standardColor[std] ?? "bg-zinc-100 text-zinc-700"}`}
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle hint */}
            <p className="mt-2.5 text-right text-xs text-zinc-400">
              Tertarik?{" "}
              <a
                href={waUrl("Halo admin PFS, saya ingin tanya produk yang segera hadir")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-500 underline underline-offset-2 transition hover:text-zinc-800"
              >
                Hubungi kami →
              </a>
            </p>
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
