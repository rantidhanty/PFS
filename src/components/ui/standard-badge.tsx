"use client";

import { useState } from "react";

const STANDARDS_INFO: Record<
  string,
  { full: string; desc: string; emoji: string }
> = {
  FIBA: {
    emoji: "🏀",
    full: "Fédération Internationale de Basketball",
    desc: "Induk basket dunia — mengatur standar ring, papan pantul, dan dimensi lapangan untuk pertandingan internasional.",
  },
  FIVB: {
    emoji: "🏐",
    full: "Fédération Internationale de Volleyball",
    desc: "Induk voli dunia — mengatur standar net, tiang, tinggi net, dan dimensi lapangan voli internasional.",
  },
  FIFA: {
    emoji: "⚽",
    full: "Fédération Internationale de Football Association",
    desc: "Induk sepak bola dan futsal dunia — mengatur standar gawang, lapangan, dan peralatan pertandingan resmi.",
  },
  BWF: {
    emoji: "🏸",
    full: "Badminton World Federation",
    desc: "Induk bulu tangkis dunia — mengatur standar tiang net, ketinggian net, dan dimensi lapangan resmi.",
  },
  FIP: {
    emoji: "🎾",
    full: "Federación Internacional de Pádel",
    desc: "Induk padel dunia — mengatur standar konstruksi lapangan, dinding kaca, dan perlengkapan pertandingan.",
  },
  ITF: {
    emoji: "🎾",
    full: "International Tennis Federation",
    desc: "Induk tenis dunia — mengatur standar tiang net, dimensi lapangan tenis, dan peralatan pertandingan resmi.",
  },
};

export function StandardBadge({ std }: { std: string }) {
  const [open, setOpen] = useState(false);
  const info = STANDARDS_INFO[std];

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-help rounded-full bg-sky-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-sky-800 transition hover:bg-sky-200"
        aria-label={`Info standar ${std}`}
      >
        Standar {std}
        <span className="ml-1 align-middle text-[10px] text-sky-500">ⓘ</span>
      </button>

      {open && info && (
        <div className="absolute bottom-full left-0 z-50 mb-2.5 w-60 rounded-2xl bg-zinc-900 p-3.5 text-xs text-white shadow-xl">
          <p className="text-base">{info.emoji}</p>
          <p className="mt-1 font-extrabold tracking-wide">{std}</p>
          <p className="mt-0.5 text-sky-300">{info.full}</p>
          <p className="mt-1.5 leading-relaxed text-zinc-400">{info.desc}</p>
          {/* Arrow */}
          <span className="absolute left-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900" />
        </div>
      )}
    </span>
  );
}

export function StandardsSection({ standards }: { standards: string[] }) {
  const known = standards.filter((s) => STANDARDS_INFO[s]);
  if (known.length === 0) return null;

  return (
    <section className="mt-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.07)]">
      <h2 className="text-base font-bold uppercase tracking-wide text-zinc-500">
        Standar Resmi
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Produk ini diproduksi sesuai regulasi organisasi olahraga internasional berikut:
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {known.map((std) => {
          const info = STANDARDS_INFO[std];
          return (
            <div
              key={std}
              className="flex gap-3 rounded-2xl border border-sky-100 bg-sky-50 p-4"
            >
              <span className="text-2xl">{info.emoji}</span>
              <div>
                <p className="font-extrabold tracking-wide text-sky-800">
                  {std}
                </p>
                <p className="text-[11px] font-medium text-sky-600">
                  {info.full}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                  {info.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
