import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { WaButton } from "@/components/ui/wa-button";
import { ProjectMediaCarousel } from "@/components/ui/project-media-carousel";
import { projectCards, supportingProjects } from "@/data/projects";
import { waUrl } from "@/lib/wa";

export function generateStaticParams() {
  return projectCards.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCards.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `Project ${project.name}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `Project ${project.name} | ProFabric Steel`,
      description: project.summary,
      images: project.images[0]
        ? [
            {
              url: encodeURI(project.images[0]),
              alt: `Hasil pengerjaan ${project.name} oleh ProFabric Steel`,
            },
          ]
        : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCards.find((p) => p.slug === slug);
  if (!project) notFound();

  const consultWaUrl = waUrl(
    `Halo admin PFS, saya mau konsultasi project seperti ${project.name}`,
  );

  const galleryItems = [
    ...project.videos.map((src, i) => ({
      type: "video" as const,
      src,
      poster: project.images[i] ?? project.images[0],
      alt: `${project.name} video ${i + 1}`,
    })),
    ...project.images.map((src, i) => ({
      type: "image" as const,
      src,
      alt: `${project.name} ${i + 1}`,
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
              {project.tag}
            </span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-800">
              {project.location}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-zinc-700">
              Dokumentasi Project
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 text-justify text-sm leading-relaxed text-zinc-700 sm:text-lg">
            {project.overview}
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
              {project.summary}
            </p>

            <div className="mt-5 grid gap-3">
              {project.scope.map((item) => (
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
              {supportingProjects.map((p) => (
                <div
                  key={p.name}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800"
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      p.tag === "Pendidikan"
                        ? "bg-sky-100 text-sky-800"
                        : p.tag === "Komersial"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-4 py-4">
              <p className="text-sm font-semibold text-zinc-900 sm:text-base">
                Ingin project seperti ini untuk sekolah, venue, atau fasilitas
                Anda?
              </p>
              <WaButton
                href={consultWaUrl}
                productName={project.name}
                variant="dark"
                className="mt-3 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Hubungi Admin PFS
              </WaButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
