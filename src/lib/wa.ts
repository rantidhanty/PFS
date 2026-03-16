import { siteConfig } from "@/config/site";

/** Buat URL WhatsApp dengan pesan kustom */
export function waUrl(message: string): string {
  return `https://wa.me/${siteConfig.phone.wa}?text=${encodeURIComponent(message)}`;
}
