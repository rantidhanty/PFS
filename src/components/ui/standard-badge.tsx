"use client";

import { useState } from "react";

const STANDARDS_INFO: Record<string, { emoji: string; full: string; label: string }> = {
  FIBA: {
    emoji: "🏀",
    full: "Fédération Internationale de Basketball",
    label: "Induk basket dunia. Produk ini memenuhi spesifikasi resmi ring, papan pantul, dan dimensi lapangan untuk pertandingan internasional.",
  },
  FIVB: {
    emoji: "🏐",
    full: "Fédération Internationale de Volleyball",
    label: "Induk voli dunia. Produk ini sesuai regulasi net, tiang, ketinggian, dan dimensi lapangan voli resmi internasional.",
  },
  FIFA: {
    emoji: "⚽",
    full: "Fédération Internationale de Football Association",
    label: "Induk sepak bola dan futsal dunia. Produk ini memenuhi standar gawang, dimensi, dan perlengkapan pertandingan resmi FIFA.",
  },
  BWF: {
    emoji: "🏸",
    full: "Badminton World Federation",
    label: "Induk badminton dunia. Produk ini sesuai standar tiang net, ketinggian net, dan dimensi lapangan badminton resmi BWF.",
  },
  FIP: {
    emoji: "🎾",
    full: "Federación Internacional de Pádel",
    label: "Induk padel dunia. Produk ini memenuhi standar konstruksi lapangan, dinding kaca, dan perlengkapan pertandingan FIP.",
  },
  ITF: {
    emoji: "🎾",
    full: "International Tennis Federation",
    label: "Induk tenis dunia. Produk ini sesuai standar tiang net, dimensi lapangan, dan perlengkapan pertandingan resmi ITF.",
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
        <span className="ml-1 align-middle text-[10px] text-sky-400">ⓘ</span>
      </button>

      {open && info && (
        <div className="absolute bottom-full left-0 z-50 mb-2.5 w-64 rounded-xl bg-zinc-900 px-3.5 py-3 text-xs text-white shadow-xl">
          <p className="font-extrabold text-sm">
            {info.emoji} {std}
          </p>
          <p className="mt-0.5 text-sky-300 text-[11px]">{info.full}</p>
          <p className="mt-1.5 leading-relaxed text-zinc-400">{info.label}</p>
          <span className="absolute left-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900" />
        </div>
      )}
    </span>
  );
}
