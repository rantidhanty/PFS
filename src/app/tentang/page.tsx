import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig, waUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali ProFabric Steel lebih dekat — spesialis fabrikasi besi dan peralatan olahraga standar kompetisi di Bekasi, Jawa Barat sejak lebih dari 15 tahun.",
  alternates: { canonical: "/tentang" },
};

const strengths = [
  {
    title: "Spesialis Besi & Fabrikasi",
    desc: "Lebih dari 15 tahun pengalaman di bidang fabrikasi besi presisi untuk kebutuhan personal, komersial, dan institusional.",
    color: "border-sky-200 bg-sky-50",
    badge: "bg-sky-100 text-sky-800",
  },
  {
    title: "Standar Kompetisi Internasional",
    desc: "Semua produk olahraga dirancang mengikuti standar resmi: FIBA, FIVB, FIFA, BWF, FIP, dan ITF.",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
  },
  {
    title: "Custom Sesuai Kebutuhan",
    desc: "Menerima pesanan custom ukuran, spesifikasi, dan finishing untuk berbagai venue dan lapangan.",
    color: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Harga Bersaing",
    desc: "Dikelola langsung oleh tim profesional sehingga harga lebih efisien tanpa mengorbankan kualitas.",
    color: "border-violet-200 bg-violet-50",
    badge: "bg-violet-100 text-violet-800",
  },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Hero tentang */}
        <section className="mb-5 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
            Tentang Kami
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">
            ProFabric{" "}
            <span className="text-orange-600">Steel</span>
          </h1>
          <p className="mt-3 text-justify text-base leading-relaxed text-zinc-700 sm:text-lg">
            ProFabric Steel adalah spesialis{" "}
            <strong>fabrikasi besi profesional</strong> dan penjualan{" "}
            <strong>peralatan olahraga standar kompetisi</strong> yang
            berbasis di Bekasi, Jawa Barat (Sukatani, Cikarang). Dipercaya berbagai instansi
            pendidikan, komersial, dan pemerintahan untuk menghadirkan
            fasilitas olahraga berkualitas tinggi.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-600">
                Sejarah Singkat
              </h2>
              <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-700">
                Berawal dari workshop lokal di Bekasi, ProFabric Steel tumbuh
                menjadi mitra andalan berbagai proyek karena konsisten menjaga
                kualitas hasil dan ketepatan pengerjaan di setiap tahap
                produksi.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-600">
                Tim Profesional
              </h2>
              <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-700">
                Seluruh pekerjaan ditangani tenaga ahli profesional dengan
                pengalaman lebih dari 15 tahun di bidang besi dan konstruksi
                fabrikasi. Rapi, kuat, dan tepat waktu.
              </p>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section className="mb-5 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Keunggulan
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
            Mengapa memilih ProFabric Steel?
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {strengths.map((s) => (
              <div
                key={s.title}
                className={`rounded-2xl border p-4 ${s.color}`}
              >
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${s.badge}`}
                >
                  {s.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lokasi */}
        <section className="mb-5 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Lokasi
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
            Kantor & Workshop
          </h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-zinc-700">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}
            <br />
            {siteConfig.address.province} {siteConfig.address.postalCode}
            <br />
          </address>
          <p className="mt-2 text-sm text-zinc-500">
            Jam operasional: {siteConfig.openingHours.open} –{" "}
            {siteConfig.openingHours.close} (
            {siteConfig.openingHours.days.slice(0, 3).join(", ").replace("Monday", "Senin").replace("Tuesday", "Selasa").replace("Wednesday", "Rabu")}{" "}
            – {siteConfig.openingHours.days[5].replace("Saturday", "Sabtu")})
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-3xl border border-orange-200 bg-orange-50 px-5 py-5 sm:px-6">
          <p className="font-semibold text-zinc-900 sm:text-lg">
            Siap bekerja sama dengan ProFabric Steel?
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={waUrl("Halo admin PFS, saya ingin tahu lebih lanjut tentang ProFabric Steel")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
            >
              Hubungi via WhatsApp
            </a>
            <a
              href={`/kontak`}
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
            >
              Lihat Kontak & Maps
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
