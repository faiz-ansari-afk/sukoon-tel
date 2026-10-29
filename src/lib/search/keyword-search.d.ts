import { Product } from '../../types/product';
/**
 * Normalizes query string: trims, lowercases, removes punctuation while preserving numbers and Devanagari.
 */
export declare function normalizeText(text: string): string;
export interface KeywordMatchResult {
    productId: string;
    score: number;
    matchedTerms: string[];
}
export declare function scoreProductKeywords(product: Product, query: string): KeywordMatchResult;
