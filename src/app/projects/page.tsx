import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { projectCards, supportingProjects } from "@/data/projects";
import { waUrl } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Project",
  description:
    "Dokumentasi proyek nyata ProFabric Steel — pemasangan fasilitas olahraga di sekolah, venue komersial, dan institusi di Bekasi dan sekitarnya.",
  alternates: { canonical: "/projects" },
};

const tagColor: Record<string, string> = {
  Pendidikan: "bg-sky-100 text-sky-800",
  Komersial: "bg-emerald-100 text-emerald-800",
  Perbankan: "bg-amber-100 text-amber-800",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
            Portfolio
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Project Yang Pernah Ditangani
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Dokumentasi nyata hasil pengerjaan ProFabric Steel di berbagai
            institusi, sekolah, dan venue komersial.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectCards.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={project.images[0]}
                  alt={`Project ${project.name} oleh ProFabric Steel`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 px-1">
                <div className="flex flex-wrap gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${tagColor[project.tag] ?? "bg-zinc-100 text-zinc-700"}`}
                  >
                    {project.tag}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-600">
                    {project.location}
                  </span>
                </div>
                <h2 className="mt-2 font-extrabold text-zinc-900 transition group-hover:text-orange-700 sm:text-lg">
                  {project.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                  {project.summary}
                </p>
                <span className="mt-3 inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-sm transition group-hover:bg-sky-700">
                  Lihat Detail
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Supporting projects */}
        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Klien Lainnya
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {(["Pendidikan", "Komersial", "Perbankan"] as const).map((tag) => {
              const items = supportingProjects.filter((p) => p.tag === tag);
              if (items.length === 0) return null;
              const labelColor: Record<string, string> = {
                Pendidikan: "text-sky-600",
                Komersial: "text-emerald-600",
                Perbankan: "text-amber-600",
              };
              return (
                <div key={tag}>
                  <p className={`text-[11px] font-extrabold uppercase tracking-wide ${labelColor[tag]}`}>
                    {tag}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {items.map((p) => (
                      <span
                        key={p.name}
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-800"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-5 py-5 sm:px-6">
          <p className="font-semibold text-zinc-900 sm:text-lg">
            Ingin project seperti ini untuk institusi Anda?
          </p>
          <a
            href={waUrl("Halo admin PFS, saya mau konsultasi project")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Konsultasi Project
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
