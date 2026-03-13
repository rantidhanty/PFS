import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WaFloat } from "@/components/ui/wa-float";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ganti dengan domain asli setelah deploy (contoh: https://www.profabricsteel.com)
const siteUrl = "https://www.profabricsteel.com";

export const metadata: Metadata = {
  title: {
    default: "ProFabric Steel - Peralatan Olahraga & Fabrikasi Besi Bekasi",
    template: "%s | ProFabric Steel",
  },
  description:
    "Jual ring basket FIBA, tiang voli FIVB, gawang futsal FIFA, tiang badminton BWF, tiang tenis ITF di Bekasi. Fabrikasi besi profesional: tralis, railing, grill. Hubungi via WhatsApp!",
  keywords: [
    "ring basket FIBA",
    "tiang voli FIVB",
    "gawang futsal",
    "tiang badminton BWF",
    "tiang padel",
    "tiang tenis ITF",
    "peralatan olahraga Bekasi",
    "fabrikasi besi Bekasi",
    "alat olahraga standar kompetisi",
    "jual ring basket",
    "tralis besi",
    "railing besi",
  ],
  authors: [{ name: "ProFabric Steel" }],
  creator: "ProFabric Steel",
  publisher: "ProFabric Steel",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "ProFabric Steel",
    title: "ProFabric Steel - Peralatan Olahraga & Fabrikasi Besi Bekasi",
    description:
      "Jual ring basket FIBA, tiang voli, gawang futsal, tiang badminton di Bekasi. Fabrikasi besi profesional untuk proyek sekolah, venue olahraga, dan rumah.",
    images: [
      {
        url: "/images/posters/poster%20PFS.jpg",
        width: 1536,
        height: 1024,
        alt: "ProFabric Steel - Peralatan Olahraga Standar Kompetisi Bekasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProFabric Steel - Peralatan Olahraga & Fabrikasi Besi Bekasi",
    description:
      "Jual ring basket FIBA, tiang voli, gawang futsal, tiang badminton di Bekasi. Hubungi via WhatsApp!",
    images: ["/images/posters/poster%20PFS.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ProFabric Steel",
  alternateName: "PFS",
  description:
    "Spesialis fabrikasi besi dan penjualan peralatan olahraga standar kompetisi di Bekasi, Jawa Barat.",
  url: siteUrl,
  telephone: "+6289673404972",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Mawar Raya No.1, Sukamanah",
    addressLocality: "Sukatani, Kabupaten Bekasi",
    addressRegion: "Jawa Barat",
    postalCode: "17630",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.19733893595498,
    longitude: 107.1709019592964,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "17:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Peralatan Olahraga Standar Kompetisi",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Ring Basket FIBA Portable" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Ring Basket FIBA Tanam" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Tiang Voli FIVB Portable" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Gawang Futsal FIFA" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Tiang Badminton BWF" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Tiang Padel FIP" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Tiang Tenis ITF" },
      },
    ],
  },
  sameAs: ["https://wa.me/6289673404972"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Kepala Sekolah SMAN 37 Jakarta" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Hasil pengerjaan ring basket dan fasilitas olahraga sangat memuaskan. Material kuat, finishing rapi, dan tim PFS sangat profesional.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Kepala Sekolah SDN Cilincing" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "PFS sangat responsif dan memahami kebutuhan kami. Tiang voli yang dipasang kokoh dan presisi.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Facility Manager AEON Bekasi" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "ProFabric Steel menjadi pilihan tepat untuk project fabrikasi besi kami. Pengerjaan tepat waktu dan hasil sesuai spesifikasi.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WaFloat />
      </body>
    </html>
  );
}
