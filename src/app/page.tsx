"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ProductGalleryCarousel } from "@/components/ui/product-gallery-carousel";
import { ProductImage } from "@/components/ui/product-image";
import { SiteNavbar } from "@/components/layout/site-navbar";
import {
  products,
  sportLabels,
  type ProductDescription,
  type SportCategory,
} from "@/data/products";

const groupedProducts = products.reduce(
  (acc, product) => {
    if (!acc[product.sport]) {
      acc[product.sport] = [];
    }
    acc[product.sport].push(product);
    return acc;
  },
  {} as Record<SportCategory, (typeof products)[number][]>,
);

const sportSummaries: Record<SportCategory, string> = {
  basketball: "Ring basket kompetisi, portable dan tanam.",
  volleyball: "Tiang dan sistem net voli siap pakai.",
  football: "Gawang sepak bola untuk lapangan sekolah dan venue.",
  badminton: "Tiang badminton untuk latihan dan pertandingan.",
  padel: "Tiang padel custom sesuai kebutuhan lapangan.",
  tennis: "Tiang tenis kuat, rapi, dan presisi pemasangan.",
  "official-equipment": "Kursi wasit dan perlengkapan resmi pertandingan.",
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxImage, setLightboxImage] = useState<{
    images: string[];
    activeIndex: number;
    alt: string;
  } | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{
    title: string;
    content: ProductDescription;
  } | null>(null);
  const [openSport, setOpenSport] = useState<SportCategory>("basketball");
  const activeProducts = groupedProducts[openSport] ?? [];
  const revealUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 56, scale: 0.97 },
    show: { opacity: 1, y: 0 },
  };
  const revealLeft = {
    hidden: prefersReducedMotion
      ? { opacity: 1, x: 0, scale: 1 }
      : { opacity: 0, x: -72, scale: 0.97 },
    show: { opacity: 1, x: 0 },
  };
  const revealRight = {
    hidden: prefersReducedMotion
      ? { opacity: 1, x: 0, scale: 1 }
      : { opacity: 0, x: 72, scale: 0.97 },
    show: { opacity: 1, x: 0 },
  };
  const staggerWrap = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
      },
    },
  };
  const cardReveal = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 26, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  useEffect(() => {
    const scrollers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-auto-scroll="true"]'),
    );

    const pause = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.dataset.paused = "true";
    };

    const resume = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      target.dataset.paused = "false";
    };

    scrollers.forEach((scroller) => {
      scroller.dataset.paused = "false";
      scroller.addEventListener("mouseenter", pause);
      scroller.addEventListener("mouseleave", resume);
      scroller.addEventListener("touchstart", pause, { passive: true });
      scroller.addEventListener("touchend", resume);
      scroller.addEventListener("pointerdown", pause);
      scroller.addEventListener("pointerup", resume);
      scroller.addEventListener("focusin", pause);
      scroller.addEventListener("focusout", resume);
    });

    let rafId = 0;
    let lastTs = 0;
    const speedPxPerSecond = 24;
    const carryMap = new WeakMap<HTMLElement, number>();

    const tick = (ts: number) => {
      if (!lastTs) {
        lastTs = ts;
      }
      const delta = ts - lastTs;
      lastTs = ts;

      scrollers.forEach((scroller) => {
        if (scroller.dataset.paused === "true") {
          return;
        }
        if (scroller.scrollWidth <= scroller.clientWidth + 8) {
          return;
        }

        const direction = scroller.dataset.scrollDirection === "left" ? -1 : 1;
        const maxLeft = scroller.scrollWidth - scroller.clientWidth;
        const previousCarry = carryMap.get(scroller) ?? 0;
        const rawMove = (speedPxPerSecond * delta) / 1000 + previousCarry;
        const move = Math.floor(rawMove);
        carryMap.set(scroller, rawMove - move);

        if (move <= 0) {
          return;
        }

        const nextLeft = scroller.scrollLeft + move * direction;

        if (direction > 0) {
          if (nextLeft >= maxLeft - 1) {
            scroller.scrollLeft = 0;
          } else {
            scroller.scrollLeft = nextLeft;
          }
        } else {
          if (nextLeft <= 1) {
            scroller.scrollLeft = maxLeft;
          } else {
            scroller.scrollLeft = nextLeft;
          }
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      scrollers.forEach((scroller) => {
        scroller.removeEventListener("mouseenter", pause);
        scroller.removeEventListener("mouseleave", resume);
        scroller.removeEventListener("touchstart", pause);
        scroller.removeEventListener("touchend", resume);
        scroller.removeEventListener("pointerdown", pause);
        scroller.removeEventListener("pointerup", resume);
        scroller.removeEventListener("focusin", pause);
        scroller.removeEventListener("focusout", resume);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 pt-3 pb-8 sm:pt-4 sm:pb-10">
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
                  alt="Poster ProFabric Steel"
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
              <a
                href="https://wa.me/6289673404972"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(234,88,12,0.35)] transition hover:from-orange-600 hover:to-orange-700"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="produk"
          className="mb-5 scroll-mt-24 sm:mb-6"
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_24px_rgba(251,146,60,0.14)]">
            <h2 className="bg-gradient-to-r from-zinc-900 via-orange-700 to-amber-700 bg-clip-text text-center font-[family-name:var(--font-geist-sans)] text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Gallery Produk
            </h2>
          </div>
        </motion.section>

        <motion.section
          className="mb-8 sm:mb-9 md:mb-10"
          variants={revealLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div
            data-auto-scroll="true"
            className="grid grid-flow-col auto-cols-[64%] gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[42%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-3 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {Object.entries(groupedProducts).map(([sport, sportProducts]) => (
              <button
                key={sport}
                type="button"
                onClick={() => setOpenSport(sport as SportCategory)}
                className={`rounded-2xl border p-3 text-left transition ${
                  openSport === (sport as SportCategory)
                    ? "border-orange-300 bg-orange-50 shadow-sm"
                    : "border-zinc-200 bg-white hover:border-zinc-300"
                }`}
              >
                <h2 className="text-base font-semibold tracking-tight sm:text-lg">
                  {sportLabels[sport as SportCategory]}
                </h2>
                <p className="mt-1 text-justify text-xs leading-snug text-zinc-600 sm:text-sm">
                  {sportSummaries[sport as SportCategory]}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {sportProducts.length} produk
                </p>
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between md:hidden">
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
              Geser kategori
            </p>
            <div className="flex items-center gap-1.5">
              {Object.keys(groupedProducts).map((sport) => (
                <span
                  key={`dot-${sport}`}
                  className={`h-1.5 rounded-full transition-all ${
                    openSport === (sport as SportCategory)
                      ? "w-4 bg-orange-500"
                      : "w-1.5 bg-zinc-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {sportLabels[openSport]}
              </h3>
              {openSport === "basketball" ? (
                <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  3 Tipe Ring Basket
                </div>
              ) : null}
            </div>

            <motion.div
              data-auto-scroll="true"
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              className="grid grid-flow-col auto-cols-[92%] gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[72%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
            >
              {activeProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  variants={cardReveal}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="snap-start rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
                >
                  {product.slug === "ring-basket-fiba-portable" ||
                  product.slug === "ring-basket-fiba-tanam-dinding" ||
                  product.slug === "ring-basket-fiba-tanam-tanah" ? (
                    <ProductGalleryCarousel
                      images={product.images.gallery}
                      alt={product.name}
                      className="!aspect-[4/4.1] md:!aspect-[4/4.6]"
                      priority={index === 0}
                      intervalMs={5000}
                      onImageClick={(src, alt) =>
                        setLightboxImage({
                          images: product.images.gallery,
                          activeIndex: Math.max(
                            product.images.gallery.indexOf(src),
                            0,
                          ),
                          alt,
                        })
                      }
                    />
                  ) : (
                    <ProductImage
                      src={product.images.thumb}
                      alt={product.name}
                      priority={index === 0}
                      onImageClick={(src, alt) =>
                        setLightboxImage({
                          images: [src],
                          activeIndex: 0,
                          alt,
                        })
                      }
                    />
                  )}

                  {openSport === "basketball" ? (
                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="line-clamp-1 text-base font-semibold">
                          {product.name.replace("Ring Basket FIBA ", "Ring Basket ")}
                        </h3>
                        {product.variant ? (
                          <span className="whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                            {product.variant}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!product.description) {
                              return;
                            }
                            setSelectedDescription({
                              title: product.name.replace("FIBA ", ""),
                              content: product.description,
                            });
                          }}
                          className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
                        >
                          Deskripsi Produk
                        </button>
                        <a
                          href="https://wa.me/6289673404972"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-600"
                        >
                          Chat WA
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <h3 className="text-base font-semibold">{product.name}</h3>
                        {product.variant ? (
                          <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white">
                            {product.variant}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                        {product.standards.join(", ")} - {product.type}
                      </p>
                    </>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="project"
          className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
          variants={revealRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-zinc-50 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
              Project Unggulan
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              Dipercaya Menangani Proyek Instansi & Komersial
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base md:text-justify">
              Portofolio ini menunjukkan pengalaman nyata ProFabric Steel dalam
              pengerjaan fasilitas berbahan besi dengan hasil presisi, rapi,
              dan tepat guna di berbagai sektor.
            </p>
          </div>

          <motion.div
            data-auto-scroll="true"
            data-scroll-direction="right"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {[
              { name: "SDN Cilincing", tag: "Pendidikan" },
              { name: "SMA Wardaya", tag: "Pendidikan" },
              { name: "AEON Bekasi", tag: "Komersial" },
              { name: "Bank BRI", tag: "Perbankan" },
            ].map((project) => (
              <motion.div
                key={project.name}
                variants={cardReveal}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 shadow-sm"
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                    project.tag === "Pendidikan"
                      ? "bg-sky-100 text-sky-800"
                      : project.tag === "Komersial"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {project.tag}
                </span>
                <span>{project.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="tentang"
          className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
          variants={revealLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Tentang{" "}
            <span className="font-extrabold text-sky-900 underline decoration-orange-400 decoration-2 underline-offset-4">
              PFS
            </span>
          </h2>
          <p className="mt-2 text-justify text-zinc-700">
            ProFabric Steel adalah{" "}
            <span className="rounded-md bg-sky-100 px-1.5 py-0.5 font-extrabold text-sky-900">
              spesialis fabrikasi besi
            </span>{" "}
            profesional dan penjualan{" "}
            <span className="rounded-md bg-rose-100 px-1.5 py-0.5 font-extrabold text-rose-900">
              alat-alat olahraga
            </span>{" "}
            yang dipercaya berbagai instansi.
            Kami menghadirkan solusi lengkap untuk kebutuhan rumah berbahan
            besi seperti{" "}
            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 font-extrabold text-amber-900">
              tralis
            </span>
            ,{" "}
            <span className="rounded-md bg-lime-100 px-1.5 py-0.5 font-extrabold text-lime-900">
              railing
            </span>
            ,{" "}
            <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 font-extrabold text-indigo-900">
              grill
            </span>
            , serta{" "}
            <span className="rounded-md bg-teal-100 px-1.5 py-0.5 font-extrabold text-teal-900">
              jasa perbaikan
            </span>{" "}
            dengan standar fabrikasi industri{" "}
            <span className="rounded-md bg-cyan-100 px-1.5 py-0.5 font-extrabold text-cyan-900">
              rapi, kuat, dan presisi
            </span>
            .
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
                Sejarah Singkat
              </h3>
              <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-600">
                Berawal dari workshop lokal, ProFabric Steel tumbuh menjadi
                mitra andalan berbagai proyek karena konsisten menjaga kualitas
                hasil dan ketepatan pengerjaan.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
                Tim Profesional
              </h3>
              <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-600">
                Seluruh pekerjaan ditangani tenaga ahli profesional dengan
                pengalaman lebih dari 15 tahun di bidang besi dan konstruksi
                fabrikasi.
              </p>
            </div>
          </div>

          <motion.div
            data-auto-scroll="true"
            data-scroll-direction="right"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-4 grid grid-flow-col auto-cols-[78%] gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[46%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-3 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {[
              "Spesialis besi & fabrikasi profesional",
              "Penjualan alat olahraga unggulan",
              "Harga bersaing karena dikelola langsung",
              "Kualitas premium dengan material terpilih",
            ].map((point) => (
              <motion.div
                key={point}
                variants={cardReveal}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="snap-start rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-zinc-800"
              >
                {point}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="kontak"
          className="scroll-mt-24 rounded-2xl border border-orange-200 bg-orange-50 p-6"
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Kontak & Penawaran
          </h2>
          <p className="mt-2 text-zinc-700">
            Konsultasi spesifikasi dan penawaran harga tersedia via WhatsApp.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Maps Kantor
              </div>
              <iframe
                title="Google Maps Kantor ProFabric Steel"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.25086886259!2d107.1709019592964!3d-6.19733893595498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698698688ca731%3A0x270147ffbc5c8b6c!2sJl.%20Mawar%20Raya%20No.1%2C%20Sukamanah%2C%20Kec.%20Sukatani%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat%2017630!5e0!3m2!1sid!2sid!4v1772932288139!5m2!1sid!2sid"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                Maps Workshop
              </div>
              <iframe
                title="Google Maps Workshop ProFabric Steel"
                src="https://www.google.com/maps/embed?pb=!4v1772932616945!6m8!1m7!1spIRVJXCEQ_AOmkNqCDVzqw!2m2!1d-6.205555313060802!2d107.1370350406779!3f45.777108114716874!4f-25.843992639573017!5f0.7820865974627469"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <a
            href="https://wa.me/6289673404972"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Admin PFS
          </a>
          <p className="mt-3 text-sm text-zinc-700">
            ProFabric Steel siap melayani custom sesuai kebutuhan Anda.
          </p>
        </motion.section>
      </main>

      {lightboxImage ? (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div className="mx-auto flex min-h-full w-full max-w-4xl items-center justify-center">
            <div
              className="relative w-full overflow-visible rounded-2xl bg-transparent p-2 sm:p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Tutup gambar"
                className="absolute right-2 top-2 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/65 text-xl font-bold leading-none text-white shadow-lg transition hover:bg-black/80 sm:right-3 sm:top-3 sm:h-11 sm:w-11"
              >
                X
              </button>
              <div className="relative h-[62vh] w-full rounded-xl sm:h-[76vh]">
                <Image
                  src={lightboxImage.images[lightboxImage.activeIndex]}
                  alt={`${lightboxImage.alt} ${lightboxImage.activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
                {lightboxImage.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Gambar sebelumnya"
                      onClick={() =>
                        setLightboxImage((prev) =>
                          prev
                            ? {
                                ...prev,
                                activeIndex:
                                  (prev.activeIndex - 1 + prev.images.length) %
                                  prev.images.length,
                              }
                            : prev,
                        )
                      }
                      className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-lg font-semibold text-white"
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      aria-label="Gambar berikutnya"
                      onClick={() =>
                        setLightboxImage((prev) =>
                          prev
                            ? {
                                ...prev,
                                activeIndex:
                                  (prev.activeIndex + 1) % prev.images.length,
                              }
                            : prev,
                        )
                      }
                      className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 px-3 py-1.5 text-lg font-semibold text-white"
                    >
                      {">"}
                    </button>
                  </>
                ) : null}
              </div>
              {lightboxImage.images.length > 1 ? (
                <div className="mt-3">
                  <div className="mb-2 text-center text-xs font-medium text-zinc-200">
                    {lightboxImage.activeIndex + 1}/{lightboxImage.images.length}
                  </div>
                  <div className="flex justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {lightboxImage.images.map((thumbSrc, thumbIndex) => (
                      <button
                        key={`${thumbSrc}-${thumbIndex}`}
                        type="button"
                        onClick={() =>
                          setLightboxImage((prev) =>
                            prev ? { ...prev, activeIndex: thumbIndex } : prev,
                          )
                        }
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border ${
                          thumbIndex === lightboxImage.activeIndex
                            ? "border-orange-400 ring-2 ring-orange-400/50"
                            : "border-white/35"
                        }`}
                        aria-label={`Lihat gambar ${thumbIndex + 1}`}
                      >
                        <Image
                          src={thumbSrc}
                          alt={`${lightboxImage.alt} thumbnail ${thumbIndex + 1}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {selectedDescription ? (
        <div
          className="fixed inset-0 z-[85] bg-black/70 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedDescription(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-center">
            <div
              className="relative w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-orange-200 bg-white p-4 sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedDescription(null)}
                className="sticky top-0 float-right rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
              >
                Tutup
              </button>
              <h3 className="mb-3 text-lg font-bold text-zinc-900 sm:text-xl">
                Deskripsi {selectedDescription.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 sm:text-base">
                {selectedDescription.content.intro}
              </p>
              <p className="mt-3 text-sm font-semibold text-zinc-800 sm:text-base">
                Detailnya:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-700 sm:text-base">
                {selectedDescription.content.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {selectedDescription.content.notes.map((note) => (
                <p
                  key={note}
                  className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base"
                >
                  {note}
                </p>
              ))}
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800 sm:text-base">
                {selectedDescription.content.closing}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

