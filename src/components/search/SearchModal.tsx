import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useSemanticSearch } from '../../hooks/useSemanticSearch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { formatPrice } from '../../lib/format-currency';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    setQuery,
    results,
    isSearching,
    modelStatus,
    usedVectorSearch,
    clear,
  } = useSemanticSearch('', 260);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      clear();
    }
  }, [isOpen]);

  const popularSuggestions = [
    { label: 'Sukoon Oil 100ml', query: 'Sukoon Oil 100ml' },
    { label: 'नगीना सुकून तेल', query: 'नगीना सुकून तेल' },
    { label: 'Onion Hair Oil', query: 'Onion Hair Oil' },
    { label: 'रहनुमा केश तेल', query: 'रहनुमा केश तेल' },
    { label: 'Pain Killer Roll-On', query: 'Pain Killer' },
    { label: 'कमर दर्द', query: 'कमर दर्द' },
    { label: 'बालों का झड़ना', query: 'बालों का झड़ना' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-[#faf8f3] border-[#e2d8c7]">
        {/* Header and Search Input */}
        <div className="p-4 sm:p-6 border-b border-[#e2d8c7] bg-white">
          <DialogHeader className="mb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base sm:text-lg flex items-center gap-2 text-[#184230]">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {t.search.modalTitle}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Input field */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.inputPlaceholder}
              className="w-full pl-11 pr-10 py-3 rounded-xl border-2 border-[#184230]/20 bg-[#faf8f3] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#184230] text-sm sm:text-base transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={clear}
                className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
                aria-label={t.search.clearQuery}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Model Status Bar */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 px-1">
            <div className="flex items-center gap-1.5">
              {modelStatus === 'loading' && (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span className="text-amber-700">{t.search.loadingModel}</span>
                </>
              )}
              {modelStatus === 'ready' && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">
                    {t.search.readyModel}
                  </span>
                </>
              )}
              {modelStatus === 'error' && (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-700">{t.search.modelError}</span>
                </>
              )}
              {modelStatus === 'idle' && (
                <span>AI multilingual sentence search ready on input</span>
              )}
            </div>

            {isSearching && (
              <div className="flex items-center gap-1 text-emerald-800 font-medium">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Searching...</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Results / Empty Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!query.trim() ? (
            <div className="py-4">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                {t.search.quickSuggestions}
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuery(item.query)}
                    className="text-xs sm:text-sm bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-[#dfd5c4] hover:border-emerald-600/40 rounded-lg px-3 py-1.5 transition-colors font-medium text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-[#e8dfcf]">
                <span>
                  {results.length} {t.search.resultsCount}
                </span>
                {usedVectorSearch && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Vector Reranked
                  </span>
                )}
              </div>

              {results.map(({ product, score, matchedBy, matchedTerms }) => {
                const startingPrice = Math.min(...product.variants.map((v) => v.mrp));
                const sizesList = product.variants.map((v) => v.packSize).join(', ');

                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#e2d8c7] hover:border-[#184230] hover:shadow-md transition-all group"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#f5efe4] p-1 shrink-0 overflow-hidden border border-stone-200 flex items-center justify-center">
                      <img
                        src={product.images.primary}
                        alt={product.name[language]}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {matchedBy === 'vector' && (
                          <Badge variant="ayurGreen" className="text-[10px] py-0 px-1.5">
                            <Sparkles className="w-2.5 h-2.5 mr-1" />
                            {t.search.semanticMatchBadge} ({Math.round(score * 100)}%)
                          </Badge>
                        )}
                        {matchedBy === 'hybrid' && (
                          <Badge variant="ayurGold" className="text-[10px] py-0 px-1.5">
                            <Sparkles className="w-2.5 h-2.5 mr-1" />
                            {t.search.hybridMatchBadge}
                          </Badge>
                        )}
                        {matchedBy === 'keyword' && (
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-stone-600">
                            {t.search.keywordMatchBadge}
                          </Badge>
                        )}

                        {matchedTerms && matchedTerms.length > 0 && (
                          <span className="text-[11px] text-stone-500 truncate">
                            Matched: {matchedTerms.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-[#184230] group-hover:text-emerald-700 truncate">
                        {product.name[language]}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-1 mb-1">
                        {product.subtitle[language]}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-500">
                          {t.productCard.availableSizes} <strong className="text-stone-800">{sizesList}</strong>
                        </span>
                        <span className="font-bold text-[#c61d23]">
                          {t.productCard.mrpLabel} {formatPrice(startingPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-stone-400 group-hover:text-[#184230] pl-1">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#184230] mb-1">
                {t.search.noResultsTitle}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                {t.search.noResultsDesc}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

