import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { SearchModal } from '../search/SearchModal';
import {
  Phone,
  Search,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const contact = siteConfig.contact;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4ede2] via-[#faf7f0] to-[#fbf9f4] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#e8dfcf]">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#184230_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headlines, Highlights, Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dfd4c2] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c61d23] animate-pulse" />
                <span className="text-xs font-bold text-[#184230] tracking-wide">
                  {t.hero.localAvailable}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#184230] tracking-tight leading-[1.15]">
                {t.hero.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                {t.hero.subheadline}
              </p>

              {/* Interactive Search Bar Trigger in Hero */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-full sm:max-w-xl flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border-2 border-[#184230]/25 hover:border-[#184230] shadow-md hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 text-stone-500 group-hover:text-stone-700">
                    <Search className="w-5 h-5 text-[#184230]" />
                    <span className="text-sm sm:text-base font-medium truncate">
                      {t.search.inputPlaceholder}
                    </span>
                  </div>
                  <span className="shrink-0 bg-[#184230] text-white text-xs font-bold px-3 py-1.5 rounded-xl group-hover:bg-[#113123] transition-colors flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Search</span>
                  </span>
                </button>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#184230] hover:bg-[#123627] text-white font-bold px-6 py-3.5 rounded-xl text-base shadow-md shadow-emerald-950/20 transition-all hover:scale-102"
                >
                  <span>{t.hero.exploreProducts}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#f4eee4] text-[#184230] font-bold px-5 py-3.5 rounded-xl text-base border border-[#d8cbb8] shadow-xs transition-colors"
                >
                  <span>{t.hero.browseCategories}</span>
                </a>
              </div>

              {/* Highly Prominent Local Contact Panel */}
              <div className="pt-4 border-t border-[#e2d6c2] flex flex-col sm:flex-row sm:items-center gap-4 text-xs sm:text-sm">
                {/* Primary Call Box */}
                <a
                  href={`tel:${contact.primaryPhone}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-emerald-600/40 shadow-xs hover:border-emerald-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-stone-500 block">
                      {language === 'hi' ? 'सीधे एजेंसी को कॉल करें' : 'Call Agency Direct'}
                    </span>
                    <span className="text-base font-black text-[#184230] tracking-wide">
                      {contact.primaryPhoneFormatted}
                    </span>
                  </div>
                </a>

                {/* Secondary Call */}
                <a
                  href={`tel:${contact.secondaryPhone}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-[#dfd4c2] hover:bg-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-500" />
                  <div>
                    <span className="text-[10px] font-medium text-stone-500 block">
                      {language === 'hi' ? 'वैकल्पिक नंबर' : 'Alternative Phone'}
                    </span>
                    <span className="text-sm font-bold text-stone-800">
                      {contact.secondaryPhoneFormatted}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-emerald-600/20 to-red-500/20 rounded-3xl blur-2xl -z-10" />

                {/* Hero Card with Real Showcase Image */}
                <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-[#dfd4c2] shadow-2xl">
                  <div className="aspect-[4/3] w-full bg-[#f4ede2] overflow-hidden">
                    <img
                      src="/images/banners/trio-showcase.png"
                      alt="Nageena Sukoon Oil Pack Sizes - 50ml, 100ml, 200ml"
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                    />
                  </div>

                  {/* Highlight bar underneath image */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#184230] to-[#113123] text-white">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Sparkles className="w-4 h-4" />
                        <span>भिवंडी निर्मित असली सुकून तेल</span>
                      </div>
                      <span className="text-xs bg-red-600 font-extrabold px-2 py-0.5 rounded text-white">
                        Est. 1993
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-emerald-800/80">
                      <div className="bg-white/10 rounded-lg py-1.5">
                        <div className="text-stone-300 font-medium">50 ml</div>
                        <div className="font-extrabold text-amber-300">₹85</div>
                      </div>
                      <div className="bg-white/10 rounded-lg py-1.5">
                        <div className="text-stone-300 font-medium">100 ml</div>
                        <div className="font-extrabold text-amber-300">₹160</div>
                      </div>
                      <div className="bg-white/10 rounded-lg py-1.5">
                        <div className="text-stone-300 font-medium">200 ml</div>
                        <div className="font-extrabold text-amber-300">₹290</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Store Badge */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-[#dfd4c2] shadow-lg flex items-center gap-3 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-[#c61d23] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left text-xs">
                    <span className="font-bold text-[#184230] block">
                      {language === 'hi' ? 'शेरकोट में भौतिक काउंटर' : 'Physical Store in Sherkot'}
                    </span>
                    <span className="text-stone-600 line-clamp-1">
                      {contact.address.line1[language]}, {contact.address.locality[language]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
