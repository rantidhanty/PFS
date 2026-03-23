export type SportCategory =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "official-equipment"
  | "referee-chair"
  | "referee-chair-badminton"
  | "referee-chair-volleyball"
  | "referee-chair-tennis";

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
    name: "Ring Basket Portabel PFS V1",
    slug: "ring-basket-fiba-portable",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Portable",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb:
        "/images/products/basketball/ring-basket-fiba/portable/versi_1/2.2.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/versi_1/2.2.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_1/3.3.png",
      ],
    },
    description: {
      intro:
        "Ring basket portabel kokoh — mudah dipindah, rapi standar kompetisi.",
      details: [
        "Papan akrilik premium, tahan benturan",
        "Ketinggian ring adjustable semua usia",
        "Roda built-in, pindah tanpa alat",
        "Pengaman body kulit sintetis",
        "Pemberat stabil anti-geser",
      ],
      notes: [
        "Besi hollow penampang besar",
        "Fabrikasi presisi, material pilihan",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan konfigurasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-portable-v2",
    name: "Ring Basket Portabel PFS V2",
    slug: "ring-basket-portabel-pfs-v2",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Portable",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb:
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-1.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-1.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-2.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-3.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-4.png",
      ],
    },
    description: {
      intro:
        "Versi terbaru — konstruksi lebih masif, stabilisasi lebih kuat dari V1.",
      details: [
        "Besi hollow penampang lebih besar dari V1",
        "Base lebih lebar, kapasitas pemberat lebih tinggi",
        "Papan akrilik tebal dengan bracket penguat",
        "Powder coating premium, anti-karat",
        "Mekanisme ketinggian kunci ganda",
        "Roda heavy-duty dengan rem pengunci",
      ],
      notes: [
        "Material struktural grade premium",
        "Las penuh seluruh sambungan",
        "Bobot lebih berat dari V1 — prioritas stabilitas",
      ],
      closing:
        "Tersedia dalam konfigurasi warna custom — hubungi admin PFS untuk penawaran dan jadwal produksi.",
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
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/5.5.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/5.5.png",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/6.6.png",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/7.7.png",
      ],
    },
    description: {
      intro:
        "Solusi permanen untuk ruang terbatas — terpasang di dinding, hemat area lantai.",
      details: [
        "Pemasangan dinding kuat, tidak bergeser",
        "Papan akrilik premium, visibilitas optimal",
        "Posisi ring presisi standar FIBA",
        "Tidak perlu tiang — hemat ruang signifikan",
      ],
      notes: [
        "Besi hollow penampang besar",
        "Pemasangan menyesuaikan struktur dinding",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna, konfigurasi, dan titik pemasangan dapat disesuaikan — hubungi kami untuk penawaran.",
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
      thumb: "/images/products/basketball/ring-basket-fiba/tanam-tanah/1.1.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/1.1.png",
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/2.2.png",
      ],
    },
    description: {
      intro:
        "Untuk lapangan permanen — kestabilan tertinggi, tahan pemakaian intensif harian.",
      details: [
        "Ditanam ke pondasi permanen",
        "Konstruksi sangat kuat untuk pemakaian intensif",
        "Ketinggian dikonfigurasi saat instalasi",
        "Tahan cuaca ekstrem, indoor maupun outdoor",
      ],
      notes: [
        "Besi pipa berdiameter besar",
        "Pondasi menyesuaikan kondisi lapangan",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Tersedia survei lokasi sebelum instalasi — hubungi kami untuk penawaran.",
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
      thumb:
        "/images/products/volleyball/net-volleyball-fivb/portable/w1.1.png",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/portable/w1.1.png",
        "/images/products/volleyball/net-volleyball-fivb/portable/w2.2.png",
        "/images/products/volleyball/net-volleyball-fivb/portable/w3.3.png",
      ],
    },
    description: {
      intro:
        "Paket tiang dan net voli siap pakai — kuat, bisa dipindah kapan pun.",
      details: [
        "Paket lengkap tiang + net, siap pasang",
        "Roda built-in untuk pemindahan mudah",
        "Sistem kait net praktis, pasang-lepas cepat",
        "Pelapis kulit sintetis berkualitas",
        "Pemberat berat, stabil selama permainan",
      ],
      notes: [
        "Besi pipa berdiameter besar",
        "Finishing tahan cuaca",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Konfigurasi dan warna dapat disesuaikan — hubungi kami untuk penawaran.",
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
      thumb: "/images/products/volleyball/net-volleyball-fivb/tanam/1.1.png",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/tanam/1.1.png",
        "/images/products/volleyball/net-volleyball-fivb/tanam/2.2.png",
      ],
    },
    description: {
      intro:
        "Instalasi permanen untuk lapangan voli — kokoh, stabil, siap digunakan intensif.",
      details: [
        "Tanam permanen, kestabilan jangka panjang",
        "Ketinggian net sesuai kategori pria/wanita",
        "Kait net presisi, hasil konsisten",
        "Pelindung tiang kulit sintetis berkualitas",
        "Finishing tahan cuaca indoor/outdoor",
      ],
      notes: [
        "Besi pipa berdiameter besar",
        "Pemasangan menyesuaikan lokasi",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Tersedia survei lokasi sebelum instalasi — hubungi kami untuk penawaran.",
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
      thumb: "/images/products/football/goal-post-11v11/gawang/1.1.png",
      gallery: [
        "/images/products/football/goal-post-11v11/gawang/1.1.png",
        "/images/products/football/goal-post-11v11/gawang/2.2.png",
        "/images/products/football/goal-post-11v11/gawang/3.3.png",
        "/images/products/football/goal-post-11v11/gawang/4.4.png",
      ],
    },
    description: {
      intro:
        "Gawang futsal besi solid — tersedia permanen dan portable, siap kompetisi.",
      details: [
        "Pilihan sistem permanen atau portable",
        "Dimensi standar lapangan futsal resmi",
        "Sistem bongkar pasang praktis",
        "Konstruksi kokoh pemakaian intensif",
        "Finishing tahan cuaca indoor/outdoor",
      ],
      notes: [
        "Besi pipa berkualitas, fabrikasi presisi",
        "Ukuran dapat dikustomisasi",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-badminton-post-bwf",
    name: "Tiang Net Badminton Portable BWF",
    slug: "court-post-badminton",
    sport: "badminton",
    type: "court-post",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/products/badminton/portable/w.1.1.jpg",
      gallery: [
        "/images/products/badminton/portable/w.1.1.jpg",
        "/images/products/badminton/portable/w2.2.jpg",
        "/images/products/badminton/portable/w3.3.jpg",
        "/images/products/badminton/portable/w4.4.jpg",
      ],
    },
    description: {
      intro:
        "Tiang badminton solid untuk latihan hingga pertandingan — mudah operasikan harian.",
      details: [
        "Mengacu standar dimensi BWF",
        "Roda built-in, pindah antar lapangan mudah",
        "Kait net praktis untuk operasional harian",
        "Pelapis kulit sintetis berkualitas",
        "Pemberat stabil anti-geser",
      ],
      notes: [
        "Besi pipa berkualitas",
        "Untuk sekolah, klub, fasilitas olahraga",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan konfigurasi dapat disesuaikan — hubungi kami untuk penawaran.",
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
      thumb: "/images/products/padel/tiang-padel/1.1.png",
      gallery: [
        "/images/products/padel/tiang-padel/1.1.png",
        "/images/products/padel/tiang-padel/2.2.png",
        "/images/products/padel/tiang-padel/3.3.png",
        "/images/products/padel/tiang-padel/4.4.png",
        "/images/products/padel/tiang-padel/5.5.png",
        "/images/products/padel/tiang-padel/6.6.png",
        "/images/products/padel/tiang-padel/7.7.png",
      ],
    },
    description: {
      intro:
        "Tiang padel presisi untuk lapangan modern — rapi, solid, estetika profesional.",
      details: [
        "Ketinggian sesuai standar padel resmi",
        "Kait net di tengah, ketegangan optimal",
        "Penopang bawah kokoh di segala kondisi",
        "Pengaman kulit sintetis berkualitas",
        "Desain ramping sesuai estetika padel",
      ],
      notes: [
        "Besi hollow solid, fabrikasi presisi",
        "Dapat dikustom sesuai layout lapangan",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Konsultasikan konsep lapangan Anda — kami siap berikan penawaran terbaik.",
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
    description: {
      intro:
        "Tiang tenis presisi — tersedia portable maupun tanam, standar ITF.",
      details: [
        "Pilihan portable dan tanam",
        "Ketinggian sesuai standar ITF",
        "Roda built-in untuk varian portable",
        "Kait net presisi, ketegangan konsisten",
        "Pemberat berat, stabil saat pertandingan",
      ],
      notes: [
        "Besi pipa berkualitas, fabrikasi presisi",
        "Untuk penggunaan intensif jangka panjang",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Konsultasikan kebutuhan lapangan tenis Anda — kami siap berikan penawaran terbaik.",
    },
  },
  {
    id: "prod-chair-volleyball",
    name: "Kursi Wasit Voli",
    slug: "kursi-volley-wasit",
    sport: "referee-chair-volleyball",
    type: "referee-chair",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [],
    },
    description: {
      intro:
        "Kursi wasit voli — posisi pengawasan optimal, kokoh dan nyaman sepanjang pertandingan.",
      details: [
        "Posisi duduk tinggi, sudut pandang ideal",
        "Busa tebal + kulit sintetis, nyaman maksimal",
        "Landasan kaki luas, posisi berdiri stabil",
        "Rangka kokoh, tidak goyah under load",
        "Warna dapat disesuaikan",
      ],
      notes: [
        "Besi pipa dan hollow berkualitas",
        "Komponen tahan lama, perawatan minimal",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-chair-badminton",
    name: "Kursi Wasit Badminton PFS V1",
    slug: "kursi-badminton-wasit",
    sport: "referee-chair-badminton",
    type: "referee-chair",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb:
        "/images/products/kursi-wasit/kursi-badminton-wasit/V1/kursi%20Bandminton%20V01.png",
      gallery: [
        "/images/products/kursi-wasit/kursi-badminton-wasit/V1/kursi%20Bandminton%20V01.png",
        "/images/products/kursi-wasit/kursi-badminton-wasit/V1/kursi%20Bandminton%20V02.png",
      ],
    },
    description: {
      intro:
        "Kursi wasit badminton — visibilitas penuh lapangan, kokoh dan nyaman harian.",
      details: [
        "Ketinggian ideal, visibilitas penuh pertandingan",
        "Rangka lebar dan stabil di segala lantai",
        "Konstruksi kokoh untuk beban jangka panjang",
        "Cocok indoor dan outdoor",
        "Warna dapat disesuaikan",
      ],
      notes: [
        "Besi pipa, fabrikasi rapi dan presisi",
        "Dirancang untuk perawatan mudah",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-chair-badminton-v2",
    name: "Kursi Wasit Badminton PFS V2",
    slug: "kursi-badminton-wasit-v2",
    sport: "referee-chair-badminton",
    type: "referee-chair",
    variant: "Stainless",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/products/kursi-wasit/kursi-badminton-wasit/V2/kursi%20badminton%20PFS%201.png",
      gallery: [
        "/images/products/kursi-wasit/kursi-badminton-wasit/V2/kursi%20badminton%20PFS%201.png",
        "/images/products/kursi-wasit/kursi-badminton-wasit/V2/kursi%20badminton%20PFS%202.png",
      ],
    },
    description: {
      intro:
        "Kursi wasit V2 — rangka stainless steel, tahan karat tanpa pengecatan ulang.",
      details: [
        "Ketinggian ideal, visibilitas penuh pertandingan",
        "Stainless anti-karat, tahan jangka panjang",
        "Permukaan mudah dibersihkan, tampil rapi",
        "Busa tebal + kulit sintetis, nyaman maksimal",
        "Las presisi di setiap titik sambungan",
        "Cocok indoor dan outdoor",
      ],
      notes: [
        "Stainless steel grade 304",
        "Finishing poles natural metalik, tanpa cat",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Spesifikasi dimensi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-chair-badminton-v3",
    name: "Kursi Wasit Badminton PFS V3",
    slug: "kursi-badminton-wasit-v3",
    sport: "referee-chair-badminton",
    type: "referee-chair",
    variant: "Stainless",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/products/kursi-wasit/kursi-badminton-wasit/V3/kursi%20badminton%20PFS%203.png",
      gallery: [
        "/images/products/kursi-wasit/kursi-badminton-wasit/V3/kursi%20badminton%20PFS%203.png",
        "/images/products/kursi-wasit/kursi-badminton-wasit/V3/kursi%20badminton%20PFS%204.png",
      ],
    },
    description: {
      intro:
        "Kursi wasit V3 — rangka stainless steel, modern dan tahan karat untuk pemakaian intensif.",
      details: [
        "Ketinggian ideal, visibilitas penuh pertandingan",
        "Stainless anti-karat, tahan jangka panjang",
        "Permukaan mudah dibersihkan, tampil rapi",
        "Busa tebal + kulit sintetis, nyaman maksimal",
        "Las presisi di setiap titik sambungan",
        "Cocok indoor dan outdoor",
      ],
      notes: [
        "Stainless steel grade 304",
        "Finishing poles natural metalik, tanpa cat",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Spesifikasi dimensi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-chair-tennis",
    name: "Kursi Wasit Tenis",
    slug: "kursi-wasit-tenis",
    sport: "referee-chair-tennis",
    type: "referee-chair",
    standards: ["ITF"],
    sportTags: ["tennis"],
    images: {
      thumb:
        "/images/products/kursi-wasit/kursi-wasit-tenis/kursi%20tenis%201.png",
      gallery: [
        "/images/products/kursi-wasit/kursi-wasit-tenis/kursi%20tenis%201.png",
        "/images/products/kursi-wasit/kursi-wasit-tenis/kursi%20tenis%202.png",
      ],
    },
    description: {
      intro:
        "Kursi wasit tenis — posisi tinggi optimal, nyaman sepanjang pertandingan.",
      details: [
        "Posisi tinggi, sudut pandang ideal",
        "Rangka besi pipa kokoh, aman under load",
        "Busa tebal + penutup berkualitas",
        "Tangga akses aman dan stabil",
        "Cocok indoor dan outdoor",
        "Warna dapat disesuaikan",
      ],
      notes: [
        "Besi pipa, fabrikasi rapi dan presisi",
        "Dirancang untuk perawatan mudah",
        "Spesifikasi via konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-accessories-net-voli",
    name: "Net Voli Standar",
    slug: "net-voli-standar",
    sport: "official-equipment",
    type: "net",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [],
    },
    description: {
      intro:
        "Net voli nilon berkualitas — ukuran standar FIVB, tahan lama untuk kompetisi dan latihan.",
      details: [
        "Ukuran FIVB: 9,5m × 1m",
        "Nilon anti-putus, tahan jangka panjang",
        "Tali atas-bawah diperkuat",
        "Pita putih 5cm sesuai regulasi",
        "Cocok indoor dan outdoor",
      ],
      notes: [
        "Tersedia kelas latihan dan kompetisi",
        "Kompatibel dengan tiang voli PFS",
        "Stok dan spesifikasi via WhatsApp",
      ],
      closing:
        "Hubungi kami untuk konsultasi kebutuhan net dan kelengkapan lapangan voli Anda.",
    },
  },
  {
    id: "prod-accessories-net-badminton",
    name: "Net Badminton Standar",
    slug: "net-badminton-standar",
    sport: "official-equipment",
    type: "net",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [],
    },
    description: {
      intro:
        "Net badminton standar BWF — rajutan halus, tegangan konsisten untuk latihan dan kompetisi.",
      details: [
        "Ukuran BWF: 6,1m × 76cm",
        "Lubang jaring 19–20mm, rajutan nilon halus",
        "Pita kepala putih 75mm di bagian atas",
        "Tali pinggir kuat untuk tiang standar",
        "Ringan, mudah dipasang dan digulung",
      ],
      notes: [
        "Untuk lapangan tunggal dan ganda",
        "Kompatibel dengan tiang badminton PFS",
        "Stok dan spesifikasi via WhatsApp",
      ],
      closing:
        "Hubungi kami untuk konsultasi paket tiang dan net badminton lengkap.",
    },
  },
  {
    id: "prod-accessories-net-futsal",
    name: "Jaring Gawang Futsal",
    slug: "jaring-gawang-futsal",
    sport: "official-equipment",
    type: "net",
    standards: ["FIFA"],
    sportTags: ["football"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [],
    },
    description: {
      intro:
        "Jaring gawang futsal PE berkualitas — kuat menahan tembakan keras, standar FIFA.",
      details: [
        "PE 3mm, ketahanan optimal",
        "Ukuran standar: 3m × 2m × 1m",
        "Anyaman rapat, bola tidak tembus",
        "Warna putih kontras terlihat di lapangan",
        "Tahan cuaca indoor dan outdoor",
      ],
      notes: [
        "Kompatibel dengan gawang futsal PFS",
        "Tersedia kelas standar dan kompetisi",
        "Stok dan spesifikasi via WhatsApp",
      ],
      closing:
        "Hubungi kami untuk informasi harga dan paket gawang beserta jaring.",
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
  "referee-chair": "Kursi Wasit",
  "referee-chair-badminton": "Kursi Wasit Badminton",
  "referee-chair-volleyball": "Kursi Wasit Voli",
  "referee-chair-tennis": "Kursi Wasit Tenis",
};
