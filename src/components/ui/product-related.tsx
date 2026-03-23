"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { sportLabels } from "@/data/products";
import type { Product } from "@/data/products";

type Props = {
  sportLabel: string;
  sameCategory: Product[];
  crossCategory: Product[];
};

const MARQUEE_MIN_ITEMS = 4;

function RelatedCard({ other }: { other: Product }) {
  return (
    <Link
      href={`/products/${other.slug}`}
      draggable={false}
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-2.5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={other.images.thumb}
          alt={other.name}
          fill
          sizes="176px"
          draggable={false}
          className="object-contain p-1 transition duration-300 group-hover:scale-105"
        />
      </div>
      <span className="mt-2 inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-600">
        {sportLabels[other.sport]}
      </span>
      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-zinc-800 transition group-hover:text-orange-700">
        {other.name}
      </p>
      {other.variant && (
        <p className="mt-0.5 text-[10px] text-zinc-400">{other.variant}</p>
      )}
      <p className="mt-1.5 text-[11px] font-bold text-orange-600">Lihat →</p>
    </Link>
  );
}

function RelatedCarousel({ items }: { items: Product[] }) {
  const autoplay = useRef(
    Autoplay({
      delay: 2800,
      stopOnInteraction: false,
      playOnInit: true,
      stopOnFocusIn: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: items.length > 3,
      dragFree: false,
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      skipSnaps: false,
      watchDrag: true,
    },
    [autoplay.current],
  );

  useEffect(() => {
    if (!emblaApi) return;

    autoplay.current.play();

    const onPointerDown = () => autoplay.current.stop();
    const onPointerUp = () => autoplay.current.reset();
    const onSettle = () => autoplay.current.play();

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    emblaApi.on("settle", onSettle);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const pauseAutoplay = () => autoplay.current.stop();
  const resumeAutoplay = () => autoplay.current.play();

  return (
    <div className="relative">
      <div
        className="overflow-hidden cursor-grab select-none active:cursor-grabbing"
        ref={emblaRef}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
      >
        <div className="-ml-3 flex [touch-action:pan-y]">
          {items.map((other) => (
            <div
              key={other.slug}
              className="min-w-0 flex-[0_0_46%] pl-3 sm:flex-[0_0_32%] lg:flex-[0_0_24%]"
            >
              <RelatedCard other={other} />
            </div>
          ))}
        </div>
      </div>

      {items.length > 2 && (
        <>
          <button
            type="button"
            aria-label="Produk terkait sebelumnya"
            onClick={scrollPrev}
            className="absolute -left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-md transition hover:border-zinc-300 hover:text-zinc-900 md:flex"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Produk terkait berikutnya"
            onClick={scrollNext}
            className="absolute -right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-md transition hover:border-zinc-300 hover:text-zinc-900 md:flex"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <div className="mt-3 flex gap-2 md:hidden">
        <button
          type="button"
          aria-label="Produk terkait sebelumnya"
          onClick={scrollPrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Produk terkait berikutnya"
          onClick={scrollNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function RelatedStatic({ items }: { items: Product[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((other) => (
        <RelatedCard key={other.slug} other={other} />
      ))}
    </div>
  );
}

export function ProductRelated({ sportLabel, sameCategory, crossCategory }: Props) {
  const [activeTab, setActiveTab] = useState<"same" | "cross">(
    sameCategory.length > 0 ? "same" : "cross",
  );

  const items = activeTab === "same" ? sameCategory : crossCategory;

  if (sameCategory.length === 0 && crossCategory.length === 0) return null;

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
      {/* Header + tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <h2 className="text-lg font-extrabold tracking-tight">Produk Terkait</h2>
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:inline-flex sm:rounded-full sm:border sm:border-zinc-200 sm:bg-zinc-50 sm:p-0.5 sm:gap-0 text-xs font-bold">
          {sameCategory.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("same")}
              className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3 py-2 transition-colors sm:rounded-full sm:border-transparent sm:px-3.5 sm:py-1.5 ${
                activeTab === "same"
                  ? "border-orange-200 bg-orange-50 text-orange-700 sm:bg-zinc-900 sm:text-white"
                  : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 sm:bg-transparent"
              }`}
            >
              <span className="truncate">{sportLabel}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                activeTab === "same"
                  ? "bg-orange-100 text-orange-700 sm:bg-white/15 sm:text-white"
                  : "bg-zinc-100 text-zinc-500"
              }`}>{sameCategory.length}</span>
            </button>
          )}
          {crossCategory.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("cross")}
              className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3 py-2 transition-colors sm:rounded-full sm:border-transparent sm:px-3.5 sm:py-1.5 ${
                activeTab === "cross"
                  ? "border-sky-200 bg-sky-50 text-sky-700 sm:bg-zinc-900 sm:text-white"
                  : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 sm:bg-transparent"
              }`}
            >
              <span>Lainnya</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                activeTab === "cross"
                  ? "bg-sky-100 text-sky-700 sm:bg-white/15 sm:text-white"
                  : "bg-zinc-100 text-zinc-500"
              }`}>{crossCategory.length}</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        {items.length >= MARQUEE_MIN_ITEMS
          ? <RelatedCarousel key={activeTab} items={items} />
          : <RelatedStatic key={activeTab} items={items} />}
      </div>

      <div className="mt-2 text-right">
        <Link href="/products" className="text-xs font-bold text-zinc-400 hover:text-zinc-700">
          Lihat semua produk →
        </Link>
      </div>
    </section>
  );
}
