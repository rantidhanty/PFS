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

export type ProductPrice =
  | { type: "fixed"; base: number }
  | { type: "from"; base: number }
  | { type: "contact" };

export const DISCOUNT_RATE = 0.03;

export function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function getDiscountedPrice(base: number): number {
  return base * (1 - DISCOUNT_RATE);
}

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
  price?: ProductPrice;
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
    price: { type: "from", base: 7499000 },
    description: {
      intro:
        "Ring basket portabel standar FIBA buatan ProFabric Steel Bekasi dengan konstruksi kokoh dan sistem roda built-in. Dirancang untuk kemudahan mobilitas tanpa mengorbankan stabilitas sehingga cocok untuk sekolah, GOR, dan fasilitas olahraga multifungsi.",
      details: [
        "Memenuhi standar FIBA sehingga sesuai untuk pertandingan resmi maupun latihan rutin sehari-hari",
        "Papan akrilik premium tahan benturan dengan visibilitas optimal dari segala sisi lapangan",
        "Ketinggian ring dapat diatur untuk menyesuaikan usia dan kebutuhan sehingga cocok untuk semua kalangan",
        "Dilengkapi roda built-in sehingga mudah dipindahkan ke berbagai posisi lapangan tanpa alat tambahan",
        "Sistem pemberat yang stabil mencegah tiang bergeser saat digunakan secara intensif",
        "Pelapis kulit sintetis berkualitas pada bagian badan tiang untuk keamanan pemain saat berada di dekat tiang",
        "Warna dan konfigurasi dapat dikustomisasi sesuai kebutuhan sekolah atau fasilitas olahraga",
      ],
      notes: [
        "Besi hollow penampang besar fabrikasi presisi",
        "Material pilihan dengan kualitas terjamin",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Hubungi admin PFS untuk konsultasi spesifikasi, estimasi ongkir, dan penawaran terbaik.",
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
    price: { type: "from", base: 12499000 },
    description: {
      intro:
        "Ring basket portabel versi terbaru buatan ProFabric Steel Bekasi dengan konstruksi lebih masif dan stabilisasi lebih kuat dari V1. Cocok untuk fasilitas olahraga yang membutuhkan peralatan profesional dengan daya tahan tinggi untuk pemakaian intensif jangka panjang.",
      details: [
        "Besi hollow berpenampang lebih besar dari V1 sehingga menghasilkan konstruksi yang lebih kokoh dan stabil",
        "Base yang lebih lebar dengan kapasitas pemberat lebih tinggi untuk mencegah pergerakan saat digunakan intensif",
        "Papan akrilik tebal dilengkapi bracket penguat untuk ketahanan maksimal dari benturan bola",
        "Powder coating premium anti karat yang menjaga penampilan tetap baik dalam jangka panjang",
        "Mekanisme ketinggian dengan kunci ganda untuk keamanan saat penyesuaian posisi ring",
        "Roda heavy-duty dengan rem pengunci yang kuat memudahkan mobilitas sekaligus menjaga posisi tiang tetap stabil",
      ],
      notes: [
        "Material struktural grade premium",
        "Las penuh seluruh sambungan untuk kekuatan maksimal",
        "Bobot lebih berat dari V1 dengan prioritas stabilitas",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Tersedia dalam konfigurasi warna custom. Hubungi admin PFS untuk penawaran dan jadwal produksi.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-dinding",
    name: "Ring Basket Dinding",
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
    price: { type: "from", base: 4499000 },
    description: {
      intro:
        "Ring basket dinding standar FIBA buatan ProFabric Steel Bekasi sebagai solusi permanen untuk ruang terbatas. Dipasang langsung ke dinding tanpa memerlukan tiang sehingga menghemat area lantai secara signifikan dan cocok untuk gymnasium sekolah, aula olahraga, dan ruang indoor yang terbatas.",
      details: [
        "Pemasangan langsung ke dinding dengan sistem pengikat kuat sehingga ring tidak bergeser saat digunakan",
        "Papan akrilik premium dengan visibilitas optimal yang memudahkan pemain dan penonton memantau jalannya permainan",
        "Posisi ring yang presisi sesuai standar FIBA untuk konsistensi permainan baik latihan maupun pertandingan",
        "Tidak memerlukan tiang sehingga menghemat ruang lantai secara signifikan dan memperluas area bermain",
        "Cocok untuk gymnasium sekolah, aula serbaguna, dan ruang olahraga indoor dengan keterbatasan ruang",
      ],
      notes: [
        "Besi hollow penampang besar fabrikasi presisi",
        "Pemasangan menyesuaikan struktur dan kondisi dinding",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Warna, konfigurasi, dan titik pemasangan dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-tanah",
    name: "Ring Basket Tanam",
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
    price: { type: "fixed", base: 12499000 },
    description: {
      intro:
        "Ring basket tanam standar FIBA buatan ProFabric Steel Bekasi untuk lapangan permanen dengan kestabilan tertinggi dan ketahanan terhadap pemakaian intensif harian. Ideal untuk sekolah, universitas, GOR, dan fasilitas olahraga yang memerlukan instalasi basket jangka panjang.",
      details: [
        "Sistem penanaman ke pondasi permanen memberikan kestabilan tertinggi yang tidak bisa diperoleh dari tiang portabel",
        "Konstruksi sangat kokoh yang dirancang untuk menahan pemakaian intensif setiap hari tanpa mengurangi keandalan",
        "Ketinggian ring dikonfigurasi saat instalasi sesuai standar FIBA untuk konsistensi pertandingan",
        "Tahan cuaca ekstrem baik indoor maupun outdoor sehingga tetap awet dalam berbagai kondisi lingkungan",
        "Besi pipa berdiameter besar yang memberikan kekuatan struktural maksimal untuk beban jangka panjang",
        "Cocok untuk lapangan basket sekolah, GOR, universitas, dan fasilitas olahraga profesional",
      ],
      notes: [
        "Besi pipa berdiameter besar fabrikasi presisi",
        "Pondasi menyesuaikan kondisi dan struktur lapangan",
        "Ready stock dan custom order tersedia",
        "Tersedia survei lokasi sebelum instalasi",
      ],
      closing:
        "Hubungi kami untuk konsultasi, survei lokasi, dan penawaran terbaik.",
    },
  },
  {
    id: "prod-volleyball-net-fivb",
    name: "Tiang Voli Portable",
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
    price: { type: "fixed", base: 5499000 },
    description: {
      intro:
        "Tiang voli portable standar FIVB buatan ProFabric Steel Bekasi dengan konstruksi kokoh dan sistem pemberat stabil. Dirancang untuk kemudahan mobilitas tanpa mengorbankan kekuatan sehingga cocok untuk GOR sekolah, komunitas, dan fasilitas olahraga multifungsi.",
      details: [
        "Memenuhi standar FIVB sehingga sesuai untuk pertandingan resmi maupun latihan rutin",
        "Dapat digunakan untuk lapangan voli dan badminton sehingga lebih efisien untuk fasilitas multifungsi",
        "Dilengkapi roda built-in untuk kemudahan memindahkan tiang tanpa alat tambahan",
        "Sistem pemberat yang cukup berat agar tiang tidak mudah bergeser saat pertandingan berlangsung",
        "Pelapis pelindung pada badan tiang untuk keamanan pemain selama aktivitas olahraga",
        "Material besi berkualitas dengan desain yang mempertimbangkan keamanan dan kenyamanan pengguna",
        "Warna dapat dikustomisasi sesuai kebutuhan sekolah atau fasilitas olahraga",
      ],
      notes: [
        "Besi pipa berkualitas fabrikasi presisi",
        "Roda built-in mobilitas mudah",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Hubungi admin PFS untuk konsultasi spesifikasi, estimasi ongkir, dan penawaran terbaik.",
    },
  },
  {
    id: "prod-volleyball-net-fivb-tanam",
    name: "Tiang Voli Tanam",
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
    price: { type: "fixed", base: 2499000 },
    description: {
      intro:
        "Tiang voli tanam standar FIVB buatan ProFabric Steel Bekasi dengan konstruksi pipa besi 3 inci dan sistem bongkar pasang praktis. Cocok untuk sekolah, fasilitas olahraga, dan perumahan baik indoor maupun outdoor.",
      details: [
        "Menggunakan pipa besi diameter 3 inci yang kuat, stabil, dan tahan lama untuk pemakaian jangka panjang",
        "Tinggi standar FIVB 243 cm untuk putra dan 235 cm untuk putri sesuai regulasi resmi",
        "Dilengkapi kait pengencang net untuk ketegangan yang presisi dan hasil yang konsisten",
        "Sistem tanam menggunakan pipa soc sehingga mudah dipasang dan dilepas sesuai kebutuhan",
        "Penutup lubang lantai berlapis pelindung agar tampilan rapi dan aman saat tidak digunakan",
        "Finishing tahan cuaca cocok untuk lapangan indoor maupun outdoor",
        "Bagian tiang dilapisi material pelindung yang awet sehingga kualitas terjaga dalam pemakaian jangka panjang",
        "Warna dapat dikustomisasi sesuai kebutuhan venue atau sekolah",
      ],
      notes: [
        "Pipa besi diameter 3 inci fabrikasi presisi",
        "Sistem tanam pipa soc bongkar pasang praktis",
        "Ready stock dan custom order tersedia",
        "Pengiriman ke seluruh Indonesia dari Bekasi",
      ],
      closing:
        "Ready stock dan melayani custom sesuai kebutuhan. Hubungi admin PFS untuk konsultasi, survei lokasi, dan penawaran terbaik.",
    },
  },
  {
    id: "prod-football-goal-fifa",
    name: "Tiang Gawang Futsal",
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
    price: { type: "fixed", base: 4499000 },
    description: {
      intro:
        "Tiang gawang futsal standar FIFA buatan ProFabric Steel Bekasi dalam 1 set berisi 2 gawang siap pakai. Konstruksi solid dengan sistem bongkar pasang praktis sehingga cocok untuk lapangan yang digunakan bergantian maupun berpindah lokasi.",
      details: [
        "1 set berisi 2 gawang dengan lebar sesuai regulasi lapangan futsal resmi standar FIFA",
        "Sistem bongkar pasang yang praktis sehingga mudah dipasang dan dibongkar kapan saja",
        "Material besi berkualitas dengan konstruksi kokoh dan tahan lama untuk pemakaian intensif",
        "Cocok untuk lapangan indoor maupun outdoor",
        "Ideal untuk sekolah, komunitas olahraga, dan penyewaan lapangan futsal",
        "Warna dan spesifikasi dapat dikustomisasi sesuai kebutuhan",
      ],
      notes: [
        "Besi berkualitas fabrikasi presisi",
        "1 set 2 gawang siap pakai",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Hubungi admin PFS untuk konsultasi spesifikasi, estimasi ongkir, dan penawaran terbaik.",
    },
  },
  {
    id: "prod-badminton-post-bwf",
    name: "Tiang Badminton Portable",
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
    price: { type: "fixed", base: 3499000 },
    description: {
      intro:
        "Tiang badminton portable standar BWF buatan ProFabric Steel Bekasi dengan konstruksi solid dan sistem roda built-in yang memudahkan mobilitas harian. Dirancang untuk GOR sekolah, klub badminton, dan fasilitas olahraga multifungsi yang membutuhkan peralatan andal setiap hari.",
      details: [
        "Mengacu pada standar dimensi BWF sehingga sesuai untuk pertandingan resmi maupun latihan harian",
        "Dilengkapi roda built-in untuk memudahkan pemindahan tiang antar lapangan tanpa memerlukan alat tambahan",
        "Sistem kait net yang praktis memudahkan pemasangan dan penyesuaian ketegangan net setiap hari",
        "Pelapis kulit sintetis berkualitas pada bagian badan tiang untuk keamanan pemain selama aktivitas olahraga",
        "Sistem pemberat yang cukup berat agar tiang tidak mudah bergeser saat pertandingan sedang berlangsung",
        "Cocok untuk lapangan tunggal maupun ganda sesuai regulasi BWF",
      ],
      notes: [
        "Besi pipa berkualitas fabrikasi presisi",
        "Cocok untuk sekolah, klub, dan fasilitas olahraga",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Warna dan konfigurasi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "fixed", base: 2499000 },
    description: {
      intro:
        "Tiang padel standar FIP buatan ProFabric Steel Bekasi dengan desain modern dan konstruksi presisi untuk lapangan padel profesional. Dirancang untuk memberikan ketegangan net yang optimal dan estetika lapangan yang rapi sesuai standar internasional.",
      details: [
        "Ketinggian sesuai standar FIP untuk konsistensi permainan dan kenyamanan pemain di lapangan padel",
        "Sistem kait net di bagian tengah untuk ketegangan yang optimal dan konsisten selama pertandingan",
        "Penopang bawah yang kokoh memastikan stabilitas tiang di segala kondisi permukaan lapangan",
        "Pelapis kulit sintetis berkualitas pada bagian badan tiang untuk keamanan pemain saat berada di dekat net",
        "Desain ramping yang rapi mencerminkan estetika lapangan padel modern dan profesional",
        "Material besi hollow solid dengan fabrikasi presisi yang menjamin ketahanan jangka panjang",
      ],
      notes: [
        "Besi hollow solid fabrikasi presisi",
        "Dapat dikustomisasi sesuai layout dan kebutuhan lapangan",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Konsultasikan kebutuhan lapangan padel Anda. Kami siap memberikan penawaran terbaik.",
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
      thumb: "/images/products/tennis/tiang-tennis/1.png",
      gallery: [
        "/images/products/tennis/tiang-tennis/1.png",
        "/images/products/tennis/tiang-tennis/2.png",
        "/images/products/tennis/tiang-tennis/3.png",
      ],
    },
    price: { type: "contact" },
    description: {
      intro:
        "Tiang tenis standar ITF buatan ProFabric Steel Bekasi tersedia dalam varian portable maupun tanam untuk lapangan tenis indoor dan outdoor. Dirancang untuk ketegangan net yang konsisten dan stabilitas tinggi selama pertandingan maupun sesi latihan intensif.",
      details: [
        "Tersedia dalam pilihan varian portable dan tanam sehingga dapat disesuaikan dengan kebutuhan lapangan",
        "Ketinggian sesuai standar ITF untuk konsistensi permainan baik pada pertandingan resmi maupun latihan",
        "Varian portable dilengkapi roda built-in yang memudahkan pemindahan tiang tanpa alat tambahan",
        "Sistem kait net yang presisi menghasilkan ketegangan net yang konsisten dari satu sesi ke sesi berikutnya",
        "Sistem pemberat yang berat memastikan tiang tetap stabil selama pertandingan berlangsung",
        "Besi pipa berkualitas dengan fabrikasi presisi yang dirancang untuk penggunaan intensif jangka panjang",
      ],
      notes: [
        "Besi pipa berkualitas fabrikasi presisi",
        "Tersedia varian portable dan tanam",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Konsultasikan kebutuhan lapangan tenis Anda. Kami siap memberikan penawaran terbaik.",
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
      thumb: "/images/products/kursi-wasit/kursi-volley-wasit/kursi wasit voly 1.png",
      gallery: [
        "/images/products/kursi-wasit/kursi-volley-wasit/kursi wasit voly 1.png",
        "/images/products/kursi-wasit/kursi-volley-wasit/kursi wasit voly 2.png",
        "/images/products/kursi-wasit/kursi-volley-wasit/kursi wasit voly 3.png",
      ],
    },
    price: { type: "fixed", base: 4499000 },
    description: {
      intro:
        "Kursi wasit voli standar FIVB buatan ProFabric Steel Bekasi dengan posisi duduk tinggi dan pandangan optimal ke seluruh lapangan. Dirancang untuk kenyamanan wasit selama pertandingan berlangsung dengan konstruksi kokoh yang mampu menahan beban jangka panjang.",
      details: [
        "Posisi duduk yang tinggi memberikan sudut pandang ideal untuk memantau seluruh lapangan secara menyeluruh",
        "Bantalan busa tebal dilapisi kulit sintetis berkualitas untuk kenyamanan wasit sepanjang pertandingan",
        "Landasan kaki yang luas memudahkan wasit berdiri dengan posisi yang stabil saat memberikan keputusan",
        "Rangka kokoh yang tidak goyah saat menopang beban penuh sehingga aman untuk pemakaian jangka panjang",
        "Konstruksi besi pipa dan hollow berkualitas yang tahan lama dengan perawatan minimal",
        "Warna dapat dikustomisasi sesuai identitas klub, sekolah, atau fasilitas olahraga",
      ],
      notes: [
        "Besi pipa dan hollow berkualitas fabrikasi presisi",
        "Komponen tahan lama dengan perawatan minimal",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "from", base: 2699000 },
    description: {
      intro:
        "Kursi wasit badminton standar BWF buatan ProFabric Steel Bekasi dengan ketinggian ideal dan visibilitas penuh lapangan. Dirancang untuk kenyamanan dan keamanan wasit selama pertandingan dengan rangka yang lebar dan stabil di berbagai jenis permukaan lantai.",
      details: [
        "Ketinggian yang ideal memberikan visibilitas penuh lapangan sehingga wasit dapat memantau permainan secara menyeluruh",
        "Rangka lebar dan stabil yang tidak goyah di berbagai jenis permukaan lantai GOR maupun lapangan outdoor",
        "Konstruksi kokoh untuk menopang beban jangka panjang tanpa mengurangi keamanan dan kenyamanan",
        "Cocok untuk penggunaan di lapangan indoor maupun outdoor sesuai kebutuhan penyelenggaraan pertandingan",
        "Warna dapat dikustomisasi sesuai identitas klub badminton, sekolah, atau fasilitas olahraga",
      ],
      notes: [
        "Besi pipa fabrikasi rapi dan presisi",
        "Dirancang untuk perawatan yang mudah",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "from", base: 4499000 },
    description: {
      intro:
        "Kursi wasit badminton V2 buatan ProFabric Steel Bekasi dengan rangka stainless steel grade 304 yang tahan karat tanpa memerlukan pengecatan ulang. Pilihan ideal untuk fasilitas olahraga yang mengutamakan ketahanan material dan tampilan modern dengan perawatan minimal.",
      details: [
        "Rangka stainless steel anti karat yang menjaga tampilan tetap bersih dan modern tanpa perlu pengecatan ulang",
        "Ketinggian yang ideal memberikan visibilitas penuh lapangan untuk pemantauan pertandingan yang menyeluruh",
        "Permukaan stainless yang mudah dibersihkan mempertahankan penampilan rapi meski digunakan setiap hari",
        "Bantalan busa tebal dilapisi kulit sintetis berkualitas untuk kenyamanan wasit sepanjang pertandingan",
        "Las presisi di setiap titik sambungan yang memastikan ketahanan struktural untuk pemakaian jangka panjang",
        "Cocok untuk penggunaan di lapangan indoor maupun outdoor karena ketahanan material stainless terhadap cuaca",
      ],
      notes: [
        "Stainless steel grade 304",
        "Finishing poles natural metalik tanpa cat",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Spesifikasi dimensi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "from", base: 12499000 },
    description: {
      intro:
        "Kursi wasit badminton V3 buatan ProFabric Steel Bekasi merupakan varian premium dengan rangka stainless steel grade 304 dan desain modern untuk fasilitas olahraga profesional. Cocok untuk GOR, pusat pelatihan, dan fasilitas badminton bertaraf kompetisi yang mengutamakan kualitas terbaik.",
      details: [
        "Rangka stainless steel anti karat yang tampil modern dan bersih tanpa memerlukan pengecatan ulang",
        "Ketinggian yang ideal memberikan visibilitas penuh lapangan untuk pengawasan pertandingan yang optimal",
        "Permukaan stainless yang mudah dibersihkan mempertahankan penampilan rapi meski digunakan setiap hari",
        "Bantalan busa tebal dilapisi kulit sintetis premium untuk kenyamanan maksimal wasit sepanjang pertandingan",
        "Las presisi di setiap titik sambungan memastikan ketahanan struktural untuk pemakaian intensif jangka panjang",
        "Cocok untuk pertandingan resmi tingkat nasional maupun latihan di GOR dan fasilitas olahraga profesional",
      ],
      notes: [
        "Stainless steel grade 304",
        "Finishing poles natural metalik tanpa cat",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Spesifikasi dimensi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "fixed", base: 4499000 },
    description: {
      intro:
        "Kursi wasit tenis standar ITF buatan ProFabric Steel Bekasi dengan posisi tinggi yang memberikan pandangan optimal ke seluruh lapangan. Dirancang untuk kenyamanan wasit sepanjang pertandingan dengan rangka kokoh dan tangga akses yang aman untuk naik turun.",
      details: [
        "Posisi duduk yang tinggi memberikan sudut pandang ideal untuk memantau seluruh lapangan tenis secara menyeluruh",
        "Rangka besi pipa kokoh yang aman menopang beban penuh tanpa goyah selama pertandingan berlangsung",
        "Bantalan busa tebal dengan penutup berkualitas untuk kenyamanan wasit dalam sesi pertandingan yang panjang",
        "Tangga akses yang aman dan stabil memudahkan wasit naik dan turun dari kursi dengan nyaman",
        "Cocok untuk pertandingan tenis indoor maupun outdoor karena konstruksi yang tahan cuaca",
        "Warna dapat dikustomisasi sesuai identitas klub tenis atau fasilitas olahraga",
      ],
      notes: [
        "Besi pipa fabrikasi rapi dan presisi",
        "Dirancang untuk perawatan yang mudah",
        "Ready stock dan custom order tersedia",
        "Pengiriman menggunakan jasa kirim khusus, ongkos kirim menyesuaikan lokasi",
      ],
      closing:
        "Warna dan spesifikasi dapat disesuaikan. Hubungi kami untuk penawaran terbaik.",
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
    price: { type: "contact" },
    description: {
      intro:
        "Net voli standar FIVB tersedia di ProFabric Steel Bekasi dengan material nilon berkualitas tinggi dan ukuran sesuai regulasi resmi. Cocok untuk pertandingan resmi maupun latihan rutin di GOR sekolah, fasilitas olahraga, dan lapangan voli komunitas.",
      details: [
        "Ukuran sesuai standar FIVB yaitu panjang 9,5 meter dan lebar 1 meter untuk pertandingan resmi",
        "Material nilon anti putus yang tahan terhadap pemakaian intensif dalam jangka panjang",
        "Tali penguat pada bagian atas dan bawah net untuk ketahanan yang lebih baik dari tarikan tiang",
        "Pita putih selebar 5 cm pada bagian atas sesuai regulasi FIVB untuk visibilitas yang jelas",
        "Cocok untuk penggunaan di lapangan indoor maupun outdoor dalam segala kondisi cuaca",
        "Kompatibel dengan tiang voli PFS portable maupun tanam untuk sistem yang lengkap",
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
    price: { type: "contact" },
    description: {
      intro:
        "Net badminton standar BWF tersedia di ProFabric Steel Bekasi dengan rajutan nilon halus dan ukuran sesuai regulasi resmi. Dirancang untuk memberikan ketegangan yang konsisten dan tahan lama untuk kebutuhan latihan maupun pertandingan resmi.",
      details: [
        "Ukuran sesuai standar BWF yaitu panjang 6,1 meter dan lebar 76 cm untuk pertandingan resmi",
        "Lubang jaring berukuran 19 hingga 20 mm dengan rajutan nilon halus yang memberikan ketegangan konsisten",
        "Pita kepala putih selebar 75 mm di bagian atas sesuai regulasi BWF untuk batas net yang jelas",
        "Tali pinggir yang kuat untuk pemasangan pada tiang badminton standar dengan ketegangan optimal",
        "Bobot ringan yang memudahkan pemasangan dan penggulungan setelah selesai digunakan",
        "Cocok untuk lapangan tunggal maupun ganda sesuai regulasi BWF",
      ],
      notes: [
        "Tersedia untuk lapangan tunggal dan ganda",
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
    price: { type: "contact" },
    description: {
      intro:
        "Jaring gawang futsal standar FIFA tersedia di ProFabric Steel Bekasi dengan material PE 3mm berkualitas tinggi yang kuat menahan tembakan keras. Dirancang untuk ketahanan optimal di lapangan futsal indoor maupun outdoor dengan ukuran sesuai regulasi resmi.",
      details: [
        "Material PE berdiameter 3 mm yang memberikan kekuatan optimal dalam menahan tembakan keras dari jarak dekat",
        "Ukuran standar FIFA yaitu lebar 3 meter, tinggi 2 meter, dan kedalaman 1 meter untuk lapangan futsal resmi",
        "Anyaman rapat yang memastikan bola tidak menembus jaring sehingga hasil pertandingan terlihat jelas",
        "Warna putih yang kontras memudahkan pemain, wasit, dan penonton memantau bola yang masuk gawang",
        "Tahan terhadap cuaca indoor maupun outdoor sehingga tetap awet meski digunakan setiap hari",
        "Kompatibel dengan gawang futsal PFS untuk sistem yang lengkap dan terintegrasi",
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
  "official-equipment": "Accessories",
  "referee-chair": "Kursi Wasit",
  "referee-chair-badminton": "Kursi Wasit Badminton",
  "referee-chair-volleyball": "Kursi Wasit",
  "referee-chair-tennis": "Kursi Wasit Tenis",
};
