// Google Ads & Analytics tracking utility

export const GA_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18368160825";
export const GA_CONVERSION_WA_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WA_LABEL || "";
export const GA_CONVERSION_CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || "";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Kirim generic event ke gtag
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
};

/**
 * Kirim konversi Google Ads (Conversion Action)
 */
export const trackConversion = (conversionLabel?: string, value?: number) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const adsId = GA_ADS_ID;
    const sendTo = conversionLabel ? `${adsId}/${conversionLabel}` : adsId;

    window.gtag("event", "conversion", {
      send_to: sendTo,
      value: value || 1.0,
      currency: "IDR",
    });
  }
};

/**
 * Track klik tombol WhatsApp (Lead intent utama)
 */
export const trackWhatsAppClick = (source: string = "general", note: string = "") => {
  trackEvent("click_whatsapp", {
    event_category: "Contact",
    event_label: source,
    note: note,
  });

  // Track Google Ads Conversion jika label tersedia atau fallback
  if (GA_CONVERSION_WA_LABEL) {
    trackConversion(GA_CONVERSION_WA_LABEL);
  } else {
    trackConversion();
  }
};

/**
 * Track klik panggilan telepon langsung
 */
export const trackCallClick = (source: string = "general") => {
  trackEvent("click_phone_call", {
    event_category: "Contact",
    event_label: source,
  });

  if (GA_CONVERSION_CALL_LABEL) {
    trackConversion(GA_CONVERSION_CALL_LABEL);
  } else {
    trackConversion();
  }
};
