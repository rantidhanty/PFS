import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { BottomSections } from "@/components/sections/bottom-sections";
import { AutoScrollInit } from "@/components/ui/auto-scroll-init";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 pt-3 pb-8 sm:pt-4 sm:pb-10">
        <HeroSection />
        <ProductsSection />
        <BottomSections />
      </main>
      <SiteFooter />
      <AutoScrollInit />
    </div>
  );
}
