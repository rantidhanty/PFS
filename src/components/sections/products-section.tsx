"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ProductGalleryCarousel } from "@/components/ui/product-gallery-carousel";
import { ProductImage } from "@/components/ui/product-image";
import {
  products,
  sportLabels,
  type ProductDescription,
  type SportCategory,
} from "@/data/products";

const groupedProducts = products.reduce(
  (acc, product) => {
    if (!acc[product.sport]) acc[product.sport] = [];
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

const detailedSports: SportCategory[] = [
  "basketball",
  "volleyball",
  "football",
  "badminton",
  "padel",
  "tennis",
  "official-equipment",
];

export function ProductsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openSport, setOpenSport] = useState<SportCategory>("basketball");
  const [lightboxImage, setLightboxImage] = useState<{
    images: string[];
    activeIndex: number;
    alt: string;
  } | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{
    title: string;
    content: ProductDescription;
  } | null>(null);

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

  const staggerWrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.14 },
    },
  };

  const cardReveal = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 26, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {/* Heading Gallery Produk */}
      <motion.section
        id="produk"
        className="mb-2 scroll-mt-24 sm:mb-3"
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
          <p className="mt-2 text-center text-sm font-medium text-zinc-600 sm:text-base">
            Pilih kategori untuk melihat produk
          </p>
        </div>
      </motion.section>

      {/* Tabs Kategori + Semua Produk */}
      <motion.section
        className="mb-8 sm:mb-9 md:mb-10"
        variants={revealLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Kategori tabs */}
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

        {/* Dot indicator mobile */}
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

        {/* Panel produk per kategori — SEMUA dirender di HTML, hanya aktif yang tampil */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          {Object.entries(groupedProducts).map(([sport, sportProducts]) => {
            const isActive = openSport === (sport as SportCategory);
            const isDetailed = detailedSports.includes(sport as SportCategory);

            return (
              <div key={sport} className={isActive ? "block" : "hidden"}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {sportLabels[sport as SportCategory]}
                  </h3>
                  {isDetailed ? (
                    <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                      {sportProducts.length} Produk{" "}
                      {sportLabels[sport as SportCategory]}
                    </div>
                  ) : null}
                </div>

                <motion.div
                  key={`products-${sport}`}
                  data-auto-scroll="true"
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.15 }}
                  className="grid grid-flow-col auto-cols-[92%] gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[72%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
                >
                  {sportProducts.map((product, index) => (
                    <motion.article
                      key={`${sport}-${product.id}`}
                      variants={cardReveal}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="snap-start rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
                    >
                      {((product.sport === "basketball" ||
                        product.sport === "volleyball" ||
                        product.sport === "football" ||
                        product.sport === "padel") &&
                        product.images.gallery.length > 1) ? (
                        <ProductGalleryCarousel
                          images={product.images.gallery}
                          alt={product.name}
                          className="!aspect-[4/4.1] md:!aspect-[4/4.6]"
                          priority={index === 0}
                          intervalMs={4000}
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

                      {isDetailed ? (
                        <div className="mt-3">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="line-clamp-1 text-base font-semibold">
                              {sport === "basketball"
                                ? product.name.replace(
                                    "Ring Basket FIBA ",
                                    "Ring Basket ",
                                  )
                                : product.name}
                            </h3>
                            {product.variant ? (
                              <span className="whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                                {product.variant}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            {product.description ? (
                              <button
                                type="button"
                                onClick={() => {
                                  const description = product.description;
                                  if (!description) return;
                                  setSelectedDescription({
                                    title:
                                      product.slug ===
                                      "ring-basket-fiba-tanam-dinding"
                                        ? "Ring Basket Dinding standar FIBA"
                                        : product.name.replace("FIBA ", ""),
                                    content: description,
                                  });
                                }}
                                className="inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                              >
                                Lihat Deskripsi Produk
                              </button>
                            ) : null}
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
                            <h3 className="text-base font-semibold">
                              {product.name}
                            </h3>
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
            );
          })}
        </div>
      </motion.section>

      {/* Lightbox Modal */}
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
                                  (prev.activeIndex -
                                    1 +
                                    prev.images.length) %
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
                            prev
                              ? { ...prev, activeIndex: thumbIndex }
                              : prev,
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

      {/* Description Modal */}
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
              <p className="mt-4 text-sm font-semibold text-zinc-800 sm:text-base">
                Material
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-zinc-700 sm:text-base">
                {selectedDescription.content.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          d="M5 10.5L8.2 13.5L15 6.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800 sm:text-base">
                {selectedDescription.content.closing}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
