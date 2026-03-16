"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { waUrl } from "@/config/site";

const faqs = [
  {
    q: "Apakah produk ProFabric Steel memenuhi standar internasional?",
    a: "Ya, seluruh produk kami dirancang sesuai standar internasional yang berlaku — ring basket mengikuti standar FIBA, tiang voli FIVB, gawang futsal FIFA, tiang badminton BWF, tiang tenis ITF, dan tiang padel FIP. Cocok untuk keperluan sekolah, klub, hingga venue kompetisi.",
  },
  {
    q: "Apakah bisa dikirim ke luar Bekasi?",
    a: "Bisa. Kami melayani pengiriman ke seluruh wilayah Indonesia. Estimasi pengiriman 2–7 hari kerja tergantung lokasi tujuan. Hubungi admin PFS untuk info ongkir dan jadwal pengiriman yang lebih detail.",
  },
  {
    q: "Apakah ukuran dan spesifikasi bisa dikustom?",
    a: "Ya, kami menerima custom ukuran dan spesifikasi sesuai kebutuhan venue atau lapangan Anda. Tim fabrikasi kami siap menyesuaikan desain, material, dan finishing. Konsultasikan kebutuhan Anda via WhatsApp untuk mendapatkan penawaran yang tepat.",
  },
  {
    q: "Bagaimana cara memesan atau konsultasi?",
    a: "Cukup klik tombol WhatsApp yang tersedia. Tim kami siap membantu mulai dari konsultasi spesifikasi, penawaran harga, proses produksi, hingga pengiriman ke lokasi Anda.",
  },
  {
    q: "Berapa lama proses pengerjaan?",
    a: "Lama pengerjaan tergantung jenis dan jumlah produk. Untuk produk standar biasanya 3–7 hari kerja. Untuk pesanan custom atau dalam jumlah besar, estimasi waktu akan diberikan saat konsultasi awal.",
  },
  {
    q: "Apakah tersedia layanan pemasangan di lokasi?",
    a: "Ya, kami menyediakan layanan pemasangan untuk area Bekasi dan sekitarnya. Untuk lokasi di luar Bekasi, layanan pemasangan dapat dikonsultasikan lebih lanjut tergantung jarak dan ketersediaan tim.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const revealUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 56, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      id="faq"
      className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-zinc-50 to-white p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
          FAQ
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Pertanyaan yang sering ditanyakan
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
          Belum menemukan jawaban? Langsung tanyakan ke admin PFS via WhatsApp.
        </p>
      </div>

      {/* Accordion */}
      <div className="mt-5 divide-y divide-zinc-100">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-sm font-semibold text-zinc-900 sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                    isOpen
                      ? "bg-orange-500 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 pr-10 text-sm leading-relaxed text-zinc-600 sm:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CTA bawah */}
      <div className="mt-4 flex flex-col items-start gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-zinc-900">
          Masih ada pertanyaan lain?
        </p>
        <a
          href={waUrl("Halo admin PFS, saya punya pertanyaan tentang produk")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#20b558]"
        >
          <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-4 w-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Tanya via WhatsApp
        </a>
      </div>
    </motion.section>
  );
}
