export type SportCategory =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "official-equipment"
  | "referee-chair-badminton"
  | "referee-chair-volleyball";

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
      thumb: "/images/products/basketball/ring-basket-fiba/portable/versi_1/2.2.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/versi_1/2.2.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_1/3.3.png",
      ],
    },
    description: {
      intro:
        "Pilihan tepat untuk sekolah yang butuh fleksibilitas — mudah dipindah saat ada kegiatan lain, dengan konstruksi kokoh dan tampilan rapi standar kompetisi.",
      details: [
        "Papan pantul akrilik premium, jernih dan tahan benturan untuk pantulan optimal",
        "Ketinggian ring dapat disesuaikan untuk berbagai jenjang usia dan kebutuhan",
        "Dilengkapi sistem roda untuk mobilitas mudah tanpa alat tambahan",
        "Pengaman body berbahan kulit sintetis berkualitas untuk keamanan pengguna",
        "Sistem pemberat stabil mencegah tiang bergeser saat digunakan intensif",
      ],
      notes: [
        "Rangka utama dari besi hollow berpenampang besar, kokoh untuk penggunaan jangka panjang",
        "Seluruh komponen menggunakan material besi pilihan dengan proses fabrikasi presisi",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
      thumb: "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-1.png",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-1.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-2.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-3.png",
        "/images/products/basketball/ring-basket-fiba/portable/versi_2/v2-4.png",
      ],
    },
    description: {
      intro:
        "Generasi terbaru ring basket portabel PFS — konstruksi lebih masif, finishing lebih premium, dan sistem stabilisasi ditingkatkan untuk performa optimal di lapangan maupun kompetisi.",
      details: [
        "Rangka besi hollow penampang lebih besar dari V1, memberikan rigiditas dan ketahanan jangka panjang yang lebih baik",
        "Sistem pemberat kapasitas lebih tinggi dengan desain base yang lebih lebar untuk stabilitas maksimal",
        "Papan pantul akrilik tebal dengan bracket penguat — tahan benturan keras dan getaran intensif",
        "Finishing cat powder coating premium, anti-karat, tahan cuaca untuk penggunaan indoor maupun semi-outdoor",
        "Mekanisme pengatur ketinggian lebih presisi dengan sistem kunci ganda untuk keamanan ekstra",
        "Sistem roda heavy-duty dengan rem pengunci, mudah dipindah namun terkunci kokoh saat digunakan",
      ],
      notes: [
        "Material besi struktural grade premium, seluruh sambungan las penuh untuk kekuatan optimal",
        "Semua komponen logam melalui proses anti-karat sebelum finishing powder coating",
        "Bobot total lebih berat dari V1 — dirancang untuk stabilitas maksimal, bukan portabilitas ringan",
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
        "Solusi permanen untuk area dengan ruang terbatas — tampilan rapi menempel di dinding tanpa mengorbankan kualitas dan standar permainan.",
      details: [
        "Sistem pemasangan dinding yang kuat, stabil, dan tidak mudah bergeser",
        "Papan pantul akrilik premium dengan kejernihan tinggi untuk visibilitas optimal",
        "Posisi ring presisi sesuai standar untuk latihan maupun pertandingan resmi",
        "Hemat ruang secara signifikan karena tidak memerlukan basis atau tiang berdiri",
      ],
      notes: [
        "Rangka utama dari besi hollow berpenampang besar untuk daya dukung maksimal",
        "Proses pemasangan menyesuaikan struktur dinding di lokasi",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Untuk lapangan yang tidak butuh dipindah — sistem tanam memberikan kestabilan tertinggi, cocok untuk sekolah, lapangan umum, dan fasilitas komunitas.",
      details: [
        "Tiang ditanam ke pondasi permanen untuk kestabilan maksimal jangka panjang",
        "Konstruksi sangat kuat untuk pemakaian intensif setiap hari",
        "Ketinggian dan posisi ring dapat disesuaikan saat proses instalasi",
        "Tahan terhadap cuaca ekstrem, cocok untuk area outdoor dan indoor",
      ],
      notes: [
        "Tiang utama dari besi pipa berdiameter besar untuk kekuatan struktural optimal",
        "Proses pemasangan pondasi menyesuaikan kondisi dan layout lapangan di lokasi",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
      thumb: "/images/products/volleyball/net-volleyball-fivb/portable/w1.1.png",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/portable/w1.1.png",
        "/images/products/volleyball/net-volleyball-fivb/portable/w2.2.png",
        "/images/products/volleyball/net-volleyball-fivb/portable/w3.3.png",
      ],
    },
    description: {
      intro:
        "Paket tiang dan net voli siap pakai — dirancang untuk kemudahan operasional harian dengan konstruksi kuat yang tetap bisa dipindah kapan pun dibutuhkan.",
      details: [
        "Paket lengkap tiang dan net, siap pasang untuk lapangan indoor maupun outdoor",
        "Sistem roda memudahkan pemindahan tiang tanpa tenaga ekstra",
        "Sistem kait pengencang net yang praktis untuk pemasangan dan pelepasan cepat",
        "Pelapis tiang berbahan kulit sintetis berkualitas untuk perlindungan dan tampilan rapi",
        "Sistem pemberat berat untuk memastikan tiang tetap stabil selama permainan",
      ],
      notes: [
        "Tiang utama dari besi pipa berdiameter besar dengan finishing tahan cuaca",
        "Seluruh komponen dirancang untuk perawatan mudah dan umur pakai yang panjang",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Untuk lapangan voli yang membutuhkan instalasi permanen — kokoh, stabil, dan siap digunakan intensif oleh sekolah, klub, maupun fasilitas umum.",
      details: [
        "Sistem tanam permanen memberikan kestabilan terbaik untuk pemakaian jangka panjang",
        "Ketinggian net dapat dikonfigurasi sesuai kategori pertandingan pria maupun wanita",
        "Sistem kait pengencang net yang presisi untuk hasil pemasangan yang konsisten",
        "Pelapis pelindung tiang dari bahan kulit sintetis berkualitas, tahan lama dan rapi",
        "Finishing tahan cuaca, cocok untuk penggunaan di area outdoor maupun indoor",
      ],
      notes: [
        "Tiang utama dari besi pipa berdiameter besar dengan sistem dudukan tanam di lantai",
        "Proses pemasangan mengikuti kondisi lokasi dan layout lapangan yang ada",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Gawang futsal konstruksi besi solid — tersedia dalam pilihan permanen dan portable, siap untuk kebutuhan latihan intensif maupun pertandingan resmi.",
      details: [
        "Tersedia pilihan sistem permanen dan portable sesuai kebutuhan lapangan",
        "Dimensi gawang mengikuti standar lapangan futsal resmi",
        "Sistem sambungan bongkar pasang yang praktis dan mudah dioperasikan",
        "Konstruksi kokoh untuk pemakaian intensif di sekolah dan fasilitas umum",
        "Finishing tahan cuaca untuk penggunaan outdoor maupun indoor",
      ],
      notes: [
        "Seluruh komponen dari besi pipa berkualitas dengan proses fabrikasi presisi",
        "Konfigurasi dan ukuran dapat disesuaikan dengan kondisi lapangan",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Tiang badminton untuk kebutuhan latihan hingga pertandingan — konstruksi solid, mudah dioperasikan harian, dan rapi untuk semua jenis lapangan.",
      details: [
        "Mengacu pada standar dimensi lapangan badminton resmi",
        "Sistem roda memudahkan pemindahan tiang antar lapangan tanpa usaha ekstra",
        "Sistem kait pengencang net yang praktis untuk operasional harian yang efisien",
        "Pelapis tiang berbahan kulit sintetis berkualitas untuk perlindungan dan tampilan profesional",
        "Sistem pemberat stabil mencegah tiang bergeser saat permainan berlangsung",
      ],
      notes: [
        "Tiang utama dari besi pipa berkualitas dengan finishing tahan lama",
        "Dapat disesuaikan untuk kebutuhan sekolah, klub, atau fasilitas olahraga",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Tiang padel dengan konstruksi presisi untuk lapangan modern — tampilan bersih, pemasangan akurat, dan material solid yang mendukung estetika venue padel profesional.",
      details: [
        "Ketinggian tiang sesuai standar permainan padel resmi",
        "Sistem kait pengencang net di posisi tengah untuk ketegangan net yang optimal",
        "Penopang bawah yang kokoh memastikan tiang berdiri stabil di segala kondisi",
        "Pengaman body berbahan kulit sintetis berkualitas untuk keamanan pemain",
        "Desain ramping dan rapi yang sesuai dengan estetika lapangan padel modern",
      ],
      notes: [
        "Rangka dari besi hollow berpenampang solid dengan proses fabrikasi presisi",
        "Dapat dikustom sesuai konsep dan layout lapangan padel Anda",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
        "Tiang tenis kokoh dan presisi — tersedia dalam pilihan portable maupun tanam, siap mendukung lapangan tenis dari level latihan hingga pertandingan resmi.",
      details: [
        "Tersedia pilihan portable dan tanam untuk fleksibilitas sesuai kebutuhan lapangan",
        "Ketinggian tiang sesuai standar net tenis resmi ITF",
        "Sistem roda memudahkan mobilitas untuk varian portable",
        "Sistem kait pengencang net yang presisi untuk ketegangan net yang konsisten",
        "Sistem pemberat berat memastikan stabilitas tiang selama pertandingan berlangsung",
      ],
      notes: [
        "Tiang utama dan penopang dari besi pipa berkualitas dengan fabrikasi presisi",
        "Konstruksi dirancang untuk penggunaan intensif jangka panjang",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
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
      gallery: [
        "/images/products/official-equipment/kursi-volley-wasit/01.jpg",
        "/images/products/official-equipment/kursi-volley-wasit/02.jpg",
      ],
    },
    description: {
      intro:
        "Kursi wasit voli yang memberikan posisi pengawasan optimal — kokoh, nyaman untuk digunakan sepanjang pertandingan, dan tampil profesional di pinggir lapangan.",
      details: [
        "Posisi duduk tinggi memberikan sudut pandang ideal untuk wasit selama pertandingan",
        "Dudukan dan sandaran berlapisan busa tebal dengan kulit sintetis berkualitas untuk kenyamanan maksimal",
        "Landasan kaki wasit yang luas untuk posisi berdiri yang aman dan stabil",
        "Rangka kokoh mampu menopang beban berat tanpa goyah",
        "Warna dapat disesuaikan dengan identitas venue atau klub",
      ],
      notes: [
        "Rangka dari besi pipa dan hollow berkualitas dengan konstruksi yang stabil",
        "Seluruh komponen dirancang untuk keawetan jangka panjang dengan perawatan minimal",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
    },
  },
  {
    id: "prod-chair-badminton",
    name: "Kursi Wasit Badminton",
    slug: "kursi-badminton-wasit",
    sport: "referee-chair-badminton",
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
    description: {
      intro:
        "Kursi wasit badminton dengan ketinggian ideal untuk pengawasan lapangan — kokoh, nyaman sepanjang pertandingan, dan tampilan rapi untuk venue indoor maupun outdoor.",
      details: [
        "Posisi duduk di ketinggian ideal untuk visibilitas penuh selama pertandingan",
        "Rangka lebar dan stabil memberikan keseimbangan yang baik di segala jenis lantai",
        "Konstruksi kokoh mampu menopang beban dengan aman dalam jangka panjang",
        "Cocok untuk penggunaan di lapangan indoor maupun outdoor",
        "Warna dapat disesuaikan dengan identitas lapangan atau institusi",
      ],
      notes: [
        "Rangka dari besi pipa berkualitas dengan proses fabrikasi yang rapi dan presisi",
        "Dirancang untuk keawetan dan kemudahan perawatan dalam penggunaan rutin",
        "Spesifikasi teknis lengkap tersedia saat konsultasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan — hubungi kami untuk penawaran.",
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
  "referee-chair-badminton": "Kursi Wasit Badminton",
  "referee-chair-volleyball": "Kursi Wasit Voli",
};
