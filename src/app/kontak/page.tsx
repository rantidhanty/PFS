import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config/site";
import { waUrl } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi ProFabric Steel via WhatsApp untuk konsultasi, penawaran harga, dan pemesanan produk. Lokasi di Bekasi, Jawa Barat.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-5 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Kontak
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Hubungi Kami
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Konsultasi spesifikasi, penawaran harga, dan pemesanan tersedia via
            WhatsApp setiap hari kerja.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {/* Info kontak */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp CTA */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                WhatsApp
              </p>
              <a
                href={`tel:${siteConfig.phone.schema}`}
                className="mt-1 inline-block text-2xl font-extrabold tracking-tight text-zinc-900 hover:text-emerald-700"
              >
                {siteConfig.phone.display}
              </a>
              <p className="mt-1 text-xs text-zinc-400">Tap untuk menelepon</p>
              <p className="mt-1 text-sm text-zinc-600">
                Respon cepat, hari kerja Senin–Sabtu
              </p>
              <a
                href={waUrl("Halo admin PFS, saya mau konsultasi")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
              >
                <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat Sekarang
              </a>
            </div>

            {/* Alamat */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Alamat Workshop
              </p>
              <address className="mt-2 not-italic text-sm leading-relaxed text-zinc-700">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}
                <br />
                {siteConfig.address.province}{" "}
                {siteConfig.address.postalCode}
              </address>
            </div>

            {/* Jam operasional */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Jam Operasional
              </p>
              <div className="mt-2 space-y-1 text-sm text-zinc-700">
                <p>
                  <span className="font-semibold">Senin – Sabtu</span>
                  <span className="ml-2 text-zinc-500">
                    {siteConfig.openingHours.open} –{" "}
                    {siteConfig.openingHours.close}
                  </span>
                </p>
                <p className="text-zinc-400">Minggu: Tutup</p>
              </div>
            </div>
          </div>

          {/* Maps */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Lokasi di Maps
            </p>
            <div className="overflow-hidden rounded-2xl border border-zinc-100">
              <iframe
                title="Google Maps Kantor ProFabric Steel"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.25086886259!2d107.1709019592964!3d-6.19733893595498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698698688ca731%3A0x270147ffbc5c8b6c!2sJl.%20Mawar%20Raya%20No.1%2C%20Sukamanah%2C%20Kec.%20Sukatani%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat%2017630!5e0!3m2!1sid!2sid!4v1772932288139!5m2!1sid!2sid"
                className="h-[320px] w-full sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
