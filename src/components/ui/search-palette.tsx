"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { search, typeColor, typeLabel } from "@/lib/search";
import type { SearchItem } from "@/lib/search";

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = search(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      close();
    },
    [router, close],
  );

  // Open via custom event (dispatched from navbar) or Ctrl+K
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
      if (e.key === "Escape") close();
    };

    window.addEventListener("open-search", onOpen);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-search", onOpen);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  // Arrow key + Enter navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      navigate(results[activeIndex]);
    }
  };

  // Reset active when results change
  useEffect(() => setActiveIndex(0), [query]);

  // Group results by type for display
  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    const label = typeLabel[item.type];
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-900" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Cari produk, artikel, halaman..."
                className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-zinc-400 hover:text-zinc-600"
                  aria-label="Hapus"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <kbd className="hidden rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-zinc-400">
                  Tidak ada hasil untuk &ldquo;{query}&rdquo;
                </div>
              )}

              {!query && (
                <div className="px-4 py-6 text-center text-sm text-zinc-400">
                  Ketik untuk mencari produk, artikel, atau halaman...
                </div>
              )}

              {Object.entries(grouped).map(([label, items]) => (
                <div key={label}>
                  <p className="sticky top-0 bg-zinc-50 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-zinc-400">
                    {label}
                  </p>
                  {items.map((item) => {
                    const globalIndex = results.indexOf(item);
                    return (
                      <button
                        key={item.href + item.title}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeIndex === globalIndex
                            ? "bg-zinc-100"
                            : "hover:bg-zinc-50"
                        }`}
                      >
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${typeColor[item.type]}`}>
                          {item.badge}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-zinc-900">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-zinc-500">
                            {item.subtitle}
                          </p>
                        </div>
                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0 text-zinc-300" aria-hidden="true">
                          <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="flex items-center gap-3 border-t border-zinc-100 px-4 py-2">
                <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <kbd className="rounded border border-zinc-200 px-1 py-0.5 text-[9px]">↑↓</kbd>
                  navigasi
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <kbd className="rounded border border-zinc-200 px-1 py-0.5 text-[9px]">↵</kbd>
                  buka
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <kbd className="rounded border border-zinc-200 px-1 py-0.5 text-[9px]">ESC</kbd>
                  tutup
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
