import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SEO } from '../components/shared/SEO';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Product } from '../types/product';
import { ProductCard } from '../components/products/ProductCard';
import { Search, Filter, Sparkles, X } from 'lucide-react';

const products = productsData as Product[];

export const ProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.categoryId !== selectedCategory) {
        return false;
      }

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameEn = prod.name.en.toLowerCase();
        const nameHi = prod.name.hi.toLowerCase();
        const descEn = prod.description.en.toLowerCase();
        const descHi = prod.description.hi.toLowerCase();
        const sizes = prod.variants.map((v) => v.packSize.toLowerCase()).join(' ');
        const prices = prod.variants.map((v) => v.mrp.toString()).join(' ');
        const keywords = [
          ...(prod.searchKeywords?.en || []),
          ...(prod.searchKeywords?.hi || []),
        ].join(' ').toLowerCase();

        const matches =
          nameEn.includes(q) ||
          nameHi.includes(q) ||
          descEn.includes(q) ||
          descHi.includes(q) ||
          sizes.includes(q) ||
          prices.includes(q) ||
          keywords.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10 sm:py-16">
      <SEO
        title="All Ayurvedic Products | Nageena Ayurvedic Agency Sherkot"
        description="शेरकोट (बिजनौर) में सभी असली नगीना आयुर्वेदिक उत्पाद देखें — सुकून तेल, ऑनियन हेयर ऑयल, रहनुमा केश तेल व दर्द निवारक तेल। संपूर्ण एमआरपी व जानकारी।"
      />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-10 space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#184230] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#184230] tracking-tight">
            {language === 'hi' ? 'सभी आयुर्वेदिक उत्पाद' : 'All Ayurvedic Products'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'असली नगीना आयुर्वेदिक उत्पाद, निर्धारित एमआरपी (MRP) एवं उपलब्ध पैक साइज़। अधिक जानकारी व उपलब्धता के लिए सीधे कॉल या व्हाट्सएप करें।'
              : 'Explore original Nageena Ayurvedic formulations, verified MRP, and pack sizes directly available at our Sherkot agency.'}
          </p>
        </div>

        {/* Filter Controls: In-Page Search & Category Tabs */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e4d9c7] shadow-xs mb-10 space-y-5">
          {/* Search input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'उत्पाद का नाम, पैक साइज़ (उदा. १०० मिली, ५० मिली) या दर्द निवारक खोजें...'
                  : 'Search by product name, pack size (e.g. 100 ml, 50 ml) or symptom...'
              }
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-stone-200 bg-[#faf8f3] text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#184230] text-sm transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                aria-label="Clear filter"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#184230] text-white shadow-sm'
                  : 'bg-[#faf8f3] text-stone-700 hover:bg-[#ede3d4] border border-[#e2d7c5]'
              }`}
            >
              {language === 'hi' ? 'सभी श्रेणियाँ' : 'All Categories'} ({products.length})
            </button>

            {categoriesData.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#184230] text-white shadow-sm'
                      : 'bg-[#faf8f3] text-stone-700 hover:bg-[#ede3d4] border border-[#e2d7c5]'
                  }`}
                >
                  {cat.name[language]} ({count})
                </button>
              );
            })}
          </div>

          {/* Active Results Summary */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-[#f0e6d8]">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {products.length} products
            </span>
            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-[#c61d23] font-bold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e4d9c7] p-8 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#184230] mb-1">
              {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No Products Found'}
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              {language === 'hi'
                ? 'कृपया दूसरा खोज शब्द दर्ज करें या सभी श्रेणियाँ चुनें।'
                : 'Try clearing your search term or selecting "All Categories".'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#184230] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
