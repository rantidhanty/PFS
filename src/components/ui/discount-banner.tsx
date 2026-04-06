"use client";

import { useState, useEffect } from "react";
import { waUrl } from "@/lib/wa";

function getSecondsUntilMidnightWIB(): number {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utcMs + 7 * 3600000);
  const secondsPassed =
    wib.getHours() * 3600 + wib.getMinutes() * 60 + wib.getSeconds();
  return 86400 - secondsPassed;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function DiscountBanner() {
  const [secs, setSecs] = useState<number | null>(null);

  useEffect(() => {
    setSecs(getSecondsUntilMidnightWIB());
    const id = setInterval(() => setSecs(getSecondsUntilMidnightWIB()), 1000);
    return () => clearInterval(id);
  }, []);

  if (secs === null) return null;

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  const link = waUrl(
    "Halo kak PFS, saya mau klaim promo diskon 3% untuk produk yang saya minati 🙏"
  );

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 px-3 py-1.5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <span className="text-[11px] font-semibold sm:text-xs">
            🔥 <strong>Diskon 3%</strong>
            <span className="hidden sm:inline"> semua produk!</span> Berakhir dalam
          </span>
          <span className="rounded bg-white/20 px-2 py-0.5 font-mono text-xs font-bold tracking-widest">
            {pad(h)}:{pad(m)}:{pad(s)}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-orange-600 shadow transition hover:bg-orange-50 active:scale-95"
          >
            Klaim →
          </a>
        </div>
      </div>
      <div className="h-8" />
    </>
  );
}
