export type SportCategory =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "official-equipment";

export type ComplianceStandard =
  | "FIBA"
  | "FIVB"
  | "BWF"
  | "FIFA"
  | "ITF"
  | "FIP";

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
        "Ring Basket Portable ini cocok untuk kebutuhan Sekolah SD, SMP, hingga SMA/SMK. Desainnya kokoh, aman, dan tetap fleksibel untuk dipindahkan sesuai kebutuhan.",
      details: [
        "Papan pantul akrilik bening Ketebalan 8mm",
        "Tinggi ring dapat diatur 260cm - 290cm",
        "Ukuran papan pantul Tinggi 80cm x Lebar 120cm",
        "Jarak dari ring ke lantai tinggi 260cm",
        "Dilengkapi dengan 4 roda (2 mati, 2 hidup)",
      ],
      notes: [
        "Rangka menggunakan besi hollow 40cm x 60cm dan 20cm x 40cm",
        "Rangka utama menggunakan besi hollow 75cm x 75cm",
        "Dibagian bawah dilengkapi pengaman body dengan berbahan busa kalap kulit dengan ketebalan 3cm (warna custom)",
        "Kotak pemberat 20cm x30cm x 40cm (2 kotak per tiang) dengan total beban 120 kg.",
      ],
      closing: "Warna Dapat Request",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-dinding",
    name: "Ring Basket FIBA Dinding",
    slug: "ring-basket-fiba-tanam-dinding",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Dinding",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb:
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/02.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/03.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/04.jpg",
      ],
    },
    description: {
      intro:
        "Ring Basket Dinding cocok untuk area dengan ruang terbatas dan kebutuhan lapangan permanen yang rapi.",
      details: [
        "Sistem pemasangan dinding yang kuat dan stabil",
        "Papan pantul akrilik bening 10mm",
        "Posisi ring presisi untuk latihan dan pertandingan",
        "Hemat ruang karena tanpa basis roda",
      ],
      notes: [
        "Rangka utama menggunakan material besi hollow ukuran 50cm x 50cm",
        "Proses pemasangan menyesuaikan struktur dinding di lokasi.",
      ],
      closing:
        "Warna, ukuran, dan titik pemasangan bisa disesuaikan kebutuhan proyek.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-tanah",
    name: "Ring Basket FIBA Tanam",
    slug: "ring-basket-fiba-tanam-tanah",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Tanam",
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
        "Ring Basket Tanam cocok untuk lapangan outdoor dan indoor yang membutuhkan sistem permanen, kokoh, dan tahan lama.",
      details: [
        "Tiang utama ditanam ke pondasi/angkur permanen untuk kestabilan maksimal",
        "Konstruksi kuat untuk pemakaian intensif",
        "Ukuran dan tinggi ring bisa disesuaikan kebutuhan lapangan pada saat pemasangan",
        "Cocok untuk sekolah, lapangan umum, dan area komunitas",
      ],
      notes: [
        "Material besi menggunakan pipa 6 inc",
        "Pemasangan pondasi/angkur mengikuti kondisi lokasi dan layout lapangan.",
      ],
      closing:
        "Menerima custom warna, spesifikasi, dan survey lokasi sebelum instalasi.",
    },
  },
  {
    id: "prod-volleyball-net-fivb",
    name: "Tiang Voly Portable",
    slug: "net-volleyball-fivb",
    sport: "volleyball",
    type: "net-and-post-system",
    variant: "portable",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/products/volleyball/net-volleyball-fivb/portable/01.jpg",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/portable/01.jpg",
        "/images/products/volleyball/net-volleyball-fivb/portable/02.jpg",
        "/images/products/volleyball/net-volleyball-fivb/portable/03.jpg",
      ],
    },
    description: {
      intro:
        "Tiang Voly Portable ini dirancang untuk latihan dan pertandingan dengan konstruksi kuat serta tampilan rapi.",
      details: [
        "Paket tiang dan net siap pasang untuk lapangan indoor maupun outdoor",
        "Paket tiang voli portable ini menggunakan material besi, dengan tiang utama berupa pipa berdiameter 3 inci.",
        "Tiang penyangga menggunakan material besi berupa pipa berdiameter 1,5 inci.",
        "Tiang utama dilengkapi dengan 1 kait yang berfungsi sebagai pengencang net.",
        "bagian tiang bawah terdapat penopang tiang menggunakan material besi hollow berukuran 10cm x 10cm",
        "ukuran kotak pemberat 20cm x 50cm x 60cm",
        "Dilengkapi 2 buah roda berukuran 6 inci masing-masing tiang memiliki beban berat 90kg - 100kg berisi cor-ran",
        "Dilengkpai dengan pelapis tiang atau sarung berbahan kulit kalap awet dan tahan lama (warna dapat request)",
      ],
      notes: [
        "Material utama menggunakan besi tebal dengan finishing tahan cuaca.",
        "Komponen dirancang agar perawatan mudah dan umur pakai panjang.",
      ],
      closing:
        "Menerima penyesuaian ukuran dan konfigurasi sesuai kebutuhan lapangan.",
    },
  },
  {
    id: "prod-volleyball-net-fivb-tanam",
    name: "Tiang Voly Tanam",
    slug: "net-volleyball-fivb-tanam",
    sport: "volleyball",
    type: "net-and-post-system",
    variant: "tanam",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/products/volleyball/net-volleyball-fivb/tanam/01.jpg",
      gallery: ["/images/products/volleyball/net-volleyball-fivb/tanam/01.jpg"],
    },
    description: {
      intro:
        "Tiang Voly Tanam cocok untuk lapangan dengan kebutuhan instalasi permanen yang kokoh dan stabil.",
      details: [
        "Sistem tanam permanen untuk kestabilan pemakaian jangka panjang",
        "Konstruksi besi kuat untuk penggunaan rutin sekolah, klub, dan fasilitas umum",
        "Ketinggian net dari lantai dapat diatur, yaitu 243 cm untuk kategori pria dan 235 cm untuk kategori wanita.",
        "Finishing rapi dan tahan cuaca untuk penggunaan outdoor",
      ],
      notes: [
        "Tiang utama menggunakan material besi pipa berdiameter 3 inci dan dilengkapi 1 kait pengencang net di bagian tengah",
        "Dilengkapi pipa shock yang berfungsi sebagai dudukan tiang yang ditanam di lantai atau tanah, serta penutup lubang.",
        "Tiang utama dilengkapi padding pelindung berbahan kulit atau kulit sintetis yang kuat dan tahan lama",
        "Proses pemasangan mengikuti kondisi lokasi dan layout lapangan.",
      ],
      closing:
        "Menerima penyesuaian spesifikasi dan survei lokasi sebelum instalasi.",
    },
  },
  {
    id: "prod-football-goal-fifa",
    name: "Tiang gawang futsal",
    slug: "goal-post-11v11",
    sport: "football",
    type: "goal-post",
    variant: "Gawang",
    standards: ["FIFA"],
    sportTags: ["football"],
    images: {
      thumb: "/images/products/football/goal-post-11v11/gawang/01.jpg",
      gallery: [
        "/images/products/football/goal-post-11v11/gawang/01.jpg",
        "/images/products/football/goal-post-11v11/gawang/02.jpg",
        "/images/products/football/goal-post-11v11/gawang/03.jpg",
        "/images/products/football/goal-post-11v11/gawang/04.jpg",
        "/images/products/football/goal-post-11v11/gawang/05.jpg",
        "/images/products/football/goal-post-11v11/gawang/06.jpg",
        "/images/products/football/goal-post-11v11/gawang/07.jpg",
        "/images/products/football/goal-post-11v11/gawang/08.jpg",
        "/images/products/football/goal-post-11v11/gawang/09.jpg",
      ],
    },
    description: {
      intro:
        "Gawang sepak bola dirancang untuk kebutuhan pertandingan dan latihan dengan konstruksi kokoh serta presisi dimensi.",
      details: [
        "Tiang permanen atau portable tersedia di PSF",
        "Sistem bongkar pasang memudahkan pengguna",
        "Tiang Gawang futsal 1 set (2 Gawang) dengan ukuran tinggi tiang 2 meter dan lebar 3 meter",
        "Tiang futsal panjang belakang bagian atas 40cm dan bawah berukuran 60cm, menggunakan material pipa 2,5 inci dan 1,5 inci",
        "Ukuran gawang mengikuti standar untuk lapangan penuh",
        "Rangka besi kuat untuk pemakaian intensif di sekolah dan fasilitas umum",
        "Sistem sambungan rapi untuk menjaga stabilitas struktur",
        "Cocok untuk penggunaan outdoor/indoor dengan finishing tahan cuaca",
      ],
      notes: [
        "Material utama menggunakan besi pipa dengan proses fabrikasi presisi.",
        "Konfigurasi pemasangan dapat disesuaikan kondisi lapangan.",
      ],
      closing:
        "Menerima penyesuaian spesifikasi, warna, dan kebutuhan instalasi proyek.",
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
