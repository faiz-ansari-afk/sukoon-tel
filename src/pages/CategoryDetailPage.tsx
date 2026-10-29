import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import { ProductGrid } from '../components/products/ProductGrid';
import { ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

const products = productsData as Product[];

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const category = categoriesData.find((c) => c.slug === slug);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const categoryProducts = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#184230] transition-colors">
            {t.productDetail.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link to="/products" className="hover:text-[#184230] transition-colors">
            {t.productDetail.breadcrumbProducts}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-bold text-[#184230]">{category.name[language]}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#184230] via-[#143728] to-[#0d2319] text-white p-8 sm:p-12 mb-12 shadow-xl border border-emerald-800">
          <div className="max-w-2xl space-y-4 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{category.badge[language]}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {category.name[language]}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {category.fullDescription[language]}
            </p>

            <div className="pt-2 text-xs text-amber-300 font-semibold">
              Showing {categoryProducts.length} verified product variants in this range
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block overflow-hidden pointer-events-none">
            <img
              src={category.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#184230] hover:text-[#c61d23] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {language === 'hi' ? 'सभी उत्पाद देखें' : 'Back to All Products'}
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
};

