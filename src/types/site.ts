import { LocalizedString } from './product';

export type Language = 'en' | 'hi';

export interface SiteContactConfig {
  primaryPhone: string; // e.g. "7350988348"
  primaryPhoneFormatted: string; // e.g. "+91 73509 88348"
  secondaryPhone: string; // e.g. "9588679467"
  secondaryPhoneFormatted: string; // e.g. "+91 95886 79467"
  whatsappNumber: string; // "917350988348"
  facebookPageUrl: string;
  address: {
    line1: LocalizedString;
    locality: LocalizedString;
    landmark: LocalizedString;
    city: LocalizedString;
    district: LocalizedString;
    state: LocalizedString;
    country: LocalizedString;
    fullText: LocalizedString;
    googleMapsSearchUrl: string;
  };
  timings: LocalizedString;
}

export interface SiteAnnouncement {
  enabled: boolean;
  message: LocalizedString;
  linkText?: LocalizedString;
  linkUrl?: string;
}

export interface SiteConfig {
  name: LocalizedString;
  brandTagline: LocalizedString;
  establishmentYear: number;
  contact: SiteContactConfig;
  announcement: SiteAnnouncement;
  manufacturerInfo: {
    name: LocalizedString;
    location: LocalizedString;
    establishedYear: number;
    isoCertified: string;
  };
}

