"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { stats, testimonials, clientBadges } from "@/data/testimonials";
import { CountUp } from "@/components/ui/count-up";

function ClientMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const s = useRef({ offset: 0, dragging: false, paused: false, startX: 0, startOffset: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 35;
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
    s.current.offset = s.current.startOffset + (e.touches[0].clientX - s.current.startX);
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
        className="flex gap-2 will-change-transform"
        style={{ width: "max-content" }}
      >
        {[...clientBadges, ...clientBadges].map((client, i) => (
          <span
            key={`${client.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700"
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor[client.tag]}`} />
            {client.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const tagColor: Record<string, string> = {
  Pendidikan: "bg-sky-100 text-sky-800 border-sky-200",
  Komersial: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Perbankan: "bg-amber-100 text-amber-800 border-amber-200",
};

const dotColor: Record<string, string> = {
  Pendidikan: "bg-sky-500",
  Komersial: "bg-emerald-500",
  Perbankan: "bg-amber-500",
};

const INTERVAL = 5000; // ms per slide

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > active ? 1 : -1));
      setActive(index);
    },
    [active],
  );

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length, -1);
  }, [active, goTo]);

  // Auto-rotate
  useEffect(() => {
    const schedule = () => {
      timerRef.current = setTimeout(() => {
        if (!pausedRef.current) next();
        schedule();
      }, INTERVAL);
    };
    schedule();
    return () => clearTimeout(timerRef.current);
  }, [next]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const staggerWrap = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
  };

  const cardReveal = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  const slideVariants = {
    enter: (d: number) => ({
      x: prefersReducedMotion ? 0 : d * 40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: prefersReducedMotion ? 0 : d * -40,
      opacity: 0,
    }),
  };

  const t = testimonials[active];

  return (
    <section id="testimoni" className="mb-8 scroll-mt-24 sm:mb-9">
      {/* Statistik */}
      <motion.div
        variants={staggerWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardReveal}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center shadow-sm"
          >
            <p className="text-4xl font-extrabold tracking-tight text-orange-500">
              {prefersReducedMotion ? (
                `${stat.numericValue}${stat.suffix}`
              ) : (
                <CountUp target={stat.numericValue} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{stat.label}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">
              {stat.sublabel}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimoni */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
              Testimoni Klien
            </p>
            <h2 className="mt-0.5 text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
              Dipercaya berbagai institusi
            </h2>
          </div>
          {/* Prev / Next */}
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => { pause(); prev(); setTimeout(resume, 3000); }}
              aria-label="Testimoni sebelumnya"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => { pause(); next(); setTimeout(resume, 3000); }}
              aria-label="Testimoni berikutnya"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Kartu aktif */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(resume, 2000)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={t.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 sm:p-6"
            >
              {/* Bintang */}
              <div className="flex gap-0.5" aria-label="Rating 5 dari 5 bintang">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="#f97316" aria-hidden="true" className="h-4 w-4">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Kutipan */}
              <p className="mt-4 text-base leading-relaxed text-zinc-700 sm:text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Produk tag */}
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-orange-600">
                {t.product}
              </p>

              {/* Author */}
              <footer className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-200 pt-3">
                <div>
                  <p className="text-sm font-bold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.institution}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${tagColor[t.tag]}`}>
                  {t.tag}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dot indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { pause(); goTo(i); setTimeout(resume, 3000); }}
              aria-label={`Testimoni ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-orange-500"
                  : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        {/* Daftar klien */}
        <div className="mt-5 border-t border-zinc-100 pt-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Klien yang telah kami layani
          </p>
          <ClientMarquee />
        </div>
      </motion.div>
    </section>
  );
}
