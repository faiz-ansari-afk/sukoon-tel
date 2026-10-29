import { Product } from '../../types/product';
import { SearchResultItem, EmbeddingsDatabase } from '../../types/search';
import precomputedEmbeddings from '../../generated/product-embeddings.json';
import productsData from '../../data/products.json';
import { cosineSimilarity } from './similarity';
import { scoreProductKeywords, normalizeText } from './keyword-search';
import { embeddingModelManager, ModelStatus } from './embedding-model';

const products = productsData as Product[];
const embeddingsDb = precomputedEmbeddings as unknown as EmbeddingsDatabase;

export async function searchProducts(
  query: string,
  options: {
    useSemantic?: boolean;
    minScoreThreshold?: number;
  } = {}
): Promise<{
  results: SearchResultItem[];
  modelStatus: ModelStatus;
  usedVectorSearch: boolean;
}> {
  const { useSemantic = true, minScoreThreshold = 0.15 } = options;
  const cleanQuery = normalizeText(query);

  if (!cleanQuery) {
    return {
      results: [],
      modelStatus: embeddingModelManager.getStatus(),
      usedVectorSearch: false,
    };
  }

  // 1. Calculate keyword scores for all products
  const keywordMap = new Map<string, { score: number; terms: string[] }>();
  for (const product of products) {
    const res = scoreProductKeywords(product, cleanQuery);
    keywordMap.set(product.id, { score: res.score, terms: res.matchedTerms });
  }

  // 2. Attempt semantic vector comparison if enabled
  let usedVectorSearch = false;
  const vectorScores = new Map<string, number>();

  if (useSemantic) {
    try {
      const queryVector = await embeddingModelManager.embedQuery(cleanQuery);
      usedVectorSearch = true;

      for (const record of embeddingsDb.records) {
        const sim = cosineSimilarity(queryVector, record.vector);
        vectorScores.set(record.productId, sim);
      }
    } catch (err) {
      console.warn('Vector embedding unavailable, falling back to keyword search:', err);
    }
  }

  // 3. Combine scores into final hybrid score
  const combinedResults: SearchResultItem[] = [];

  for (const product of products) {
    const kw = keywordMap.get(product.id) || { score: 0, terms: [] };
    const rawSim = vectorScores.get(product.id);

    let finalScore = 0;
    let matchType: 'vector' | 'keyword' | 'hybrid' = 'keyword';

    if (usedVectorSearch && typeof rawSim === 'number') {
      // Linear scaling of cosine similarity: 0.2 to 0.75 maps to 0 to 1
      const normalizedSim = Math.max(0, Math.min(1, (rawSim - 0.2) / 0.55));

      if (kw.score > 0.3) {
        matchType = 'hybrid';
        finalScore = kw.score * 0.65 + normalizedSim * 0.35;
      } else if (kw.score > 0) {
        matchType = 'hybrid';
        finalScore = kw.score * 0.4 + normalizedSim * 0.6;
      } else {
        matchType = 'vector';
        finalScore = normalizedSim;
      }
    } else {
      matchType = 'keyword';
      finalScore = kw.score;
    }

    if (finalScore >= minScoreThreshold) {
      combinedResults.push({
        product,
        score: finalScore,
        matchedBy: matchType,
        matchedTerms: kw.terms,
      });
    }
  }

  // 4. Sort descending by score
  combinedResults.sort((a, b) => b.score - a.score);

  return {
    results: combinedResults,
    modelStatus: embeddingModelManager.getStatus(),
    usedVectorSearch,
  };
}
