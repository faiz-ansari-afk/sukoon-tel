import { SearchResultItem } from '../../types/search';
import { ModelStatus } from './embedding-model';
export declare function searchProducts(query: string, options?: {
    useSemantic?: boolean;
    minScoreThreshold?: number;
}): Promise<{
    results: SearchResultItem[];
    modelStatus: ModelStatus;
    usedVectorSearch: boolean;
}>;
