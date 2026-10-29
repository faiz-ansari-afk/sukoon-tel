export interface LocalizedString {
  en: string;
  hi: string;
}

export interface LocalizedList {
  en: string[];
  hi: string[];
}

export interface ProductVariant {
  id: string;
  packSize: string; // e.g. "50 ml", "100 ml", "200 ml", "6 ml"
  mrp: number; // in INR
  availability: 'in-stock' | 'enquire-availability';
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  tagline?: LocalizedString;
  description: LocalizedString;
  detailedDescription?: LocalizedString;
  images: {
    primary: string;
    showcase?: string;
    ad?: string;
    additional?: string[];
  };
  variants: ProductVariant[];
  ingredients?: LocalizedList;
  directions?: LocalizedString;
  indications?: LocalizedList;
  featured: boolean;
  searchKeywords: LocalizedList;
  manufacturer: {
    name: string;
    licenseNo: string;
    address: LocalizedString;
    certifications?: string[];
  };
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  badge: LocalizedString;
  image: string;
  displayOrder: number;
}

