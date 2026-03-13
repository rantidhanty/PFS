"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Produk", href: "#produk" },
  { label: "Project", href: "#project" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={handleBrandClick} className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="relative h-10 w-24 overflow-hidden sm:h-11 sm:w-32">
            <Image
              src="/images/logo/logo%20pfs.jpg"
              alt="Logo ProFabric Steel"
              fill
              sizes="128px"
              className="object-contain object-left mix-blend-multiply contrast-125 saturate-125"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-bold tracking-tight text-zinc-900 sm:text-[15px]">PFS Peralatan Olahraga</p>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.11em] text-zinc-500 sm:text-xs sm:tracking-[0.14em]">
              Peralatan Lapangan Profesional
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={pathname === "/" ? link.href : `/${link.href}`}
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={pathname === "/" ? link.href : `/${link.href}`}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
