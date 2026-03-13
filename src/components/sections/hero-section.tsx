"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const revealUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 56, scale: 0.97 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="mb-4 rounded-3xl border border-zinc-200 bg-white p-5 sm:mb-5 sm:p-6 md:p-6 lg:p-8"
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="grid items-start gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4">
          <div className="mx-auto flex w-full max-w-full items-center justify-center">
            <Image
              src="/images/posters/poster%20PFS.jpg"
              alt="Poster ProFabric Steel - Spesialis Fabrikasi Besi dan Peralatan Olahraga Bekasi"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 420px"
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
        <div className="mt-0">
          <p className="inline-flex rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-700">
            Spesialis Besi
          </p>
          <h1 className="mt-2 bg-gradient-to-r from-zinc-900 via-zinc-700 to-orange-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            ProFabric Steel
          </h1>
          <div className="mt-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-zinc-800">
            <p className="text-justify text-base font-semibold leading-relaxed">
              Solusi jasa las dan fabrikasi untuk kebutuhan personal hingga
              proyek.
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-600">
              Melayani untuk
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <span className="rounded-md border border-sky-300 bg-gradient-to-b from-sky-100 to-sky-300 px-2 py-1.5 text-center text-[11px] font-extrabold leading-tight text-sky-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_8px_rgba(3,105,161,0.28)] sm:px-2.5 sm:py-1 sm:text-sm">
                kebutuhan rumah
              </span>
              <span className="rounded-md border border-amber-300 bg-gradient-to-b from-amber-100 to-amber-300 px-2 py-1.5 text-center text-[11px] font-extrabold leading-tight text-amber-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_8px_rgba(180,83,9,0.28)] sm:px-2.5 sm:py-1 sm:text-sm">
                proyek konstruksi
              </span>
              <span className="rounded-md border border-emerald-300 bg-gradient-to-b from-emerald-100 to-emerald-300 px-2 py-1.5 text-center text-[11px] font-extrabold leading-tight text-emerald-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_8px_rgba(6,95,70,0.28)] sm:px-2.5 sm:py-1 sm:text-sm">
                fasilitas olahraga
              </span>
            </div>
            <p className="mt-2 text-base font-medium leading-relaxed text-zinc-700">
              Dengan hasil kuat, presisi, dan rapi.
            </p>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-orange-600 sm:text-base">
              Hubungi kami dan checkout
            </p>
            <div className="flex flex-wrap items-stretch gap-3">
              <a
                href="https://wa.me/6289673404972"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami via WhatsApp"
                className="group inline-flex flex-col items-center justify-center gap-1 transition hover:-translate-y-0.5"
              >
                <Image
                  src="/images/logo/logo wa.png"
                  alt="Logo WhatsApp"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition group-hover:text-emerald-700">
                  Klik untuk chat WA
                </span>
              </a>
              <a
                href="https://tk.tokopedia.com/ZSuBFb7UA/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjungi toko di Tokopedia TikTok Shop"
                className="group inline-flex flex-col items-center justify-center gap-1 transition hover:-translate-y-0.5"
              >
                <Image
                  src="/images/logo/logo tiktokshop.png"
                  alt="Logo Tokopedia TikTok Shop"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition group-hover:text-orange-700">
                  Klik untuk checkout
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
