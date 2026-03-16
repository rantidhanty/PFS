import Link from "next/link";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FeaturedCarousel } from "@/components/sections/featured-carousel";
import { AutoScrollInit } from "@/components/ui/auto-scroll-init";
import { waUrl } from "@/config/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 pt-3 pb-10 sm:px-6 sm:pt-4">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Produk Unggulan ──────────────────────────────────────────── */}
        <section className="mb-4 rounded-2xl border border-zinc-200 bg-white px-5 pb-5 pt-5 sm:mb-5 sm:px-6 sm:pb-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
                Produk Unggulan
              </p>
              <h2 className="mt-0.5 text-xl font-extrabold tracking-tight sm:text-2xl">
                Pilihan Terpopuler
              </h2>
            </div>
            <Link
              href="/products"
              className="shrink-0 rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Lihat Semua →
            </Link>
          </div>
          <FeaturedCarousel />
        </section>

        {/* ── Testimoni ────────────────────────────────────────────────── */}
        <TestimonialsSection />

        {/* ── CTA Bar ──────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-orange-200 bg-linear-to-br from-orange-50 to-amber-50 p-5 sm:p-6">
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
            Siap mulai project Anda?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Konsultasi gratis, custom order tersedia, pengiriman ke seluruh
            Indonesia.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={waUrl("Halo admin PFS, saya mau konsultasi project")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#20b558]"
            >
              <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Konsultasi via WhatsApp
            </a>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
            >
              Lihat Katalog Lengkap
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
            >
              Lihat Portfolio
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <AutoScrollInit />
    </div>
  );
}
