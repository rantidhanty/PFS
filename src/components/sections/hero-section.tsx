"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { waUrl } from "@/lib/wa";
import type { SportCategory } from "@/data/products";

type MarqueeCat = {
  id: SportCategory;
  label: string;
  standard: string;
  border: string;
  badge: string;
  hover: string;
  image: string | null;
};

function CategoryMarquee({ categories }: { categories: MarqueeCat[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const s = useRef({ offset: 0, dragging: false, paused: false, startX: 0, startOffset: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 40; // px/s
    let lastTs = 0;

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      if (!s.current.paused && !s.current.dragging) {
        s.current.offset -= (SPEED * delta) / 1000;
      }

      // Normalize offset into (-halfWidth, 0] — handles both directions
      const half = track.scrollWidth / 2;
      if (half > 0) {
        s.current.offset = s.current.offset % half;
        if (s.current.offset > 0) s.current.offset -= half;
      }

      track.style.transform = `translateX(${s.current.offset}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    clearTimeout(timerRef.current);
    s.current.paused = true;
    s.current.dragging = true;
    s.current.startX = e.touches[0].clientX;
    s.current.startOffset = s.current.offset;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!s.current.dragging) return;
    const dx = e.touches[0].clientX - s.current.startX;
    s.current.offset = s.current.startOffset + dx;
    // tick normalizes every frame — no need to clamp here
  };

  const onTouchEnd = () => {
    s.current.dragging = false;
    timerRef.current = setTimeout(() => { s.current.paused = false; }, 1500);
  };

  return (
    <div
      className="overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div
        ref={trackRef}
        className="flex gap-2 px-6 pb-1 will-change-transform"
        style={{ width: "max-content" }}
      >
        {[...categories, ...categories].map((cat, i) => (
          <Link
            key={`${cat.id}-${i}`}
            href={`/products?cat=${cat.id}`}
            className={`group flex w-28 shrink-0 flex-col items-center gap-1.5 rounded-2xl border bg-white p-2.5 transition-all duration-200 ${cat.border} ${cat.hover}`}
          >
            <div className="relative h-12 w-full overflow-hidden rounded-xl bg-zinc-50">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="112px"
                  className="object-contain p-1 transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ${cat.badge}`}>
                    {cat.standard}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-zinc-800">{cat.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${cat.badge}`}>
              {cat.standard}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const sportCategories: Array<{
  id: SportCategory | "referee-chair";
  label: string;
  standard: string;
  border: string;
  badge: string;
  hover: string;
}> = [
  {
    id: "basketball",
    label: "Basket",
    standard: "FIBA",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    hover: "hover:border-orange-400 hover:bg-orange-50",
  },
  {
    id: "volleyball",
    label: "Voli",
    standard: "FIVB",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-800",
    hover: "hover:border-sky-400 hover:bg-sky-50",
  },
  {
    id: "football",
    label: "Futsal",
    standard: "FIFA",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    hover: "hover:border-emerald-400 hover:bg-emerald-50",
  },
  {
    id: "badminton",
    label: "Badminton",
    standard: "BWF",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-800",
    hover: "hover:border-violet-400 hover:bg-violet-50",
  },
  {
    id: "padel",
    label: "Padel",
    standard: "FIP",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-800",
    hover: "hover:border-teal-400 hover:bg-teal-50",
  },
  {
    id: "tennis",
    label: "Tenis",
    standard: "ITF",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    hover: "hover:border-amber-400 hover:bg-amber-50",
  },
  {
    id: "referee-chair",
    label: "Kursi Wasit",
    standard: "BWF/FIVB/ITF",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-800",
    hover: "hover:border-rose-400 hover:bg-rose-50",
  },
  {
    id: "official-equipment",
    label: "Accessories",
    standard: "Multi",
    border: "border-zinc-200",
    badge: "bg-zinc-100 text-zinc-700",
    hover: "hover:border-zinc-400 hover:bg-zinc-50",
  },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 32, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };


  const categoryWithImage = sportCategories.map((cat) => {
    const thumb =
      cat.id === "referee-chair"
        ? (products.find((p) => (p.sport as string).startsWith("referee-chair-"))?.images.thumb ?? null)
        : (products.find((p) => p.sport === cat.id)?.images.thumb ?? null);
    return {
      ...cat,
      image: thumb && !thumb.includes("placeholder") ? thumb : null,
    };
  });

  return (
    <motion.section
      className="mb-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white sm:mb-5"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* ── Split: Teks kiri, Poster kanan ─────────────────────────────── */}
      <div className="grid items-center gap-0 lg:grid-cols-[1fr_0.85fr]">
        {/* Kiri: Konten utama */}
        <div className="order-2 p-6 sm:p-7 lg:order-1 lg:p-8 xl:p-10">
          {/* Location badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Bekasi, Jawa Barat
          </span>

          {/* Headline */}
          <h1 className="mt-3 text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            <span className="bg-linear-to-r from-zinc-900 via-zinc-800 to-orange-600 bg-clip-text text-transparent">
              ProFabric Steel
            </span>
          </h1>

          {/* Tagline */}
          <p className="mt-3 max-w-sm text-base leading-relaxed text-zinc-600 sm:text-lg">
            Peralatan olahraga standar kompetisi &amp; fabrikasi besi
            profesional.{" "}
            <span className="font-semibold text-zinc-800">
              Custom sesuai kebutuhan.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-5 flex gap-2.5">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-700 hover:shadow-md sm:gap-2 sm:px-5 sm:text-sm"
            >
              Lihat Katalog
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  d="M4 10h12M10 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href={waUrl("Halo admin PFS, saya mau konsultasi produk")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#20b558] hover:shadow-md sm:gap-2 sm:px-5 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Konsultasi Gratis
            </a>
          </div>

          {/* Marketplace logos */}
          <div className="mt-5 flex items-center gap-1">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              Tersedia di
            </span>
            <a
              href="https://tk.tokopedia.com/ZSuBFb7UA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Beli di Tokopedia TikTok Shop"
              className="transition hover:opacity-80"
            >
              <Image
                src="/images/logo/logo tiktokshop.png"
                alt="Tokopedia TikTok Shop"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
            </a>
            <a
              href="https://id.shp.ee/VJqfdMyT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Beli di Shopee"
              className="transition hover:opacity-80"
            >
              <Image
                src="/images/logo/logo shopee.png"
                alt="Shopee"
                width={120}
                height={40}
                className="h-auto w-auto max-h-9 max-w-[68px]"
              />
            </a>
            <a
              href={waUrl("Halo admin PFS")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via WhatsApp"
              className="transition hover:opacity-80"
            >
              <Image
                src="/images/logo/logo wa.png"
                alt="WhatsApp"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Kanan: Poster */}
        <div className="order-1 h-full lg:order-2">
          <div className="relative h-60 w-full overflow-hidden bg-zinc-50 sm:h-72 lg:h-full lg:min-h-105">
            <Image
              src="/images/posters/poster%20PFS.jpg"
              alt="ProFabric Steel — Semua Kebutuhan Olahraga Ada di Sini"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain object-center"
              priority
            />
            {/* Gradient fade ke kiri hanya di desktop */}
            <div className="absolute inset-y-0 left-0 hidden w-16 bg-linear-to-r from-white to-transparent lg:block" />
          </div>
        </div>
      </div>

      {/* ── Kategori Produk ─────────────────────────────────────────────── */}
      <div className="border-t border-zinc-100 pb-5 pt-5">
        <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 sm:px-7 lg:px-8 xl:px-10">
          Kategori Produk
        </p>

        {/* Semua ukuran: infinite marquee */}
        <CategoryMarquee categories={categoryWithImage} />
      </div>

    </motion.section>
  );
}
