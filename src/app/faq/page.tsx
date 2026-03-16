import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { FaqSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering ditanyakan seputar produk, pengiriman, custom order, dan layanan ProFabric Steel Bekasi.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_24%,#fff7ed_100%)] text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
