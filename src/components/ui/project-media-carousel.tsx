"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";

type ProjectMediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

type ProjectMediaCarouselProps = {
  items: ProjectMediaItem[];
};

export function ProjectMediaCarousel({
  items,
}: ProjectMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex];

  const goPrev = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;

    if (deltaX > 40) {
      goPrev();
    } else if (deltaX < -40) {
      goNext();
    }

    touchStartX.current = null;
  };

  return (
    <div className="grid gap-3">
      <div
        className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative aspect-[16/10] w-full">
          {activeItem.type === "image" ? (
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              className="object-cover"
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              src={activeItem.src}
              poster={activeItem.poster}
              controls
              playsInline
            />
          )}
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Media sebelumnya"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-sm font-semibold text-white"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Media berikutnya"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-sm font-semibold text-white"
            >
              {">"}
            </button>
          </>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {items.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Tampilkan media ${index + 1}`}
                aria-current={index === activeIndex}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-orange-500"
                    : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {activeIndex + 1}/{items.length}{" "}
            {activeItem.type === "video" ? "video" : "foto"}
          </p>
        </div>
      ) : null}

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <button
            key={`thumb-${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-2xl border transition ${
              index === activeIndex
                ? "border-orange-400 ring-2 ring-orange-200"
                : "border-zinc-200"
            } shrink-0 snap-start w-[140px] sm:w-auto`}
          >
            <div className="relative aspect-[4/3] bg-zinc-100">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <Image
                    src={item.poster ?? "/images/logo/logo pfs.jpg"}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-lg font-black text-white">
                    PLAY
                  </span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
