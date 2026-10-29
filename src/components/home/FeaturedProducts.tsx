import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import productsData from '../../data/products.json';
import { Product } from '../../types/product';
import { ProductGrid } from '../products/ProductGrid';
import { Sparkles, ArrowRight } from 'lucide-react';

const products = productsData as Product[];

export const FeaturedProducts: React.FC = () => {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.featured);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#e8dfcf]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Authentic Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight">
              {t.featured.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {t.featured.sectionSubtitle}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 self-start md:self-end font-bold text-sm text-[#184230] hover:text-[#c61d23] transition-colors pb-1 border-b-2 border-[#184230] hover:border-[#c61d23]"
          >
            <span>{t.featured.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Products Grid */}
        <ProductGrid products={featured} />
      </div>
    </section>
  );
};

