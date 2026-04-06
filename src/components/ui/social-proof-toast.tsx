"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getRandomSocialProof, type SocialProofEntry } from "@/data/social-proof";

const VISIBLE_DURATION = 4500;   // berapa lama toast terlihat (ms)
const INTERVAL_MIN    = 9000;    // jeda minimum antar toast (ms)
const INTERVAL_MAX    = 16000;   // jeda maksimum antar toast (ms)

function randomInterval() {
  return Math.floor(Math.random() * (INTERVAL_MAX - INTERVAL_MIN)) + INTERVAL_MIN;
}

export function SocialProofToast() {
  const pathname              = usePathname();
  const [entry, setEntry]     = useState<SocialProofEntry | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setEntry(getRandomSocialProof());
    setVisible(true);

    setTimeout(() => setVisible(false), VISIBLE_DURATION);
  }, []);

  useEffect(() => {
    // Tampil pertama setelah 3 detik halaman dibuka
    const first = setTimeout(() => {
      showToast();

      // Kemudian loop dengan interval random
      const loop = () => {
        const id = setTimeout(() => {
          showToast();
          loop();
        }, randomInterval());
        return id;
      };
      loop();
    }, 3000);

    return () => clearTimeout(first);
  }, [showToast]);

  const dismiss = () => setVisible(false);

  if (pathname === "/chat" || !entry) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-6 left-4 z-[70] sm:left-6"
    >
      <div
        className={`pointer-events-auto flex max-w-[260px] items-start gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-xl transition-all duration-500 sm:max-w-xs ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {/* Icon */}
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-base">
          🛒
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-zinc-800">
            {entry.name}{" "}
            <span className="font-normal text-zinc-500">dari {entry.city}</span>
          </p>
          <p className="mt-0.5 text-xs text-zinc-600">
            baru membeli{" "}
            <span className="font-semibold text-zinc-800">{entry.product}</span>
          </p>
          <p className="mt-1 text-[10px] text-zinc-400">{entry.time}</p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup notifikasi"
          className="mt-0.5 shrink-0 text-zinc-300 transition hover:text-zinc-500"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
