"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { sportLabels } from "@/data/products";
import type { Product } from "@/data/products";

type Props = {
  sportLabel: string;
  sameCategory: Product[];
  crossCategory: Product[];
};

function RelatedMarquee({ items }: { items: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const s = useRef({ offset: 0, dragging: false, paused: false, startX: 0, startOffset: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    // reset offset when items change (tab switch)
    s.current.offset = 0;
    s.current.paused = false;
    s.current.dragging = false;

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

      const half = track.scrollWidth / 2;
      if (half > 0) {
        s.current.offset = s.current.offset % half;
        if (s.current.offset > 0) s.current.offset -= half;
      }

      track.style.transform = `translateX(${s.current.offset}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [items]);

  const onTouchStart = (e: React.TouchEvent) => {
    clearTimeout(timerRef.current);
    s.current.paused = true;
    s.current.dragging = true;
    s.current.startX = e.touches[0].clientX;
    s.current.startOffset = s.current.offset;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!s.current.dragging) return;
    s.current.offset = s.current.startOffset + (e.touches[0].clientX - s.current.startX);
  };

  const onTouchEnd = () => {
    s.current.dragging = false;
    timerRef.current = setTimeout(() => { s.current.paused = false; }, 1500);
  };

  // duplicate items for seamless loop
  const doubled = [...items, ...items];

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
        className="flex gap-3 pb-2 will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((other, i) => (
          <Link
            key={`${other.slug}-${i}`}
            href={`/products/${other.slug}`}
            className="group w-36 shrink-0 rounded-2xl border border-zinc-200 bg-zinc-50 p-2.5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:w-44"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={other.images.thumb}
                alt={other.name}
                fill
                sizes="176px"
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
        ))}
      </div>
    </div>
  );
}

export function ProductRelated({ sportLabel, sameCategory, crossCategory }: Props) {
  const [activeTab, setActiveTab] = useState<"same" | "cross">("same");

  const items = activeTab === "same" ? sameCategory : crossCategory;

  if (sameCategory.length === 0 && crossCategory.length === 0) return null;

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
      {/* Header + tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold tracking-tight">Produk Terkait</h2>
        <div className="flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 text-xs font-bold">
          {sameCategory.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("same")}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                activeTab === "same" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {sportLabel}
              <span className="ml-1.5 text-[10px] opacity-60">{sameCategory.length}</span>
            </button>
          )}
          {crossCategory.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("cross")}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                activeTab === "cross" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              Lainnya
              <span className="ml-1.5 text-[10px] opacity-60">{crossCategory.length}</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <RelatedMarquee key={activeTab} items={items} />
      </div>

      <div className="mt-2 text-right">
        <Link href="/products" className="text-xs font-bold text-zinc-400 hover:text-zinc-700">
          Lihat semua produk →
        </Link>
      </div>
    </section>
  );
}
