import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimasi gambar: konversi otomatis ke AVIF & WebP, ukuran responsive
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // cache 30 hari
  },

  // Security headers — penting untuk SEO & iklan (Google Ads, Meta Pixel)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Cegah browser menebak MIME type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Cegah website di-embed di iframe orang lain (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Kirim referrer hanya ke origin yang sama (aman untuk analytics)
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Batasi akses kamera/mic/GPS yang tidak perlu
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      // Cache statis untuk aset publik (gambar, font)
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
