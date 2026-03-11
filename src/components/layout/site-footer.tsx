import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-orange-100 bg-gradient-to-b from-[#fffaf5] via-white to-[#f7f4ee]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-7 sm:px-6 md:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-24 shrink-0 overflow-hidden">
              <Image
                src="/images/logo/logo%20pfs.jpg"
                alt="Logo ProFabric Steel"
                fill
                sizes="96px"
                className="object-contain object-left"
              />
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-zinc-900">
              Solusi fabrikasi besi dan peralatan olahraga
            </h3>
          </div>
          <p className="mt-3 max-w-xl text-justify text-sm leading-relaxed text-zinc-600">
            Melayani kebutuhan proyek institusi, komersial, dan custom dengan
            pengerjaan rapi, presisi, dan siap digunakan.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Bekasi, Jawa Barat
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-zinc-500">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sky-800">
              Fabrikasi Besi
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800">
              Peralatan Olahraga
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-800">
              Project Custom
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-700">
            Kontak Cepat
          </h3>
          <p className="mt-3 text-sm text-zinc-600">WhatsApp: 0896-7340-4972</p>
          <p className="mt-1 text-sm text-zinc-600">
            Siap melayani konsultasi dan penawaran project.
          </p>
          <a
            href="https://wa.me/6289673404972"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Chat Admin PFS
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs leading-relaxed text-zinc-500 sm:px-6">
        Copyright &copy; {new Date().getFullYear()} ProFabric Steel. Pengerjaan
        kuat, rapi, dan presisi.
      </div>
    </footer>
  );
}
