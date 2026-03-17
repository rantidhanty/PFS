export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO: "2026-03-10"
  category: string;
  readingTime: number; // menit
  tags: string[];
  image: string; // path dari /public
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cara-memilih-ring-basket-untuk-sekolah",
    title: "Cara Memilih Ring Basket yang Tepat untuk Sekolah",
    description: "Panduan lengkap memilih ring basket yang sesuai kebutuhan sekolah — dari jenis portable, tanam dinding, hingga standar FIBA.",
    date: "2026-03-10",
    category: "Panduan",
    readingTime: 5,
    tags: ["basket", "ring basket", "FIBA", "sekolah"],
    image: "/images/products/basketball/ring-basket-fiba/portable/2.2.png",
  },
  {
    slug: "ukuran-lapangan-futsal-standar-fifa",
    title: "Ukuran Lapangan Futsal Standar FIFA yang Wajib Kamu Tahu",
    description: "Mengenal dimensi resmi lapangan futsal standar FIFA, mulai dari panjang, lebar, hingga spesifikasi gawang yang benar.",
    date: "2026-03-05",
    category: "Edukasi",
    readingTime: 4,
    tags: ["futsal", "FIFA", "lapangan", "gawang"],
    image: "/images/products/football/goal-post-11v11/gawang/1.1.png",
  },
  {
    slug: "mengenal-olahraga-padel-yang-sedang-tren",
    title: "Mengenal Padel: Olahraga Raket yang Sedang Tren di Indonesia",
    description: "Apa itu padel? Kenali sejarah, aturan dasar, dan kebutuhan peralatan standar FIP untuk olahraga yang kini populer di Indonesia.",
    date: "2026-02-28",
    category: "Edukasi",
    readingTime: 6,
    tags: ["padel", "FIP", "olahraga raket"],
    image: "/images/products/padel/tiang-padel/1.1.png",
  },
  {
    slug: "perbedaan-ring-basket-portable-vs-tanam",
    title: "Ring Basket Portable vs Tanam: Mana yang Lebih Tepat?",
    description: "Perbandingan lengkap ring basket portable dan tanam dari sisi stabilitas, harga, kemudahan instalasi, dan cocok untuk venue apa.",
    date: "2026-02-20",
    category: "Panduan",
    readingTime: 4,
    tags: ["basket", "ring basket", "portable", "tanam"],
    image: "/images/products/basketball/ring-basket-fiba/tanam-dinding/5.5.png",
  },
  {
    slug: "standar-ukuran-lapangan-basket-fiba",
    title: "Standar Ukuran Lapangan Basket FIBA yang Harus Diketahui",
    description: "Dimensi resmi lapangan basket FIBA — panjang, lebar, zona terlarang, garis tiga angka, hingga tinggi ring yang tepat.",
    date: "2026-02-15",
    category: "Edukasi",
    readingTime: 5,
    tags: ["basket", "FIBA", "lapangan", "standar"],
    image: "/images/products/basketball/ring-basket-fiba/tanam-tanah/1.1.png",
  },
  {
    slug: "mengenal-standar-bwf-untuk-badminton",
    title: "Mengenal Standar BWF untuk Peralatan Badminton",
    description: "BWF menetapkan standar ketat untuk tiang, net, dan lapangan badminton. Kenali apa saja syaratnya agar pertandingan berjalan fair.",
    date: "2026-02-10",
    category: "Edukasi",
    readingTime: 5,
    tags: ["badminton", "BWF", "tiang", "net"],
    image: "/images/products/badminton/01.jpg",
  },
  {
    slug: "tips-memilih-net-voli-untuk-sekolah",
    title: "Tips Memilih Net dan Tiang Voli yang Tepat untuk Sekolah",
    description: "Panduan praktis memilih net dan tiang voli untuk kebutuhan sekolah — dari material, ukuran standar FIVB, hingga sistem pemasangan.",
    date: "2026-02-05",
    category: "Panduan",
    readingTime: 4,
    tags: ["voli", "FIVB", "net", "tiang", "sekolah"],
    image: "/images/products/volleyball/net-volleyball-fivb/portable/w1.1.png",
  },
  {
    slug: "cara-pasang-gawang-futsal-yang-benar",
    title: "Cara Pasang Gawang Futsal yang Aman dan Benar",
    description: "Panduan langkah demi langkah pemasangan gawang futsal — mulai dari persiapan lantai, pengencangan baut, hingga pemasangan jaring.",
    date: "2026-01-28",
    category: "Tips",
    readingTime: 4,
    tags: ["futsal", "gawang", "instalasi", "FIFA"],
    image: "/images/products/football/goal-post-11v11/gawang/2.2.png",
  },
  {
    slug: "keunggulan-material-besi-untuk-peralatan-olahraga",
    title: "Mengapa Material Besi Hollow Lebih Unggul untuk Peralatan Olahraga",
    description: "Besi hollow vs aluminium tipis vs kayu — perbandingan material yang sering dipakai peralatan olahraga dan mana yang paling tahan lama.",
    date: "2026-01-20",
    category: "Edukasi",
    readingTime: 5,
    tags: ["material", "besi hollow", "fabrikasi", "kualitas"],
    image: "/images/products/padel/tiang-padel/3.3.png",
  },
  {
    slug: "panduan-ukuran-lapangan-badminton",
    title: "Panduan Lengkap Ukuran Lapangan Badminton Standar BWF",
    description: "Semua yang perlu kamu tahu tentang dimensi lapangan badminton — panjang, lebar, tinggi net, zona servis, hingga clearance area.",
    date: "2026-01-15",
    category: "Panduan",
    readingTime: 5,
    tags: ["badminton", "BWF", "lapangan", "ukuran"],
    image: "/images/products/badminton/03.jpg",
  },
  {
    slug: "tips-merawat-tiang-voli-agar-tahan-lama",
    title: "Tips Merawat Tiang Voli Besi agar Awet dan Tahan Lama",
    description: "Tiang voli besi bisa bertahan puluhan tahun jika dirawat dengan benar. Pelajari cara membersihkan, mencegah karat, dan menyimpannya.",
    date: "2026-01-10",
    category: "Tips",
    readingTime: 3,
    tags: ["voli", "perawatan", "besi", "tiang"],
    image: "/images/products/volleyball/net-volleyball-fivb/tanam/01.jpg",
  },
  {
    slug: "tips-pengadaan-peralatan-olahraga-sekolah",
    title: "Tips Pengadaan Peralatan Olahraga untuk Sekolah dengan Budget Terbatas",
    description: "Cara cerdas memilih dan membeli peralatan olahraga sekolah — prioritas kebutuhan, standar minimum, dan cara nego harga terbaik.",
    date: "2026-01-05",
    category: "Tips",
    readingTime: 6,
    tags: ["sekolah", "pengadaan", "budget", "peralatan"],
    image: "/images/products/basketball/ring-basket-fiba/tanam-dinding/7.7.png",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
