import { siteConfig } from '../data/site-config';
import { Language } from '../types/site';

export interface ProductEnquiryParams {
  productName?: string;
  packSize?: string;
  mrp?: number;
  language?: Language;
}

export function createWhatsAppUrl(params?: ProductEnquiryParams): string {
  const number = siteConfig.contact.whatsappNumber;
  const lang = params?.language || 'hi';

  let message = '';

  if (params && params.productName) {
    if (lang === 'hi') {
      message = `नमस्ते नगीना आयुर्वेदिक एजेंसी! मुझे *${params.productName}*`;
      if (params.packSize) message += ` (${params.packSize}`;
      if (params.mrp) message += ` - MRP ₹${params.mrp}`;
      if (params.packSize) message += `)`;
      message += ` के बारे में जानकारी चाहिए। क्या यह आपके शेरकोट केंद्र पर उपलब्ध है?`;
    } else {
      message = `Hello Nageena Ayurvedic Agency, I would like to enquire about *${params.productName}*`;
      if (params.packSize) message += ` (${params.packSize}`;
      if (params.mrp) message += ` - MRP ₹${params.mrp}`;
      if (params.packSize) message += `)`;
      message += `. Is it available at your Sherkot store?`;
    }
  } else {
    if (lang === 'hi') {
      message = `नमस्ते नगीना आयुर्वेदिक एजेंसी शेरकोट! मुझे आपके असली नगीना आयुर्वेदिक उत्पादों के बारे में पूछताछ करनी है।`;
    } else {
      message = `Hello Nageena Ayurvedic Agency शेरकोट! I want to enquire about authentic Nageena Ayurvedic products.`;
    }
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
