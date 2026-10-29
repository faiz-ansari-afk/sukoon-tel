import { Product } from './product';

export interface ProductEmbeddingRecord {
  productId: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  documentText: string;
  vector: number[];
}

export interface EmbeddingsFileMetadata {
  model: string;
  dimension: number;
  generatedAt: string;
  productCount: number;
  version: string;
}

export interface EmbeddingsDatabase {
  metadata: EmbeddingsFileMetadata;
  records: ProductEmbeddingRecord[];
}

export interface SearchResultItem {
  product: Product;
  score: number;
  matchedBy: 'vector' | 'keyword' | 'hybrid';
  matchedTerms?: string[];
}

