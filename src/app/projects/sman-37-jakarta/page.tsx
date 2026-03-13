import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ProjectMediaCarousel } from "@/components/ui/project-media-carousel";
import { featuredProject, supportingProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project Ring Basket SMAN 37 Jakarta",
  description:
    "Dokumentasi nyata proyek pemasangan ring basket dan fasilitas olahraga di SMAN 37 Jakarta oleh ProFabric Steel. Hasil rapi, kokoh, dan siap digunakan.",
  alternates: { canonical: "/projects/sman-37-jakarta" },
  openGraph: {
    title: "Project Ring Basket SMAN 37 Jakarta | ProFabric Steel",
    description:
      "Dokumentasi nyata proyek pemasangan ring basket dan fasilitas olahraga di SMAN 37 Jakarta oleh ProFabric Steel.",
    images: [
      {
        url: "/images/Projects/SMAN%2037%20Jakarta/01.jpg",
        alt: "Hasil pemasangan ring basket SMAN 37 Jakarta oleh ProFabric Steel",
      },
    ],
  },
};

export default function ProjectDetailPage() {
  const galleryItems = [
    {
      type: "video" as const,
      src: featuredProject.videos[0],
      poster: featuredProject.images[0],
      alt: `${featuredProject.name} video 1`,
    },
    {
      type: "video" as const,
      src: featuredProject.videos[1],
      poster: featuredProject.images[1],
      alt: `${featuredProject.name} video 2`,
    },
    ...featuredProject.images.map((imageSrc, index) => ({
      type: "image" as const,
      src: imageSrc,
      alt: `${featuredProject.name} ${index + 1}`,
    })),
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:p-7">
          <Link
            href="/#project"
            className="text-sm font-semibold text-orange-700 transition hover:text-orange-800"
          >
            &lt; Kembali ke homepage
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-sky-800">
              {featuredProject.tag}
            </span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-800">
              {featuredProject.location}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-zinc-700">
              Dokumentasi Project
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {featuredProject.name}
          </h1>
          <p className="mt-4 text-justify text-sm leading-relaxed text-zinc-700 sm:text-lg">
            {featuredProject.overview}
          </p>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Dokumentasi project
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
              Foto dan video hasil pengerjaan
            </h2>
            <div className="mt-4">
              <ProjectMediaCarousel items={galleryItems} />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Keunggulan project
            </p>
            <h2 className="mt-2 text-justify text-2xl font-extrabold tracking-tight">
              Nilai utama yang langsung terlihat dari hasil pengerjaan
            </h2>
            <p className="mt-3 text-justify text-sm leading-relaxed text-zinc-700 sm:text-base">
              {featuredProject.summary}
            </p>

            <div className="mt-5 grid gap-3">
              {featuredProject.scope.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-4 py-3"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-white">
                    &#10003;
                  </span>
                  <p className="pt-1 text-sm font-semibold leading-relaxed text-zinc-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Pengalaman lain
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
              Project lain yang pernah ditangani
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {supportingProjects.map((project) => (
                <div
                  key={project.name}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800"
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      project.tag === "Pendidikan"
                        ? "bg-sky-100 text-sky-800"
                        : project.tag === "Komersial"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {project.tag}
                  </span>
                  <span>{project.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-4 py-4">
              <p className="text-sm font-semibold text-zinc-900 sm:text-base">
                Ingin project seperti ini untuk sekolah, venue, atau fasilitas
                Anda?
              </p>
              <a
                href="https://wa.me/6289673404972"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Hubungi Admin PFS
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
