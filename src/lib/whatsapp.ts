/**
 * Canonical WhatsApp Utility for Birta Mai Jewellers
 * Primary WhatsApp Number: +9779845033095
 * Canonical Destination: https://wa.me/9779845033095
 */

export const OFFICIAL_WHATSAPP_NUMBER = "9779845033095";
export const DISPLAY_PHONE_NUMBER = "+977 9845033095";

export interface WhatsAppProductInquiryParams {
  productName: string;
  sku: string;
  price?: number | null;
  currency?: string;
  approximateWeight?: string | null;
}

export function getGeneralWhatsAppUrl(
  message = "Hello Birta Mai Jewellers, I would like to enquire about your jewelry collection and visit your store at Birta Mai Mandir, Birgunj."
): string {
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
}

export function getProductWhatsAppUrl(params: WhatsAppProductInquiryParams): string {
  const details = [
    `Hello Birta Mai Jewellers, I am interested in ${params.productName}, SKU: ${params.sku}.`,
    params.approximateWeight ? `Approximate Weight: ${params.approximateWeight}.` : "",
    "Please share the current price, availability, and further details.",
  ]
    .filter(Boolean)
    .join(" ");

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(details.trim())}`;
}

export function getAppointmentWhatsAppUrl(params: {
  fullName: string;
  preferredDate?: string;
  inquiryType: string;
  message?: string;
}): string {
  const text = `Hello Birta Mai Jewellers, I would like to schedule an in-store appointment at Birta Mai Mandir, Birgunj.
Name: ${params.fullName}
Inquiry Type: ${params.inquiryType}${params.preferredDate ? `\nPreferred Date: ${params.preferredDate}` : ""}${
    params.message ? `\nNotes: ${params.message}` : ""
  }`;

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text.trim())}`;
}

export function getRatesWhatsAppUrl(rateType = "Gold/Silver"): string {
  const message = `Hello Birta Mai Jewellers, please share today's confirmed ${rateType} bullion rates and custom order making charges at your Birgunj store.`;
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
