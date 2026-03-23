"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { waUrl } from "@/lib/wa";
import { useSearch } from "@/context/search-context";

const PLACEHOLDERS = [
  "Cari apa yang kamu butuhkan...",
  "Coba: ring basket FIBA...",
  "Coba: pengiriman luar kota...",
  "Coba: custom ukuran lapangan...",
  "Coba: harga gawang futsal...",
];

const productCategories = [
  { id: "all", label: "Semua Produk", href: "/products" },
  { id: "basketball", label: "Basket", href: "/products?cat=basketball" },
  { id: "volleyball", label: "Voli", href: "/products?cat=volleyball" },
  { id: "football", label: "Futsal", href: "/products?cat=football" },
  { id: "badminton", label: "Badminton", href: "/products?cat=badminton" },
  { id: "padel", label: "Padel", href: "/products?cat=padel" },
  { id: "tennis", label: "Tenis", href: "/products?cat=tennis" },
];

const refereeChairCategories = [
  { id: "referee-chair", label: "Semua Kursi Wasit", href: "/products?cat=referee-chair" },
  { id: "referee-chair-badminton", label: "Kursi Wasit Badminton", href: "/products?cat=referee-chair-badminton" },
  { id: "referee-chair-volleyball", label: "Kursi Wasit Voli", href: "/products?cat=referee-chair-volleyball" },
  { id: "referee-chair-tennis", label: "Kursi Wasit Tenis", href: "/products?cat=referee-chair-tennis" },
];

const otherNavLinks = [
  { label: "Project", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [refereeChairHover, setRefereeChairHover] = useState(false);
  const [refereeChairMobileOpen, setRefereeChairMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderVisible(false);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setPlaceholderVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isProductsActive = pathname.startsWith("/products");

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      {/* Row 1: Logo + Nav + CTA */}
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <div className="relative h-9 w-20 overflow-hidden sm:h-10 sm:w-28">
            <Image
              src="/images/logo/logo%20pfs.jpg"
              alt="Logo ProFabric Steel"
              fill
              sizes="112px"
              priority
              className="object-contain object-left mix-blend-multiply contrast-125 saturate-125"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-bold tracking-tight text-zinc-900 sm:text-[15px]">
              PFS Peralatan Olahraga
            </p>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.11em] text-zinc-500 sm:text-xs">
              Peralatan Lapangan Profesional
            </p>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Produk with hover dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProductDropdownOpen(true)}
            onMouseLeave={() => setProductDropdownOpen(false)}
          >
            <Link
              href="/products"
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isProductsActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              Produk
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={`h-3 w-3 transition-transform duration-200 ${productDropdownOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {productDropdownOpen && (
              <div className="absolute left-0 top-full z-50 w-48 pt-1">
                <div className="rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-lg">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setProductDropdownOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  {/* Kursi Wasit nested flyout */}
                  <div
                    className="relative"
                    onMouseEnter={() => setRefereeChairHover(true)}
                    onMouseLeave={() => setRefereeChairHover(false)}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      Kursi Wasit
                      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 shrink-0" aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {refereeChairHover && (
                      <div className="absolute left-full top-0 w-52 pl-1">
                        <div className="rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-lg">
                          {refereeChairCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={cat.href}
                              onClick={() => { setProductDropdownOpen(false); setRefereeChairHover(false); }}
                              className="block px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other nav links */}
          {otherNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 md:hidden"
          >
            <span className="sr-only">Menu</span>
            {isOpen ? (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Search bar */}
      <div className="border-t border-zinc-100">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-2 sm:px-6">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Cari produk, artikel, halaman..."
            className="flex w-full items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-left text-sm transition hover:border-zinc-300 hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-900" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span
              className="flex-1 text-zinc-400 transition-opacity duration-300"
              style={{ opacity: placeholderVisible ? 1 : 0 }}
            >
              {PLACEHOLDERS[placeholderIndex]}
            </span>
            <kbd className="hidden rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:block">
              Ctrl K
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {/* Produk accordion */}
            <div>
              <button
                type="button"
                onClick={() => setProductMenuOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isProductsActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Produk
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${productMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {productMenuOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-zinc-100 pl-3">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  {/* Kursi Wasit sub-accordion */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setRefereeChairMobileOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      Kursi Wasit
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`h-3 w-3 transition-transform duration-200 ${refereeChairMobileOpen ? "rotate-90" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {refereeChairMobileOpen && (
                      <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l-2 border-zinc-100 pl-3">
                        {refereeChairCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {otherNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={waUrl("Halo admin PFS, saya mau konsultasi")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
            >
              <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Hubungi Kami
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
