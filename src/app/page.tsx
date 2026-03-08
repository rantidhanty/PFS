"use client";

import { useState } from "react";
import Image from "next/image";
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

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<{
    images: string[];
    activeIndex: number;
    alt: string;
  } | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<{
    title: string;
    content: ProductDescription;
  } | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 pt-3 pb-8 sm:pt-4 sm:pb-10">
        <section className="mb-4 rounded-3xl border border-zinc-200 bg-white p-5 sm:mb-5 sm:p-6 md:p-6 lg:p-8">
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
        </section>

        <section id="produk" className="mb-5 scroll-mt-24 sm:mb-6">
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_24px_rgba(251,146,60,0.14)]">
            <h2 className="bg-gradient-to-r from-zinc-900 via-orange-700 to-amber-700 bg-clip-text text-center font-[family-name:var(--font-geist-sans)] text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Gallery Produk
            </h2>
          </div>
        </section>

        {Object.entries(groupedProducts).map(([sport, sportProducts]) => (
          <section key={sport} className="mb-8 sm:mb-9 md:mb-10">
            <div className="mb-4 flex items-center justify-between gap-3 sm:gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                {sportLabels[sport as SportCategory]}
              </h2>
              {sport === "basketball" ? (
                <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  3 Tipe Ring Basket
                </div>
              ) : null}
            </div>
            <div className="grid grid-flow-col auto-cols-[84%] gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[62%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {sportProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="snap-start rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
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
                  {sport === "basketball" ? (
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
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        {product.variant ? (
                          <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white">
                            {product.variant}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-zinc-500">
                        {product.standards.join(", ")} - {product.type}
                      </p>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

        <section
          id="standar"
          className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Kualitas Produk</h2>
          <p className="mt-2 max-w-3xl text-zinc-600">
            Produk kami dirancang dengan material besi pilihan dan pengerjaan
            yang rapi untuk kebutuhan fasilitas olahraga yang awet dan siap
            pakai.
          </p>
        </section>

        <section
          id="tentang"
          className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
        >
          <h2 className="text-2xl font-semibold tracking-tight">
            Tentang Kami
          </h2>
          <p className="mt-2 max-w-3xl text-zinc-600">
            Kami fokus pada pengadaan alat olahraga kompetisi dengan opsi custom
            kebutuhan sekolah, klub, venue, dan proyek pemerintah.
          </p>
        </section>

        <section
          id="kontak"
          className="scroll-mt-24 rounded-2xl border border-orange-200 bg-orange-50 p-6"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Kontak & Penawaran
          </h2>
          <p className="mt-2 text-zinc-700">
            Konsultasi spesifikasi dan penawaran harga tersedia via WhatsApp.
          </p>
          <a
            href="https://wa.me/6289673404972"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Hubungi WhatsApp 0896-7340-4972
          </a>
          <p className="mt-3 text-sm text-zinc-700">
            ProFabric Steel siap melayani custom sesuai kebutuhan Anda.
          </p>
        </section>
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

