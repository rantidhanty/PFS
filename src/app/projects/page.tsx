import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { ProjectStats } from "@/components/ui/project-stats";
import { projectCards, supportingProjects } from "@/data/projects";
import { waUrl } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Portfolio Project — Pemasangan Fasilitas Olahraga ProFabric Steel",
  description:
    "Dokumentasi nyata pengerjaan ProFabric Steel: ring basket, tiang voli, gawang futsal di sekolah, bank, dan venue komersial seluruh Indonesia.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const totalProjects = projectCards.length + supportingProjects.length;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          {/* Accent bar */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300" />

          <div className="p-5 sm:p-7">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700">
                Portfolio & Case Study
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Dipercaya Sekolah,{" "}
              <span className="text-orange-600">Bank & Venue Komersial</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
              <span className="font-semibold text-zinc-800">
                Bukan sekadar klaim
              </span>{" "}
              — lihat sendiri hasil nyata pengerjaan PFS dari berbagai project
              yang sudah selesai dan siap digunakan.
            </p>

            <ProjectStats
            stats={[
              {
                value: `${totalProjects}+`,
                label: "Project Selesai",
                accent: "text-orange-600",
                bg: "border-orange-100 bg-orange-50",
              },
              {
                value: "3",
                label: "Kategori",
                accent: "text-sky-600",
                bg: "border-sky-100 bg-sky-50",
              },
              {
                value: "Seluruh Indonesia",
                label: "Jangkauan Kirim",
                accent: "text-emerald-600",
                bg: "border-emerald-100 bg-emerald-50",
              },
            ]}
          />
          </div>
        </div>

        <ProjectsGrid
          projectCards={projectCards}
          supportingProjects={supportingProjects}
        />

        {/* CTA */}
        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-5 py-5 sm:px-6">
          <p className="font-semibold text-zinc-900 sm:text-lg">
            Ingin project seperti ini untuk institusi Anda?
          </p>
          <a
            href={waUrl("Halo admin PFS, saya mau konsultasi project")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#20b558]"
          >
            Konsultasi Project
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
