"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectCaseStudy, ProjectTag } from "@/data/projects";

type Props = {
  projectCards: ProjectCaseStudy[];
  supportingProjects: Array<{ name: string; tag: ProjectTag }>;
};

const tagBadgeColor: Record<string, string> = {
  Pendidikan: "bg-sky-100 text-sky-800",
  Komersial: "bg-emerald-100 text-emerald-800",
  Perbankan: "bg-amber-100 text-amber-800",
};

const tagActiveColor: Record<string, string> = {
  Pendidikan: "bg-sky-600 text-white",
  Komersial: "bg-emerald-600 text-white",
  Perbankan: "bg-amber-600 text-white",
};

const tagLabelColor: Record<string, string> = {
  Pendidikan: "text-sky-600",
  Komersial: "text-emerald-600",
  Perbankan: "text-amber-600",
};

export function ProjectsGrid({ projectCards, supportingProjects }: Props) {
  const [activeTag, setActiveTag] = useState<ProjectTag | "Semua">("Semua");

  const allTags = ["Semua", "Pendidikan", "Komersial", "Perbankan"] as const;

  const getCount = (tag: typeof allTags[number]) => {
    if (tag === "Semua") return projectCards.length + supportingProjects.length;
    return (
      projectCards.filter((p) => p.tag === tag).length +
      supportingProjects.filter((p) => p.tag === tag).length
    );
  };

  const filteredCards =
    activeTag === "Semua"
      ? projectCards
      : projectCards.filter((p) => p.tag === activeTag);

  const filteredSupporting =
    activeTag === "Semua"
      ? supportingProjects
      : supportingProjects.filter((p) => p.tag === activeTag);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const count = getCount(tag);
          if (count === 0) return null;
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                isActive
                  ? tag === "Semua"
                    ? "bg-zinc-900 text-white"
                    : tagActiveColor[tag]
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
              }`}
            >
              {tag}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Project cards grid */}
      {filteredCards.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isFeatured ? "sm:col-span-2" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-zinc-100 ${
                    isFeatured
                      ? "aspect-[4/3] sm:aspect-[16/7]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={project.images[0]}
                    alt={`Project ${project.name} oleh ProFabric Steel`}
                    fill
                    priority={index === 0}
                    sizes={
                      isFeatured
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {isFeatured && (
                    <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${
                        tagBadgeColor[project.tag] ?? "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {project.tag}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-600">
                      {project.location}
                    </span>
                  </div>
                  <h2
                    className={`mt-2 font-extrabold tracking-tight text-zinc-900 transition group-hover:text-orange-700 ${
                      isFeatured ? "text-lg sm:text-xl" : "text-base"
                    }`}
                  >
                    {project.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                    {project.summary}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-sm transition group-hover:bg-sky-700">
                    Lihat Detail
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Supporting projects */}
      {filteredSupporting.length > 0 && (
        <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
            {filteredCards.length > 0 ? "Klien Lainnya" : "Semua Klien"}
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {(["Pendidikan", "Komersial", "Perbankan"] as const).map((tag) => {
              const items = filteredSupporting.filter((p) => p.tag === tag);
              if (items.length === 0) return null;
              return (
                <div key={tag}>
                  <p
                    className={`text-[11px] font-extrabold uppercase tracking-wide ${tagLabelColor[tag]}`}
                  >
                    {tag}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {items.map((p) => (
                      <span
                        key={p.name}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700"
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
      )}

      {/* Empty state */}
      {filteredCards.length === 0 && filteredSupporting.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-zinc-400">
            Belum ada project di kategori ini.
          </p>
        </div>
      )}
    </div>
  );
}
