export type SportCategory =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "official-equipment";

export type ComplianceStandard = "FIBA" | "FIVB" | "BWF" | "FIFA" | "ITF" | "FIP";

export type Product = {
  id: string;
  name: string;
  slug: string;
  sport: SportCategory;
  type: string;
  variant?: string;
  standards: ComplianceStandard[];
  sportTags: string[];
  images: {
    thumb: string;
    gallery: string[];
  };
  description?: ProductDescription;
};

export type ProductDescription = {
  intro: string;
  details: string[];
  notes: string[];
  closing: string;
};

export const products: Product[] = [
  {
    id: "prod-basketball-ring-fiba-portable",
    name: "Ring Basket FIBA Portable",
    slug: "ring-basket-fiba-portable",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Portable",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/portable/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/01.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/02.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/03.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/04.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/05.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/06.jpg",
      ],
    },
    description: {
      intro:
        "Ring Basket Portable ini cocok untuk kebutuhan SD, SMP, hingga SMK. Desainnya kokoh, aman, dan tetap fleksibel untuk dipindahkan sesuai kebutuhan.",
      details: [
        "Papan pantul akrilik bening 8mm",
        "Tinggi ring bisa diatur 260 - 290 cm",
        "Ukuran papan 80 x 120 cm",
        "Jarak dari tiang utama 120 cm",
        "4 roda (2 mati, 2 hidup) + kunci/rem pengaman",
      ],
      notes: [
        "Rangka menggunakan besi hollow 40x60, 25x50, dan 20x40 cm.",
        "Bagian bawah dilapisi multiplek + busa tebal 3 cm agar lebih aman dan tahan lama.",
        "Kotak pemberat 20x30x40 cm (2 pcs per tiang) dengan total beban 120 kg.",
      ],
      closing: "Warna dan ukuran bisa request. Bisa survey lokasi juga.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-dinding",
    name: "Ring Basket FIBA Tanam Dinding",
    slug: "ring-basket-fiba-tanam-dinding",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Tanam Dinding",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/02.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/03.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/04.jpg",
      ],
    },
    description: {
      intro:
        "Ring Basket Tanam Dinding cocok untuk area dengan ruang terbatas dan kebutuhan lapangan permanen yang rapi.",
      details: [
        "Sistem pemasangan tanam dinding yang kuat dan stabil",
        "Papan pantul akrilik bening tebal",
        "Posisi ring presisi untuk latihan dan pertandingan",
        "Hemat ruang karena tanpa basis roda",
      ],
      notes: [
        "Rangka utama menggunakan material besi tebal dengan finishing tahan cuaca.",
        "Proses pemasangan menyesuaikan struktur dinding di lokasi.",
      ],
      closing:
        "Warna, ukuran, dan titik pemasangan bisa disesuaikan kebutuhan proyek.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-tanah",
    name: "Ring Basket FIBA Tanam Tanah",
    slug: "ring-basket-fiba-tanam-tanah",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Tanam Tanah",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/tanam-tanah/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/01.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/02.jpg",
      ],
    },
    description: {
      intro:
        "Ring Basket Tanam Tanah cocok untuk lapangan outdoor yang membutuhkan sistem permanen, kokoh, dan tahan lama.",
      details: [
        "Tiang utama ditanam ke pondasi tanah untuk kestabilan maksimal",
        "Konstruksi kuat untuk pemakaian intensif",
        "Ukuran dan tinggi ring bisa disesuaikan kebutuhan lapangan",
        "Cocok untuk sekolah, lapangan umum, dan area komunitas",
      ],
      notes: [
        "Material besi dipilih untuk ketahanan jangka panjang.",
        "Pekerjaan pondasi mengikuti kondisi tanah dan layout lapangan.",
      ],
      closing:
        "Menerima custom warna, spesifikasi, dan survey lokasi sebelum instalasi.",
    },
  },
  {
    id: "prod-volleyball-net-fivb",
    name: "Volleyball Net System",
    slug: "net-volleyball-fivb",
    sport: "volleyball",
    type: "net-and-post-system",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/01.jpg",
        "/images/products/volleyball/net-volleyball-fivb/02.jpg",
      ],
    },
  },
  {
    id: "prod-football-goal-fifa",
    name: "Football Goal 11v11",
    slug: "goal-post-11v11",
    sport: "football",
    type: "goal-post",
    standards: ["FIFA"],
    sportTags: ["football"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/football/goal-post-11v11/01.jpg",
        "/images/products/football/goal-post-11v11/02.jpg",
      ],
    },
  },
  {
    id: "prod-badminton-post-bwf",
    name: "Badminton Court Post",
    slug: "court-post-badminton",
    sport: "badminton",
    type: "court-post",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/badminton/court-post-badminton/01.jpg",
        "/images/products/badminton/court-post-badminton/02.jpg",
      ],
    },
  },
  {
    id: "prod-padel-post-fip",
    name: "Tiang Padel",
    slug: "tiang-padel",
    sport: "padel",
    type: "court-post",
    standards: ["FIP"],
    sportTags: ["padel"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/padel/tiang-padel/01.jpg",
        "/images/products/padel/tiang-padel/02.jpg",
      ],
    },
  },
  {
    id: "prod-tennis-post-itf",
    name: "Tiang Tenis",
    slug: "tiang-tennis",
    sport: "tennis",
    type: "court-post",
    standards: ["ITF"],
    sportTags: ["tennis"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/tennis/tiang-tennis/01.jpg",
        "/images/products/tennis/tiang-tennis/02.jpg",
      ],
    },
  },
  {
    id: "prod-chair-volleyball",
    name: "Kursi Wasit Voli",
    slug: "kursi-volley-wasit",
    sport: "official-equipment",
    type: "referee-chair",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/official-equipment/kursi-volley-wasit/01.jpg",
        "/images/products/official-equipment/kursi-volley-wasit/02.jpg",
      ],
    },
  },
  {
    id: "prod-chair-badminton",
    name: "Kursi Wasit Badminton",
    slug: "kursi-badminton-wasit",
    sport: "official-equipment",
    type: "referee-chair",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/official-equipment/kursi-badminton-wasit/01.jpg",
        "/images/products/official-equipment/kursi-badminton-wasit/02.jpg",
      ],
    },
  },
];

export const sportLabels: Record<SportCategory, string> = {
  basketball: "Basketball",
  volleyball: "Volleyball",
  football: "Sepak Bola",
  badminton: "Badminton",
  padel: "Padel",
  tennis: "Tenis",
  "official-equipment": "Official Equipment",
};
