"use client";

import Image from "next/image";
import { useState, useRef, type TouchEvent } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images: rawImages, productName }: ProductGalleryProps) {
  const images = rawImages.length > 0 ? rawImages : ["/images/placeholder-product.svg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (dx > 40) setActiveIndex((i) => (i - 1 + images.length) % images.length);
    else if (dx < -40) setActiveIndex((i) => (i + 1) % images.length);
    touchStartX.current = null;
  };

  const lbPrev = () => setLightboxIndex((i) => i === null ? i : (i - 1 + images.length) % images.length);
  const lbNext = () => setLightboxIndex((i) => i === null ? i : (i + 1) % images.length);

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-square w-full max-w-full overflow-hidden rounded-2xl bg-zinc-100 cursor-zoom-in"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setLightboxIndex(activeIndex)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${productName} foto ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1.5 text-sm font-bold text-white transition hover:bg-black/70"
            >{"<"}</button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % images.length); }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 px-2.5 py-1.5 text-sm font-bold text-white transition hover:bg-black/70"
            >{">"}</button>
          </>
        )}
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">
          {activeIndex + 1}/{images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 grid max-w-full grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                index === activeIndex
                  ? "border-orange-400 ring-2 ring-orange-200"
                  : "border-zinc-200 hover:border-zinc-400"
              } bg-zinc-50`}
            >
              <Image
                src={src}
                alt={`${productName} foto ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="flex h-full w-full items-center justify-center overflow-x-hidden px-4 py-6">
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup gambar"
                className="absolute -right-2 -top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-lg transition hover:bg-black/90 sm:-right-3 sm:-top-3"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden sm:h-[78vh]">
                <Image
                  src={images[lightboxIndex]}
                  alt={`${productName} foto ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
                {/* Prev/Next */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Foto sebelumnya"
                      onClick={lbPrev}
                      className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/80"
                    >{"<"}</button>
                    <button
                      type="button"
                      aria-label="Foto berikutnya"
                      onClick={lbNext}
                      className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-lg font-semibold text-white transition hover:bg-black/80"
                    >{">"}</button>
                  </>
                )}
              </div>

              {/* Thumbnail strip in lightbox */}
              {images.length > 1 && (
                <div className="mt-3">
                  <p className="mb-2 text-center text-xs font-medium text-zinc-300">
                    {lightboxIndex + 1}/{images.length}
                  </p>
                  <div className="flex justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition ${
                          index === lightboxIndex ? "border-white" : "border-white/30"
                        } bg-zinc-800`}
                      >
                        <Image src={src} alt={`${productName} ${index + 1}`} fill className="object-contain p-1" sizes="56px" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
