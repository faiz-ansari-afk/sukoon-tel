import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import categoriesData from '../../data/categories.json';
import { CategoryCard } from '../categories/CategoryCard';
import { Sparkles } from 'lucide-react';

export const CategoryDiscovery: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="categories" className="py-16 lg:py-24 bg-[#fbf9f4] border-b border-[#e8dfcf]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#184230] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ayurvedic Product Ranges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight">
            {t.categories.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.categories.sectionSubtitle}
          </p>
        </div>

        {/* 4 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

