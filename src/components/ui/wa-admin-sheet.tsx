"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { admins } from "@/config/site";

export function WaAdminSheet() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const link = (e.target as Element).closest('a[href*="wa.me"]');
      if (!link) return;
      e.preventDefault();
      const href = link.getAttribute("href") ?? "";
      try {
        const url = new URL(href);
        setMessage(decodeURIComponent(url.searchParams.get("text") ?? "Halo ProFabric Steel, saya mau konsultasi"));
      } catch {
        setMessage("Halo ProFabric Steel, saya mau konsultasi");
      }
      setOpen(true);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const close = () => setOpen(false);

  const openAdmin = (wa: string) => {
    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    close();
  };

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-3xl bg-white px-5 pb-8 pt-4 shadow-2xl"
          >
            {/* Handle bar */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Hubungi Kami
                </p>
                <h2 className="mt-0.5 text-lg font-extrabold tracking-tight text-zinc-900">
                  Pilih Admin
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Tutup"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Admin list */}
            <div className="flex flex-col gap-3">
              {admins.map((admin) => (
                <button
                  key={admin.wa}
                  onClick={() => openAdmin(admin.wa)}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-left transition hover:border-emerald-300 hover:bg-emerald-50 active:scale-[0.98]"
                >
                  {/* WA icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                    <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-zinc-900">{admin.name}</p>
                    <p className="text-sm text-zinc-500">{admin.display}</p>
                  </div>

                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true">
                    <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Template pesan */}
            {message && (
              <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                  Pesan yang akan dikirim
                </p>
                <p className="mt-0.5 truncate text-xs text-zinc-600">&ldquo;{message}&rdquo;</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
