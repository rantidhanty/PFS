"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Produk", href: "#produk" },
  { label: "Standar", href: "#standar" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-32 overflow-hidden">
            <Image
              src="/images/logo/logo%20pfs.jpg"
              alt="SportEquip Pro Logo"
              fill
              sizes="128px"
              className="object-contain object-left mix-blend-multiply contrast-125 saturate-125"
            />
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-bold tracking-tight text-zinc-900">PFS Peralatan Olahraga</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Peralatan Lapangan Profesional
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#kontak"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Minta Penawaran
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 md:hidden"
        >
          Menu
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Minta Penawaran
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
