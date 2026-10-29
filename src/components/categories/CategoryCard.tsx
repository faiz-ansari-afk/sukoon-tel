import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/category';
import { useLanguage } from '../../hooks/useLanguage';
import productsData from '../../data/products.json';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { language, t } = useLanguage();

  // Calculate actual product count dynamically from catalogue JSON
  const productCount = productsData.filter((p) => p.categoryId === category.id).length;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-[#e4d9c7] shadow-sm hover:shadow-xl hover:border-[#184230]/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Visual Image Header */}
      <div className="relative h-48 sm:h-56 w-full bg-[#f4ede2] overflow-hidden">
        <img
          src={category.image}
          alt={category.name[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#184230]/90 text-white backdrop-blur-xs border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {category.badge[language]}
          </span>
        </div>

        {/* Product Count Pill */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-full bg-white/95 text-[#184230] shadow-sm">
            {productCount} {t.categories.productCount}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#184230] group-hover:text-emerald-800 transition-colors mb-2">
            {category.name[language]}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {category.shortDescription[language]}
          </p>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-[#f0e6d8] flex items-center justify-between text-xs sm:text-sm font-bold text-[#184230] group-hover:text-[#c61d23] transition-colors">
          <span>{t.categories.viewCategory}</span>
          <div className="w-8 h-8 rounded-full bg-[#f4ede2] group-hover:bg-[#c61d23] group-hover:text-white flex items-center justify-center transition-all">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

