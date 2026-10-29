import { LocalizedString } from './product';

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  badge: LocalizedString;
  image: string;
  displayOrder: number;
}

