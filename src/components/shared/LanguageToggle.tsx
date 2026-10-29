import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full bg-[#ede5d6] p-1 border border-[#dfd4c2] text-xs font-semibold shadow-inner ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-stone-600" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          language === 'hi'
            ? 'bg-[#184230] text-white shadow-sm font-bold'
            : 'text-stone-700 hover:text-stone-900'
        }`}
        aria-pressed={language === 'hi'}
      >
        हिन्दी
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          language === 'en'
            ? 'bg-[#184230] text-white shadow-sm font-bold'
            : 'text-stone-700 hover:text-stone-900'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
    </div>
  );
};

