/**
 * Analytics utility — GA4 & Meta Pixel event tracking
 *
 * HOW TO USE:
 * 1. Ganti GA4_MEASUREMENT_ID di layout.tsx dengan ID GA4 asli (format: G-XXXXXXXXXX)
 * 2. Ganti META_PIXEL_ID di layout.tsx dengan Pixel ID Meta asli (format: angka 16 digit)
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** Kirim event ke GA4 */
function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/** Kirim event ke Meta Pixel */
function fbqEvent(
  type: "track" | "trackCustom",
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(type, eventName, params);
  }
}

// ─── Event Tracking Functions ────────────────────────────────────────────────

/**
 * Tracking klik tombol WhatsApp
 * @param label - nama produk atau konteks (misal: "Ring Basket FIBA Portable")
 * @param location - dari mana klik terjadi (misal: "hero", "product_page", "float_button")
 */
export function trackWhatsAppClick(label?: string, location?: string) {
  const params = {
    event_category: "engagement",
    event_label: label ?? "General",
    location: location ?? "unknown",
  };

  gtagEvent("whatsapp_click", params);
  fbqEvent("track", "Contact", { content_name: label ?? "General", location });
}

/**
 * Tracking kunjungan halaman produk
 * @param productName - nama produk
 * @param productSlug - slug produk
 */
export function trackViewProduct(productName: string, productSlug: string) {
  gtagEvent("view_item", {
    items: [{ item_name: productName, item_id: productSlug }],
  });
  fbqEvent("track", "ViewContent", {
    content_name: productName,
    content_ids: [productSlug],
    content_type: "product",
  });
}

/**
 * Tracking klik tombol Tokopedia / TikTok Shop
 * @param platform - "tokopedia" | "tiktokshop"
 */
export function trackMarketplaceClick(platform: string) {
  gtagEvent("marketplace_click", {
    event_category: "outbound",
    event_label: platform,
  });
  fbqEvent("trackCustom", "MarketplaceClick", { platform });
}
