"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projectCards, supportingProjects } from "@/data/projects";

export function BottomSections() {
  const prefersReducedMotion = useReducedMotion();

  const revealLeft = {
    hidden: prefersReducedMotion
      ? { opacity: 1, x: 0, scale: 1 }
      : { opacity: 0, x: -72, scale: 0.97 },
    show: { opacity: 1, x: 0 },
  };

  const revealRight = {
    hidden: prefersReducedMotion
      ? { opacity: 1, x: 0, scale: 1 }
      : { opacity: 0, x: 72, scale: 0.97 },
    show: { opacity: 1, x: 0 },
  };

  const revealUp = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 56, scale: 0.97 },
    show: { opacity: 1, y: 0 },
  };

  const staggerWrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.14 },
    },
  };

  const cardReveal = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 26, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {/* Section Project */}
      <motion.section
        id="project"
        className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
        variants={revealRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-zinc-50 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
            Project Unggulan
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Lihat hasil project yang sudah kami tangani
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base md:text-justify">
            Dokumentasi singkat project nyata dari PFS.
          </p>
        </div>

        <motion.div
          key="projects-home"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          className="mt-5 grid grid-flow-col auto-cols-[86%] gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[62%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {projectCards.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={cardReveal}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="snap-start rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/4.1] overflow-hidden rounded-2xl bg-zinc-100 md:aspect-[4/4.6]">
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    priority={index === 0}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white">
                    {project.tag}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                  {project.location} - Dokumentasi project nyata
                </p>
                <div className="mt-3 inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-sm transition group-hover:bg-sky-700">
                  Lihat Detail Project
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {supportingProjects.length ? (
          <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Project lain akan terus ditambahkan
          </p>
        ) : null}
      </motion.section>

      {/* Section Tentang */}
      <motion.section
        id="tentang"
        className="mb-8 scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-6 sm:mb-9"
        variants={revealLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          Tentang{" "}
          <span className="font-extrabold text-sky-900 underline decoration-orange-400 decoration-2 underline-offset-4">
            PFS
          </span>
        </h2>
        <p className="mt-2 text-justify text-zinc-700">
          ProFabric Steel adalah{" "}
          <span className="rounded-md bg-sky-100 px-1.5 py-0.5 font-extrabold text-sky-900">
            spesialis fabrikasi besi
          </span>{" "}
          profesional dan penjualan{" "}
          <span className="rounded-md bg-rose-100 px-1.5 py-0.5 font-extrabold text-rose-900">
            alat-alat olahraga
          </span>{" "}
          yang dipercaya berbagai instansi. Kami menghadirkan solusi lengkap
          untuk kebutuhan rumah berbahan besi seperti{" "}
          <span className="rounded-md bg-amber-100 px-1.5 py-0.5 font-extrabold text-amber-900">
            tralis
          </span>
          ,{" "}
          <span className="rounded-md bg-lime-100 px-1.5 py-0.5 font-extrabold text-lime-900">
            railing
          </span>
          ,{" "}
          <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 font-extrabold text-indigo-900">
            grill
          </span>
          , serta{" "}
          <span className="rounded-md bg-teal-100 px-1.5 py-0.5 font-extrabold text-teal-900">
            jasa perbaikan
          </span>{" "}
          dengan standar fabrikasi industri{" "}
          <span className="rounded-md bg-cyan-100 px-1.5 py-0.5 font-extrabold text-cyan-900">
            rapi, kuat, dan presisi
          </span>
          .
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Sejarah Singkat
            </h3>
            <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-600">
              Berawal dari workshop lokal, ProFabric Steel tumbuh menjadi mitra
              andalan berbagai proyek karena konsisten menjaga kualitas hasil
              dan ketepatan pengerjaan.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-700">
              Tim Profesional
            </h3>
            <p className="mt-2 text-justify text-sm leading-relaxed text-zinc-600">
              Seluruh pekerjaan ditangani tenaga ahli profesional dengan
              pengalaman lebih dari 15 tahun di bidang besi dan konstruksi
              fabrikasi.
            </p>
          </div>
        </div>

        <motion.div
          data-auto-scroll="true"
          data-scroll-direction="right"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-4 grid grid-flow-col auto-cols-[78%] gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] sm:auto-cols-[46%] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-3 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {[
            "Spesialis besi & fabrikasi profesional",
            "Penjualan alat olahraga unggulan",
            "Harga bersaing karena dikelola langsung",
            "Kualitas premium dengan material terpilih",
          ].map((point) => (
            <motion.div
              key={point}
              variants={cardReveal}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="snap-start rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-zinc-800"
            >
              {point}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Section Kontak */}
      <motion.section
        id="kontak"
        className="scroll-mt-24 rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-5"
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Kontak & Penawaran
        </h2>
        <p className="mt-2 text-zinc-700">
          Konsultasi spesifikasi dan penawaran harga tersedia via WhatsApp.
        </p>
        <div className="mx-auto mt-3 w-full max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              Maps Kantor
            </div>
            <iframe
              title="Google Maps Kantor ProFabric Steel"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.25086886259!2d107.1709019592964!3d-6.19733893595498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698698688ca731%3A0x270147ffbc5c8b6c!2sJl.%20Mawar%20Raya%20No.1%2C%20Sukamanah%2C%20Kec.%20Sukatani%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat%2017630!5e0!3m2!1sid!2sid!4v1772932288139!5m2!1sid!2sid"
              className="h-[260px] w-full sm:h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <a
          href="https://wa.me/6289673404972?text=Halo%20admin%20PFS%2C%20saya%20mau%20konsultasi%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Admin PFS
        </a>
        <p className="mt-3 text-sm text-zinc-700">
          ProFabric Steel siap melayani custom sesuai kebutuhan Anda.
        </p>
      </motion.section>
    </>
  );
}
