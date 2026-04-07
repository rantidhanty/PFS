import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { WaButton } from "@/components/ui/wa-button";
import { ProductGallery } from "@/components/ui/product-gallery";
import { ProductRelated } from "@/components/ui/product-related";
import { StandardBadge } from "@/components/ui/standard-badge";
import { products, sportLabels, formatRupiah, getDiscountedPrice } from "@/data/products";
import { siteConfig } from "@/config/site";
import { waUrl } from "@/lib/wa";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  const stdStr = product.standards.join("/");
  const intro =
    product.description?.intro ??
    `${product.name} standar ${stdStr} oleh ProFabric Steel`;
  const description = `${intro} Standar ${stdStr}, jual di Bekasi. Pengiriman seluruh Indonesia.`;
  const title = `${product.name} — ${stdStr}`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | ProFabric Steel`,
      description,
      images: [
        {
          url: product.images.thumb,
          alt: `${product.name} standar ${stdStr} - ProFabric Steel`,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const productWaUrl = waUrl(
    `Halo admin PFS, saya mau konsultasi tentang ${product.name}`,
  );

  const isRefereeChair = (sport: string) => sport.startsWith("referee-chair-");

  // Section 1: produk dari sport yang sama (semua kursi wasit dikelompokkan)
  const sameCategory = isRefereeChair(product.sport)
    ? products.filter((p) => isRefereeChair(p.sport) && p.slug !== product.slug)
    : products.filter((p) => p.sport === product.sport && p.slug !== product.slug);

  const sameCategoryLabel = isRefereeChair(product.sport)
    ? "Kursi Wasit"
    : sportLabels[product.sport];

  // Section 2: 1 produk representatif dari tiap sport lain
  const crossCategory = products
    .filter((p) => isRefereeChair(product.sport) ? !isRefereeChair(p.sport) : p.sport !== product.sport)
    .reduce<typeof products>((acc, p) => {
      const key = isRefereeChair(p.sport) ? "referee-chair" : p.sport;
      if (!acc.find((x) => (isRefereeChair(x.sport) ? "referee-chair" : x.sport) === key)) acc.push(p);
      return acc;
    }, [])
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description?.intro ??
      `${product.name} standar ${product.standards.join("/")} oleh ProFabric Steel.`,
    image: product.images.gallery.map((img) => `${siteConfig.url}${img}`),
    brand: { "@type": "Brand", name: "ProFabric Steel" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IDR",
      seller: { "@type": "Organization", name: "ProFabric Steel" },
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };

  // FAQ Schema — meningkatkan CTR di Google dengan expanded FAQ di hasil pencarian
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Apakah ${product.name} sudah memenuhi standar ${product.standards.join("/")}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ya, ${product.name} dirancang dan diproduksi sesuai standar ${product.standards.join("/")} yang berlaku secara internasional, cocok untuk kebutuhan sekolah, klub, hingga venue kompetisi.`,
        },
      },
      {
        "@type": "Question",
        name: `Apakah ${product.name} bisa dikirim ke luar Bekasi?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ya, kami melayani pengiriman ke seluruh wilayah Indonesia. Estimasi pengiriman 2–7 hari kerja tergantung lokasi. Hubungi admin ProFabric Steel via WhatsApp untuk info ongkir dan jadwal pengiriman.`,
        },
      },
      {
        "@type": "Question",
        name: `Apakah ukuran ${product.name} bisa dikustom?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ya, kami menerima custom ukuran sesuai kebutuhan venue atau lapangan Anda. Tim fabrikasi kami siap menyesuaikan spesifikasi teknis. Konsultasikan kebutuhan Anda via WhatsApp untuk penawaran custom.`,
        },
      },
      {
        "@type": "Question",
        name: `Bagaimana cara memesan ${product.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Cukup hubungi admin PFS via WhatsApp. Tim kami akan membantu proses konsultasi, kalkulasi biaya, hingga pengiriman dan pemasangan di lokasi Anda.`,
        },
      },
      {
        "@type": "Question",
        name: `Berapa garansi untuk ${product.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Garansi dan ketentuan purna jual tersedia — hubungi admin ProFabric Steel via WhatsApp untuk informasi lengkap mengenai garansi produk dan layanan after-sales.`,
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: `${siteConfig.url}/#produk`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
          <Link href="/" className="transition hover:text-orange-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="transition hover:text-orange-700">
            Produk
          </Link>
          <span>/</span>
          <span className="font-medium text-zinc-800">{product.name}</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Kolom kiri: galeri gambar — sticky agar tetap terlihat saat scroll */}
          <div className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.07)] sm:p-5 lg:self-start lg:sticky lg:top-[7rem]">
            <ProductGallery
              images={product.images.gallery}
              productName={product.name}
            />
          </div>

          {/* Kolom kanan: detail produk */}
          <div className="min-w-0 flex flex-col gap-4">
            <div className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-800">
                  {sportLabels[product.sport]}
                </span>
                {product.standards.map((std) => (
                  <StandardBadge key={std} std={std} />
                ))}
                {product.variant && (
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">
                    {product.variant}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                  {product.description.intro}
                </p>
              )}

              {/* Box Harga Terbaik — hanya untuk produk dengan harga numerik */}
              {product.price && product.price.type !== "contact" && (
                <div className="mt-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-normal text-sky-700">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5">
                          <path
                            d="M6.2 3.2H4.7a1.5 1.5 0 00-1.5 1.5v1.5l4.9 4.9 1.5-1.5-4.9-4.9h1.5A1.5 1.5 0 007.7 3.2H6.2Z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="5.25" cy="5.25" r=".6" fill="currentColor" />
                        </svg>
                      </span>
                      <span>Harga Terbaik</span>
                    </p>
                    <a
                      href="https://id.shp.ee/VJqfdMyT"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Beli di Shopee"
                      className="shrink-0 transition hover:opacity-70"
                    >
                      <img src="/images/logo/logo shopee.png" alt="Shopee" className="h-4 w-auto" />
                    </a>
                  </div>

                  {/* Perbandingan harga */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:flex-nowrap">
                    <div className="min-w-0 shrink-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-zinc-400">Marketplace</p>
                      <p className="text-xs font-semibold text-zinc-400 line-through sm:whitespace-nowrap">
                        {product.price.type === "from" ? "Mulai " : ""}{formatRupiah(product.price.base)}
                      </p>
                    </div>
                    <div className="min-w-0 shrink-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-sky-600">Web / WA</p>
                      <p className="text-sm font-extrabold text-sky-700 sm:whitespace-nowrap">
                        {product.price.type === "from" ? "Mulai " : ""}{formatRupiah(getDiscountedPrice(product.price.base))}
                      </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 sm:whitespace-nowrap">
                      HEMAT {formatRupiah(product.price.base - getDiscountedPrice(product.price.base))}
                    </span>
                  </div>

                  {/* Benefit list */}
                  <ul className="mt-3 space-y-1.5">
                    {[
                      "DP 30%, sisa 70% dibayar saat barang siap dikirim",
                      "Selesai dalam 2 hari kerja",
                      "Garansi kepuasan 7 hari",
                      "Langsung koordinasi dengan admin PFS",
                      "Estimasi ongkir sesuai lokasi, konsultasi WA untuk penawaran lengkap",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-zinc-700">
                        <span className="mt-0.5 shrink-0 text-sky-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-5 flex flex-wrap gap-3">
                <WaButton href={productWaUrl} productName={product.name} variant="primary">
                  <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Konsultasi via WhatsApp
                </WaButton>
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
                >
                  Lihat Produk Lain
                </Link>
              </div>
            </div>

            {/* Fitur & Spesifikasi — gabungan 1 card */}
            {(product.description?.details || product.description?.notes) && (
              <div className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
                {product.description?.details && (
                  <>
                    <h2 className="text-base font-bold uppercase tracking-wide text-zinc-500">
                      Fitur & Keunggulan
                    </h2>
                    <ul className="mt-3 space-y-1.5">
                      {product.description.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                              <path
                                d="M5 10.5L8.2 13.5L15 6.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-sm leading-relaxed text-zinc-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {product.description?.details && product.description?.notes && (
                  <hr className="my-4 border-zinc-100" />
                )}

                {product.description?.notes && (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                      Material & Spesifikasi
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.description.notes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <ProductRelated
          sportLabel={sameCategoryLabel}
          sameCategory={sameCategory}
          crossCategory={crossCategory}
        />

        {/* CTA konsultasi */}
        <section className="mt-5 rounded-3xl border border-orange-200 bg-orange-50 p-5">
          <p className="font-semibold text-zinc-900 sm:text-base">
            Butuh spesifikasi khusus atau ingin konsultasi dulu?
          </p>
          <WaButton
            href={productWaUrl}
            productName={product.name}
            variant="dark"
            className="mt-3 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Hubungi Admin PFS
          </WaButton>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
