import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatPanel } from "@/components/ui/chat-widget";

export const metadata: Metadata = {
  title: "Konsultasi Asisten PFS",
  description:
    "Konsultasi langsung dengan Asisten Virtual ProFabric Steel — tanya harga, spesifikasi, dan rekomendasi peralatan olahraga standar kompetisi.",
};

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <SiteNavbar />

      {/* Header compact */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 px-4 py-3 text-white">
        <div className="mx-auto flex max-w-2xl items-center gap-2.5">
          <span className="text-xl">🤖</span>
          <div>
            <p className="text-sm font-bold leading-tight">Live Chat PFS</p>
            <p className="text-[11px] text-sky-200">Spesialis peralatan olahraga standar kompetisi</p>
          </div>
          <div className="ml-auto flex gap-1.5">
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">⚡ Instan</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">💬 Gratis</span>
          </div>
        </div>
      </div>

      {/* Chat panel — tinggi tetap, tidak bergantung scroll halaman */}
      <div className="mx-auto w-full max-w-2xl border-x border-zinc-200 bg-white shadow-sm">
        <div className="h-[60vh] min-h-[380px] sm:h-[65vh]">
          <ChatPanel embedded />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
