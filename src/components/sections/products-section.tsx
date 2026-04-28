"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProductGalleryCarousel } from "@/components/ui/product-gallery-carousel";
import { ProductImage } from "@/components/ui/product-image";
import {
  products,
  type ProductDescription,
  type SportCategory,
} from "@/data/products";
import { ProductPriceDisplay } from "@/components/ui/product-price";
import { waUrl } from "@/lib/wa";

const WA_URL = waUrl("Halo admin PFS, saya mau konsultasi project");

type TabKey =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "referee-chair";

const TAB_ORDER: TabKey[] = [
  "basketball",
  "volleyball",
  "football",
  "badminton",
  "padel",
  "tennis",
  "referee-chair",
];

const tabLabels: Record<TabKey, string> = {
  basketball: "Basketball",
  volleyball: "Volleyball",
  football: "Sepak Bola",
  badminton: "Badminton",
  padel: "Padel",
  tennis: "Tenis",
  "referee-chair": "Kursi Wasit",
};

const tabSummaries: Record<TabKey, string> = {
  basketball: "Ring basket kompetisi, portable dan tanam.",
  volleyball: "Tiang dan sistem net voli siap pakai.",
  football: "Gawang sepak bola untuk lapangan sekolah dan venue.",
  badminton: "Tiang badminton untuk latihan dan pertandingan.",
  padel: "Tiang padel custom sesuai kebutuhan lapangan.",
  tennis: "Tiang tenis kuat, rapi, dan presisi pemasangan.",
  "referee-chair": "Kursi wasit badminton, voli, dan tenis.",
};

const groupedByTab = TAB_ORDER.reduce(
  (acc, key) => {
    acc[key] =
      key === "referee-chair"
        ? products.filter((p) => (p.sport as string).startsWith("referee-chair-"))
        : products.filter((p) => p.sport === (key as SportCategory));
    return acc;
  },
  {} as Record<TabKey, (typeof products)[number][]>,
);

const activeTabs = TAB_ORDER.filter((key) => groupedByTab[key].length > 0);

export function ProductsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openSport, setOpenSport] = useState<TabKey>("basketball");
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
        viewport={{ once: true, amount: 0.4 }}
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
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Kategori tabs */}
        <div
          data-auto-scroll="true"
          className="grid grid-flow-col auto-cols-[64%] gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[42%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-3 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {activeTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setOpenSport(tab)}
              className={`rounded-2xl border p-3 text-left transition ${
                openSport === tab
                  ? "border-orange-300 bg-orange-50 shadow-sm"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">
                {tabLabels[tab]}
              </h2>
              <p className="mt-1 text-justify text-xs leading-snug text-zinc-600 sm:text-sm">
                {tabSummaries[tab]}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                {groupedByTab[tab].length} produk
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
            {activeTabs.map((tab) => (
              <span
                key={`dot-${tab}`}
                className={`h-1.5 rounded-full transition-all ${
                  openSport === tab
                    ? "w-4 bg-orange-500"
                    : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Panel produk per kategori — SEMUA dirender di HTML, hanya aktif yang tampil */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          {activeTabs.map((tab) => {
            const tabProducts = groupedByTab[tab];
            const isActive = openSport === tab;

            return (
              <div key={tab} className={isActive ? "block" : "hidden"}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {tabLabels[tab]}
                  </h3>
                  <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                    {tabProducts.length} Produk
                  </div>
                </div>

                <motion.div
                  key={`products-${tab}`}
                  data-auto-scroll="true"
                  variants={staggerWrap}
                  initial="hidden"
                  animate={openSport === tab ? "show" : "hidden"}
                  className="grid grid-flow-col auto-cols-[92%] gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[72%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
                >
                  {tabProducts.map((product, index) => (
                    <motion.article
                      key={`${tab}-${product.id}`}
                      variants={cardReveal}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="snap-start rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
                    >
                      {product.images.gallery.length > 1 ? (
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
                        {product.price ? (
                          <div className="mt-1.5">
                            <ProductPriceDisplay price={product.price} size="md" />
                          </div>
                        ) : null}
                        <div className="mt-3 flex items-center gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                          >
                            Lihat Detail
                          </Link>
                          {product.description ? (
                            <button
                              type="button"
                              onClick={() => {
                                const description = product.description;
                                if (!description) return;
                                setSelectedDescription({
                                  title:
                                    product.slug === "ring-basket-fiba-tanam-dinding"
                                      ? "Ring Basket Dinding standar FIBA"
                                      : product.name.replace("FIBA ", ""),
                                  content: description,
                                });
                              }}
                              className="inline-flex rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-400 focus-visible:outline-none"
                            >
                              Deskripsi
                            </button>
                          ) : null}
                          <a
                            href={WA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Konsultasi via WhatsApp"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] shadow-sm transition hover:scale-110 hover:shadow-[0_2px_10px_rgba(37,211,102,0.45)]"
                          >
                            <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                          </a>
                        </div>
                      </div>
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
