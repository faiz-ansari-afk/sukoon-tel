import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fbf9f4] px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-[#e4d9c7] shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-black text-2xl font-serif">
          404
        </div>

        <h1 className="text-2xl font-black text-[#184230]">
          {language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page Not Found'}
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed">
          {language === 'hi'
            ? 'क्षमा करें, आप जिस पृष्ठ की तलाश कर रहे हैं वह उपलब्ध नहीं है।'
            : 'The page you requested could not be found or has moved.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#184230] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#123627] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Go to Home'}</span>
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#f4ece0] text-[#184230] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#ede2d2] transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'hi' ? 'उत्पाद देखें' : 'Browse Products'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
