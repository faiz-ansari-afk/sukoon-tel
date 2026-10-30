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
import categoriesData from '../../data/categories.json';
import {
  Search,
  X,
  ArrowRight,
  Loader2,
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

  const popularSuggestions = language === 'hi' ? [
    { label: 'नगीना सुकून तेल', query: 'सुकून तेल' },
    { label: '१०० मिली तेल', query: '100ml' },
    { label: 'ऑनियन हेयर ऑयल', query: 'ऑनियन' },
    { label: 'रहनुमा केश तेल', query: 'रहनुमा' },
    { label: 'सुकून पेन किलर', query: 'पेन किलर' },
    { label: 'कमर व जोड़ों का दर्द', query: 'दर्द' },
    { label: 'बालों का झड़ना', query: 'बाल' },
  ] : [
    { label: 'Sukoon Oil 100ml', query: 'Sukoon Oil 100ml' },
    { label: 'Onion Hair Oil', query: 'Onion Hair Oil' },
    { label: 'Rehnuma Kesh Tel', query: 'Rehnuma' },
    { label: 'Sukoon Pain Killer', query: 'Pain Killer' },
    { label: 'Backache & Joint Pain', query: 'pain relief' },
    { label: 'Hair Fall Care', query: 'hair oil' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-[#faf8f3] border-[#e2d8c7]">
        {/* Header and Search Input */}
        <div className="p-4 sm:p-6 border-b border-[#e2d8c7] bg-white">
          <DialogHeader className="mb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base sm:text-lg flex items-center gap-2 text-[#184230]">
                <Search className="w-5 h-5 text-[#184230]" />
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
              className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-[#184230]/20 bg-[#faf8f3] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#184230] text-sm sm:text-base transition-colors"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              {isSearching && (
                <Loader2 className="w-4 h-4 animate-spin text-[#184230]" />
              )}
              {query && (
                <button
                  type="button"
                  onClick={clear}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
                  aria-label={t.search.clearQuery}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results / Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!query.trim() ? (
            <div className="py-2">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
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
              <div className="text-xs text-stone-500 pb-1 border-b border-[#e8dfcf]">
                <span>
                  {results.length} {t.search.resultsCount}
                </span>
              </div>

              {results.map(({ product }) => {
                const startingPrice = Math.min(...product.variants.map((v) => v.mrp));
                const sizesList = product.variants.map((v) => v.packSize).join(', ');
                const category = categoriesData.find((c) => c.id === product.categoryId);

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
                      {category && (
                        <div className="mb-1">
                          <Badge variant="ayurGreen" className="text-[10px] py-0 px-2 font-semibold">
                            {category.name[language]}
                          </Badge>
                        </div>
                      )}

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
