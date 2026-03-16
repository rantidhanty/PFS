"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, sportLabels } from "@/data/products";

const featuredSlugs = [
  "ring-basket-fiba-portable",
  "net-volleyball-fivb",
  "goal-post-11v11",
  "court-post-badminton",
  "tiang-padel",
  "tiang-tennis",
];

const featured = featuredSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter(Boolean) as (typeof products)[number][];

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  const total = featured.length;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollLeft = card.offsetLeft; // instant, no smooth — avoids mobile page scroll interference
    setActiveIndex(index);
  };

  const next = () => scrollToIndex((activeIndex + 1) % total);
  const prev = () => scrollToIndex((activeIndex - 1 + total) % total);

  // Watch visibility — only auto-advance when carousel is on screen
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.2 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Auto-advance — desktop only, only when visible and not hovered
  useEffect(() => {
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
    const schedule = () => {
      timerRef.current = setTimeout(() => {
        if (isDesktop() && isVisibleRef.current && !isHoveredRef.current) {
          setActiveIndex((i) => {
            const next = (i + 1) % total;
            const track = trackRef.current;
            if (track) {
              const card = track.children[next] as HTMLElement;
              if (card) track.scrollLeft = card.offsetLeft;
            }
            return next;
          });
        }
        schedule();
      }, 3500);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [total]);

  // Sync active dot when user swipes manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 0;
      if (!cardWidth) return;
      const idx = Math.round(track.scrollLeft / (cardWidth + 12)); // 12 = gap-3
      setActiveIndex(Math.min(Math.max(idx, 0), total - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {featured.map((product, i) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group w-[72%] shrink-0 snap-start rounded-2xl border border-zinc-100 bg-zinc-50 p-2.5 transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-sm sm:w-[44%] lg:w-[30%]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
              <Image
                src={product.images.thumb}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 65vw, (max-width: 1024px) 40vw, 280px"
                className="object-contain p-1.5 transition duration-300 group-hover:scale-105"
                priority={i < 2}
              />
            </div>
            <p className="mt-2 line-clamp-2 text-xs font-semibold text-zinc-800 transition group-hover:text-orange-700 sm:text-sm">
              {product.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1">
              {product.standards[0] && (
                <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-orange-800">
                  {product.standards[0]}
                </span>
              )}
              <span className="inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
                {sportLabels[product.sport]}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Prev / Next — desktop only */}
      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={prev}
        className="absolute -left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-md transition hover:bg-zinc-50 active:scale-95 md:flex md:h-9 md:w-9"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-zinc-600" aria-hidden="true">
          <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={next}
        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-md transition hover:bg-zinc-50 active:scale-95 md:flex md:h-9 md:w-9"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-zinc-600" aria-hidden="true">
          <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {featured.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Produk ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-5 bg-orange-500" : "w-1.5 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
