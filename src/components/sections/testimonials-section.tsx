"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats, testimonials, clientBadges } from "@/data/testimonials";
import { CountUp } from "@/components/ui/count-up";

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

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  const revealUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const staggerWrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  };

  const cardReveal = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="testimoni" className="mb-8 scroll-mt-24 sm:mb-9">
      {/* Statistik */}
      <motion.div
        variants={staggerWrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
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
                // Jika user prefer reduced motion, tampilkan statis
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
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
      >
        {/* Header */}
        <div className="mb-5 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-zinc-50 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
            Testimoni Klien
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Dipercaya berbagai institusi
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600">
            Dari sekolah, venue komersial, hingga perbankan.
          </p>
        </div>

        {/* Kartu testimoni */}
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.id}
              variants={cardReveal}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col rounded-2xl border border-zinc-100 bg-zinc-50 p-4"
            >
              {/* Bintang */}
              <div
                className="flex gap-0.5"
                aria-label="Rating 5 dari 5 bintang"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    fill="#f97316"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Kutipan */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-700">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Produk tag */}
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-orange-600">
                {t.product}
              </p>

              {/* Author */}
              <footer className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-200 pt-3">
                <div>
                  <p className="text-sm font-bold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.institution}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ${tagColor[t.tag]}`}
                >
                  {t.tag}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>

        {/* Daftar klien */}
        <div className="mt-5 border-t border-zinc-100 pt-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Klien yang telah kami layani
          </p>
          <div className="flex flex-wrap gap-2">
            {clientBadges.map((client) => (
              <span
                key={client.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700"
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor[client.tag]}`}
                />
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
