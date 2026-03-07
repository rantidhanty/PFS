import { ProductGalleryCarousel } from "@/components/ui/product-gallery-carousel";
import { ProductImage } from "@/components/ui/product-image";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { products, sportLabels, type SportCategory } from "@/data/products";

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
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <section id="produk" className="mb-10 scroll-mt-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Sports Store Portfolio
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Gallery Produk Standar Kompetisi
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Data produk dirender dari `src/data/products.ts`. Simpan file gambar
            di `public/images/products/&lt;sport&gt;/&lt;product-slug&gt;/`.
          </p>
        </section>

        {Object.entries(groupedProducts).map(([sport, sportProducts]) => (
          <section key={sport} className="mb-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
              {sportLabels[sport as SportCategory]}
              </h2>
              {sport === "basketball" ? (
                <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                  3 Tipe Ring Basket
                </div>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sportProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {product.slug === "ring-basket-fiba-portable" ||
                  product.slug === "ring-basket-fiba-tanam-dinding" ||
                  product.slug === "ring-basket-fiba-tanam-tanah" ? (
                    <ProductGalleryCarousel
                      images={product.images.gallery}
                      alt={product.name}
                      priority={index === 0}
                      intervalMs={5000}
                    />
                  ) : (
                    <ProductImage
                      src={product.images.thumb}
                      alt={product.name}
                      priority={index === 0}
                    />
                  )}
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
                </article>
              ))}
            </div>
          </section>
        ))}

        <section id="standar" className="mb-12 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Standar Kompetisi</h2>
          <p className="mt-2 max-w-3xl text-zinc-600">
            Produk kami dirancang untuk kebutuhan turnamen dan fasilitas olahraga dengan referensi standar FIBA, FIVB, BWF, FIFA, ITF, dan FIP.
          </p>
        </section>

        <section id="tentang" className="mb-12 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Tentang Kami</h2>
          <p className="mt-2 max-w-3xl text-zinc-600">
            Kami fokus pada pengadaan alat olahraga kompetisi dengan opsi custom kebutuhan sekolah, klub, venue, dan proyek pemerintah.
          </p>
        </section>

        <section id="kontak" className="scroll-mt-24 rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Kontak & Penawaran</h2>
          <p className="mt-2 text-zinc-700">
            Konsultasi spesifikasi dan penawaran harga tersedia via WhatsApp.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Hubungi via WhatsApp
          </a>
        </section>
      </main>
    </div>
  );
}
