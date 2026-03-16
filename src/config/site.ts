/**
 * Konfigurasi global situs — satu sumber kebenaran untuk semua konstanta.
 *
 * Gunakan file ini di mana pun kamu butuh URL, nomor telepon, atau data bisnis.
 * Jangan mendefinisikan ulang konstanta ini di file lain.
 */

export const siteConfig = {
  /** URL utama situs, tanpa trailing slash */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.profabricsteel.com",

  name: "ProFabric Steel",
  shortName: "PFS",
  tagline: "Peralatan Olahraga Standar Kompetisi & Fabrikasi Besi Bekasi",

  phone: {
    /** Format untuk ditampilkan ke user */
    display: "+62 896-7340-4972",
    /** Format untuk link WhatsApp: wa.me/{wa} */
    wa: "6289673404972",
    /** Format untuk schema.org */
    schema: "+6289673404972",
  },

  address: {
    street: "Jl. Mawar Raya No.1, Sukamanah",
    city: "Sukatani, Kabupaten Bekasi",
    province: "Jawa Barat",
    postalCode: "17630",
    country: "ID",
  },

  geo: {
    latitude: -6.19733893595498,
    longitude: 107.1709019592964,
  },

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    open: "08:00",
    close: "17:00",
  },
} as const;

/** Buat URL WhatsApp dengan pesan kustom */
export function waUrl(message: string): string {
  return `https://wa.me/${siteConfig.phone.wa}?text=${encodeURIComponent(message)}`;
}
