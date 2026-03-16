"use client";

import { trackWhatsAppClick } from "@/lib/analytics";

interface WaButtonProps {
  href: string;
  productName: string;
  /** Variant visual tombol */
  variant?: "primary" | "dark";
  children: React.ReactNode;
  className?: string;
}

/**
 * Tombol WhatsApp dengan conversion tracking GA4 + Meta Pixel.
 * Gunakan komponen ini di mana pun ada CTA WhatsApp di halaman produk.
 */
export function WaButton({
  href,
  productName,
  variant = "primary",
  children,
  className,
}: WaButtonProps) {
  const base =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#20b558]"
      : "inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? base}
      aria-label={`Konsultasi ${productName} via WhatsApp`}
      onClick={() => trackWhatsAppClick(productName, "product_page")}
    >
      {children}
    </a>
  );
}
