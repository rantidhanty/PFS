"use client";
import { useEffect, useRef, useState, type TouchEvent } from "react";

type ProductGalleryCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  intervalMs?: number;
  priority?: boolean;
  onImageClick?: (src: string, alt: string) => void;
};

export function ProductGalleryCarousel({
  images,
  alt,
  className = "",
  intervalMs = 6000,
  priority = false,
  onImageClick,
}: ProductGalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [activeIndex, images.length, intervalMs, isPaused]);

  if (images.length === 0) {
    return null;
  }

  const goTo = (index: number) => {
    if (index === activeIndex) {
      return;
    }
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  };

  const goPrev = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((activeIndex + 1) % images.length);
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
    const swipeThreshold = 40;

    if (deltaX > swipeThreshold) {
      goPrev();
    } else if (deltaX < -swipeThreshold) {
      goNext();
    }

    touchStartX.current = null;
  };

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100 ${className}`.trim()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((src, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousIndex;

        let stateClass = "opacity-0 z-0";
        if (isActive) {
          stateClass = "opacity-100 z-20";
        } else if (isPrevious) {
          stateClass = "opacity-0 z-10";
        }

        return (
          <img
            key={src}
            src={src}
            alt={`${alt} - ${index + 1}`}
            loading={priority && index === 0 ? "eager" : "lazy"}
            onClick={() => onImageClick?.(src, `${alt} - ${index + 1}`)}
            className={`absolute inset-0 h-full w-full object-cover transform-gpu transition-opacity duration-500 ease-in-out will-change-[opacity] ${stateClass} ${onImageClick ? "cursor-zoom-in" : ""}`}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          />
        );
      })}

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/55 px-2 py-1 text-white"
          >
            {"<"}
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/55 px-2 py-1 text-white"
          >
            {">"}
          </button>
          <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === activeIndex}
                className={`h-2 rounded-full border border-white/70 transition-all duration-300 ease-out ${
                  index === activeIndex
                    ? "w-4 bg-white"
                    : "w-2 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
            <span className="ml-1 text-[9px] font-medium uppercase tracking-wide text-white/85">
              {activeIndex + 1}/{images.length}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
