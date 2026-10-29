import { Product } from '../../types/product';

/**
 * Normalizes query string: trims, lowercases, removes punctuation while preserving numbers and Devanagari.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[₹,./\\?!@#$%^&*()_+=[\]{};:'"<>~`|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface KeywordMatchResult {
  productId: string;
  score: number;
  matchedTerms: string[];
}

const COMMON_STOPWORDS = new Set(['oil', 'tel', 'के', 'का', 'की', 'में', 'and', 'for', 'the', 'से', 'को', 'है']);

export function scoreProductKeywords(
  product: Product,
  query: string
): KeywordMatchResult {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return { productId: product.id, score: 0, matchedTerms: [] };
  }

  const queryTokens = normalizedQuery
    .split(' ')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  let rawScore = 0;
  const matchedTerms: string[] = [];

  const nameEn = normalizeText(product.name.en);
  const nameHi = normalizeText(product.name.hi);
  const subtitleEn = normalizeText(product.subtitle.en);
  const subtitleHi = normalizeText(product.subtitle.hi);
  const descEn = normalizeText(product.description.en);
  const descHi = normalizeText(product.description.hi);

  const keywordsEn = (product.searchKeywords?.en || []).map(normalizeText);
  const keywordsHi = (product.searchKeywords?.hi || []).map(normalizeText);

  // 1. Exact full name match
  if (nameEn === normalizedQuery || nameHi === normalizedQuery) {
    rawScore += 1.5;
    matchedTerms.push('exact_full_name');
  } else if (nameEn.includes(normalizedQuery) || nameHi.includes(normalizedQuery)) {
    rawScore += 0.8;
    matchedTerms.push('name_phrase');
  }

  // 2. Token-by-token evaluation
  let nonStopwordMatches = 0;
  let nonStopwordTokens = 0;

  for (const token of queryTokens) {
    const isStop = COMMON_STOPWORDS.has(token);
    if (!isStop) nonStopwordTokens++;

    let tokenMatched = false;

    // Check in product names
    if (nameEn.includes(token) || nameHi.includes(token)) {
      rawScore += isStop ? 0.08 : 0.35;
      tokenMatched = true;
      matchedTerms.push(token);
    }

    // Check in pack sizes and prices
    for (const v of product.variants) {
      const vSize = normalizeText(v.packSize);
      const vPrice = v.mrp.toString();

      if (vSize === token || token === vSize.replace(/\s+/g, '')) {
        rawScore += 0.45;
        tokenMatched = true;
        matchedTerms.push(v.packSize);
      }
      if (token === vPrice || token === `₹${vPrice}` || token === `rs${vPrice}`) {
        rawScore += 0.35;
        tokenMatched = true;
        matchedTerms.push(`₹${vPrice}`);
      }
    }

    // Check keywords
    if (
      keywordsEn.some((kw) => kw === token || kw.includes(token)) ||
      keywordsHi.some((kw) => kw === token || kw.includes(token))
    ) {
      rawScore += isStop ? 0.05 : 0.25;
      tokenMatched = true;
      matchedTerms.push(token);
    }

    // Check indications
    const indications = [
      ...(product.indications?.en || []),
      ...(product.indications?.hi || []),
    ].map(normalizeText);

    if (indications.some((ind) => ind.includes(token))) {
      rawScore += 0.3;
      tokenMatched = true;
      matchedTerms.push(token);
    }

    // Subtitle & description
    if (subtitleEn.includes(token) || subtitleHi.includes(token)) {
      rawScore += isStop ? 0.03 : 0.15;
      tokenMatched = true;
    } else if (descEn.includes(token) || descHi.includes(token)) {
      rawScore += isStop ? 0.02 : 0.08;
      tokenMatched = true;
    }

    if (tokenMatched && !isStop) {
      nonStopwordMatches++;
    }
  }

  // If query had distinctive tokens but none matched this product, heavily scale down
  if (nonStopwordTokens > 0 && nonStopwordMatches === 0) {
    rawScore *= 0.1;
  }

  return {
    productId: product.id,
    score: rawScore,
    matchedTerms: Array.from(new Set(matchedTerms)),
  };
}
