export type ProjectTag = "Pendidikan" | "Komersial" | "Perbankan";

export type ProjectCaseStudy = {
  slug: string;
  name: string;
  tag: ProjectTag;
  location: string;
  summary: string;
  overview: string;
  scope: string[];
  trustPoints: string[];
  videos: string[];
  images: string[];
};

export const featuredProject: ProjectCaseStudy = {
  slug: "sman-37-jakarta",
  name: "SMAN 37 Jakarta",
  tag: "Pendidikan",
  location: "Jakarta",
  summary:
    "Dokumentasi proyek nyata pengerjaan fasilitas olahraga sekolah dengan hasil yang rapi, kokoh, dan siap digunakan.",
  overview:
    "Project ini menampilkan hasil pengerjaan fasilitas olahraga untuk lingkungan sekolah dengan fokus pada kekuatan struktur, kerapian finishing, dan kesiapan penggunaan di lapangan.",
  scope: [
    "Dirancang untuk kebutuhan fasilitas olahraga di lingkungan sekolah",
    "Finishing rapi, presisi, dan siap digunakan untuk aktivitas harian",
    "Didukung dokumentasi visual sebagai bukti hasil pengerjaan di lapangan",
  ],
  trustPoints: [
    "Proyek nyata di lingkungan sekolah",
    "Tersedia dokumentasi foto dan video",
    "Pengerjaan presisi, rapi, dan kokoh",
    "Cocok untuk kebutuhan institusi dan komersial",
  ],
  videos: [
    "/images/Projects/SMAN 37 Jakarta/01.mp4",
    "/images/Projects/SMAN 37 Jakarta/02.mp4",
  ],
  images: [
    "/images/Projects/SMAN 37 Jakarta/01.jpg",
    "/images/Projects/SMAN 37 Jakarta/02.jpg",
    "/images/Projects/SMAN 37 Jakarta/03.jpg",
  ],
};

export const projectCards: ProjectCaseStudy[] = [featuredProject];

export const supportingProjects: Array<{
  name: string;
  tag: ProjectTag;
}> = [
  { name: "SDN Cilincing", tag: "Pendidikan" },
  { name: "SMA Wardaya", tag: "Pendidikan" },
  { name: "AEON Bekasi", tag: "Komersial" },
  { name: "Bank BRI", tag: "Perbankan" },
];
