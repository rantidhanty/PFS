/**
 * Konfigurasi global situs — satu sumber kebenaran untuk semua konstanta.
 *
 * Gunakan file ini di mana pun kamu butuh URL, nomor telepon, atau data bisnis.
 * Jangan mendefinisikan ulang konstanta ini di file lain.
 */

export const admins = [
  {
    name: "Admin 1",
    display: "+62 896-7340-4972",
    wa: "6289673404972",
  },
  {
    name: "Admin 2",
    display: "+62 858-9079-5425",
    wa: "6285890795425",
  },
  {
    name: "Admin 3",
    display: "+62 898-782-8580",
    wa: "628987828580",
  },
] as const;

export const siteConfig = {
  /** URL utama situs, tanpa trailing slash */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://profabricsteel.com",

  name: "ProFabric Steel",
  shortName: "PFS",
  tagline: "Pabrik Peralatan Olahraga Standar Kompetisi di Bekasi",

  phone: {
    /** Format untuk ditampilkan ke user */
    display: "+62 896-7340-4972",
    /** Format untuk link WhatsApp: wa.me/{wa} */
    wa: "6289673404972",
    /** Format untuk schema.org */
    schema: "+6289673404972",
  },

  social: {
    instagram: "https://www.instagram.com/profabricsteel",
    facebook: "https://www.facebook.com/share/14Y8MUm7qbZ/",
    tiktok: "https://www.tiktok.com/@profabricsteel",
    youtube: "https://youtube.com/@profabricsteel",
    googleBusiness: "https://share.google/MldTGiDvUH6KVXMqx",
  },

  marketplace: {
    shopee: {
      name: "Shopee",
      handle: "profabricsteel",
      url: process.env.NEXT_PUBLIC_SHOPEE_URL ?? "https://id.shp.ee/VJqfdMyT",
    },
    tokopedia: {
      name: "Tokopedia",
      handle: "profabricsteel",
      url: process.env.NEXT_PUBLIC_TOKOPEDIA_URL ?? "https://tk.tokopedia.com/ZSuBFb7UA/",
    },
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

  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.25086886259!2d107.1709019592964!3d-6.19733893595498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698698688ca731%3A0x270147ffbc5c8b6c!2sJl.%20Mawar%20Raya%20No.1%2C%20Sukamanah%2C%20Kec.%20Sukatani%2C%20Kabupaten%20Bekasi%2C%20Jawa%20Barat%2017630!5e0!3m2!1sid!2sid!4v1772932288139!5m2!1sid!2sid",
  },

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    open: "08:00",
    close: "17:00",
  },
} as const;
