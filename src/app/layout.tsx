import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DiscountBanner } from "@/components/ui/discount-banner";
import { SocialProofToast } from "@/components/ui/social-proof-toast";
import { ChatFloatWidget } from "@/components/ui/chat-widget";
import { WaFloat } from "@/components/ui/wa-float";
import { WaAdminSheet } from "@/components/ui/wa-admin-sheet";
import { SearchPalette } from "@/components/ui/search-palette";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SearchProvider } from "@/context/search-context";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ID analytics dibaca dari environment variable (.env.local)
// Lihat .env.example untuk cara mendapatkan ID yang benar
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Pabrik peralatan olahraga standar FIBA, FIVB, FIFA, BWF di Bekasi. Ring basket, tiang voli, gawang futsal, tiang badminton. Produksi sendiri, harga tangan pertama, siap custom sesuai kebutuhan dan budget.",
  keywords: [
    "ProFabric Steel",
    "Pro Fabric Steel",
    "Pro Fabrik Steel",
    "Pro Pabrik Steel",
    "profabricsteel",
    "PFS Bekasi",
    "pabrik peralatan olahraga",
    "produsen peralatan olahraga Bekasi",
    "ring basket FIBA",
    "ring basket portable",
    "ring basket tanam",
    "tiang voli FIVB",
    "tiang voli portable",
    "tiang voli tanam",
    "gawang futsal FIFA",
    "tiang badminton BWF",
    "tiang padel FIP",
    "tiang tenis ITF",
    "kursi wasit",
    "peralatan olahraga Bekasi",
    "jual peralatan olahraga",
    "custom peralatan olahraga",
    "alat olahraga standar kompetisi",
    "harga tangan pertama peralatan olahraga",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description:
      "Pabrik peralatan olahraga standar FIBA, FIVB, FIFA, BWF di Bekasi. Ring basket, tiang voli, gawang futsal, tiang badminton. Produksi sendiri, harga tangan pertama, siap custom.",
    images: [
      {
        url: "/images/posters/poster%20PFS.webp",
        width: 1536,
        height: 1024,
        alt: `${siteConfig.name} - Peralatan Olahraga Standar Kompetisi Bekasi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description:
      "Jual ring basket FIBA, tiang voli, gawang futsal, tiang badminton di Bekasi. Hubungi via WhatsApp!",
    images: ["/images/posters/poster%20PFS.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "BaPHZwdsN8LeNoY4JcrjOBZZVO4EO0LJr9N1wON-G94",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  alternateName: [
    "Pro Fabric Steel",
    "Pro Fabrik Steel",
    "Pro Pabrik Steel",
    "PFS",
    "profabricsteel",
  ],
  description:
    "Spesialis fabrikasi besi dan penjualan peralatan olahraga standar kompetisi di Bekasi, Jawa Barat.",
  url: siteConfig.url,
  telephone: siteConfig.phone.schema,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.province,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: siteConfig.openingHours.days,
    opens: siteConfig.openingHours.open,
    closes: siteConfig.openingHours.close,
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
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.tiktok,
    siteConfig.social.youtube,
    siteConfig.social.googleBusiness,
    siteConfig.marketplace.shopee.url,
    siteConfig.marketplace.tokopedia.url,
  ],
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
        <SearchProvider>
          <DiscountBanner />
          <ErrorBoundary>{children}</ErrorBoundary>
          <SocialProofToast />
          <ChatFloatWidget />
          <WaFloat />
          <WaAdminSheet />
          <SearchPalette />
          <ScrollToTop />
        </SearchProvider>

        {/* ── Google Analytics 4 ─────────────────────────────────────────── */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}', { send_page_view: true });
              `}
            </Script>
          </>
        )}

        {/* ── Meta Pixel (Facebook / Instagram Ads) ──────────────────────── */}
        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
