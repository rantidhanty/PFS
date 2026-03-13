export type TestimonialTag = "Pendidikan" | "Komersial" | "Perbankan";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  institution: string;
  tag: TestimonialTag;
  quote: string;
  product: string;
};

export type Stat = {
  numericValue: number;
  suffix: string;
  label: string;
  sublabel: string;
};

export const stats: Stat[] = [
  {
    numericValue: 15,
    suffix: "+",
    label: "Tahun Pengalaman",
    sublabel: "Di bidang fabrikasi besi",
  },
  {
    numericValue: 50,
    suffix: "+",
    label: "Project Selesai",
    sublabel: "Skala personal hingga institusi",
  },
  {
    numericValue: 20,
    suffix: "+",
    label: "Institusi Dilayani",
    sublabel: "Sekolah, komersial & perbankan",
  },
  {
    numericValue: 7,
    suffix: "",
    label: "Cabang Olahraga",
    sublabel: "Basket, voli, futsal & lainnya",
  },
];

// Ganti quote dengan kutipan nyata dari klien untuk hasil maksimal
export const testimonials: Testimonial[] = [
  {
    id: "t-sman37",
    name: "Bapak Kepala Sekolah",
    role: "Kepala Sekolah",
    institution: "SMAN 37 Jakarta",
    tag: "Pendidikan",
    quote:
      "Hasil pengerjaan ring basket dan fasilitas olahraga sangat memuaskan. Material kuat, finishing rapi, dan tim PFS sangat profesional dalam setiap tahap pengerjaan.",
    product: "Ring Basket & Fasilitas Olahraga",
  },
  {
    id: "t-sdncilincing",
    name: "Ibu Kepala Sekolah",
    role: "Kepala Sekolah",
    institution: "SDN Cilincing",
    tag: "Pendidikan",
    quote:
      "PFS sangat responsif dan memahami kebutuhan kami. Tiang voli yang dipasang kokoh dan presisi. Siswa sangat antusias menggunakan lapangan barunya.",
    product: "Tiang Voli FIVB",
  },
  {
    id: "t-aeon",
    name: "Tim Facility",
    role: "Facility Manager",
    institution: "AEON Bekasi",
    tag: "Komersial",
    quote:
      "ProFabric Steel menjadi pilihan tepat untuk project fabrikasi besi kami. Pengerjaan tepat waktu, hasil sesuai spesifikasi, dan harga sangat bersaing.",
    product: "Fabrikasi Besi Custom",
  },
];

export const clientBadges: { name: string; tag: TestimonialTag }[] = [
  { name: "SMAN 37 Jakarta", tag: "Pendidikan" },
  { name: "SDN Cilincing", tag: "Pendidikan" },
  { name: "SMA Wardaya", tag: "Pendidikan" },
  { name: "AEON Bekasi", tag: "Komersial" },
  { name: "Bank BRI", tag: "Perbankan" },
];
