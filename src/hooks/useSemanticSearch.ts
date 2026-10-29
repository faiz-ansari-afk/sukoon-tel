import { useState, useEffect, useRef } from 'react';
import { SearchResultItem } from '../types/search';
import { searchProducts } from '../lib/search/semantic-search';
import { embeddingModelManager, ModelStatus } from '../lib/search/embedding-model';
import { useDebounce } from './useDebounce';

export function useSemanticSearch(initialQuery = '', debounceMs = 280) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, debounceMs);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>(embeddingModelManager.getStatus());
  const [usedVectorSearch, setUsedVectorSearch] = useState(false);
  const currentSearchId = useRef(0);

  // Subscribe to model status changes
  useEffect(() => {
    const unsubscribe = embeddingModelManager.onStatusChange((status) => {
      setModelStatus(status);
    });
    return unsubscribe;
  }, []);

  // Run search when debouncedQuery changes
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      setUsedVectorSearch(false);
      return;
    }

    const searchId = ++currentSearchId.current;
    setIsSearching(true);

    searchProducts(trimmed, { useSemantic: true })
      .then((res) => {
        // Prevent stale results
        if (searchId === currentSearchId.current) {
          setResults(res.results);
          setModelStatus(res.modelStatus);
          setUsedVectorSearch(res.usedVectorSearch);
          setIsSearching(false);
        }
      })
      .catch((err) => {
        if (searchId === currentSearchId.current) {
          console.error('Search execution failed:', err);
          setIsSearching(false);
        }
      });
  }, [debouncedQuery]);

  const clear = () => {
    setQuery('');
    setResults([]);
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isSearching,
    modelStatus,
    usedVectorSearch,
    clear,
  };
}

