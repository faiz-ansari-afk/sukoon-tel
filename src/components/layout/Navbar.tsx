import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../shared/LanguageToggle';
import { SearchModal } from '../search/SearchModal';
import {
  Phone,
  Search,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import categoriesData from '../../data/categories.json';

export const Navbar: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const primaryPhone = siteConfig.contact.primaryPhone;
  const primaryPhoneFormatted = siteConfig.contact.primaryPhoneFormatted;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md shadow-xs">
        {/* ================= MAIN PRIMARY NAVBAR ================= */}
        <div className="border-b border-[#e5dccf]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-4">
              {/* Brand Logo & Name */}
              <Link
                to="/"
                className="flex items-center gap-3 group focus:outline-none shrink-0"
                aria-label="Nageena Ayurvedic Agency Home"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#184230] to-[#0d261b] flex items-center justify-center text-white font-serif font-black text-2xl shadow-md border border-emerald-700/50 group-hover:scale-105 transition-transform">
                  <span>N</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-[#184230] leading-tight">
                    {language === 'hi' ? 'नगीना आयुर्वेदिक' : 'NAGEENA'}
                  </span>
                  <span className="text-xs font-semibold text-[#c61d23] tracking-wider uppercase flex items-center gap-1">
                    <span>
                      {language === 'hi' ? 'एजेंसी • शेरकोट (बिजनौर)' : 'Ayurvedic Agency • Sherkot'}
                    </span>
                  </span>
                </div>
              </Link>

              {/* Center: Prominent Search Trigger Bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#faf7f0] hover:bg-[#f3ede1] border border-[#dfd4c2] text-stone-500 hover:text-stone-800 text-xs sm:text-sm transition-all shadow-xs group overflow-hidden"
                  aria-label="Open search dialog"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Search className="w-4 h-4 text-[#184230] shrink-0" />
                    <span className="truncate block">{t.search.inputPlaceholder}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[10px] bg-white text-stone-500 font-mono px-1.5 py-0.5 rounded border border-stone-200">
                      ⌘K
                    </span>
                    <span className="text-[11px] font-bold text-[#184230] bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{language === 'hi' ? 'सर्च' : 'AI Search'}</span>
                    </span>
                  </div>
                </button>
              </div>

              {/* Right side controls: Search trigger (mobile), Language toggle, Call button */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Search button trigger for mobile */}
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="md:hidden p-2.5 rounded-xl bg-[#f5efe4] text-stone-700 hover:bg-[#ede3d3] border border-[#dfd4c2] transition-colors"
                  aria-label="Open search dialog"
                >
                  <Search className="w-5 h-5 text-[#184230]" />
                </button>

                {/* Language Toggle */}
                <LanguageToggle className="hidden sm:inline-flex" />

                {/* Call Now button */}
                <a
                  href={`tel:${primaryPhone}`}
                  className="hidden sm:inline-flex items-center gap-2.5 bg-[#184230] hover:bg-[#123627] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-950/20 border border-emerald-700/40 transition-all hover:scale-102"
                  aria-label={`Call Nageena Ayurvedic Agency at ${primaryPhoneFormatted}`}
                >
                  <Phone className="w-4 h-4 animate-bounce text-emerald-300" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] text-emerald-200 uppercase font-semibold">
                      {t.nav.callNow}
                    </span>
                    <span className="text-xs font-extrabold tracking-wide">
                      {primaryPhone}
                    </span>
                  </div>
                </a>

                {/* Mobile menu toggle button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-[#f5efe4] text-stone-700 hover:bg-[#eae0cf] transition-colors border border-[#dfd4c2]"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECONDARY NAVBAR (JUST BELOW MAIN NAVBAR) ================= */}
        <div className="hidden lg:block bg-[#faf7f0] border-b border-[#e5dccf] shadow-xs">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-12">
              {/* Secondary Navigation Links */}
              <nav className="flex items-center gap-8">
                {/* 1. Home */}
                <Link
                  to="/"
                  className={`text-sm font-semibold transition-all py-3 border-b-2 flex items-center ${
                    isActive('/') && location.pathname === '/'
                      ? 'text-[#184230] border-[#184230] font-bold'
                      : 'text-stone-700 hover:text-[#184230] border-transparent'
                  }`}
                >
                  {t.nav.home}
                </Link>

                {/* 2. All Products */}
                <Link
                  to="/products"
                  className={`text-sm font-semibold transition-all py-3 border-b-2 flex items-center ${
                    isActive('/products')
                      ? 'text-[#184230] border-[#184230] font-bold'
                      : 'text-stone-700 hover:text-[#184230] border-transparent'
                  }`}
                >
                  {t.nav.products}
                </Link>

                {/* 3. Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setCategoriesDropdownOpen(true)}
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`text-sm font-semibold flex items-center gap-1.5 py-3 border-b-2 transition-all ${
                      isActive('/category')
                        ? 'text-[#184230] border-[#184230] font-bold'
                        : 'text-stone-700 hover:text-[#184230] border-transparent'
                    }`}
                    aria-expanded={categoriesDropdownOpen}
                  >
                    <span>{t.nav.categories}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                  </button>

                  {categoriesDropdownOpen && (
                    <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#e5dccf] py-2 z-50 animate-in fade-in-50 zoom-in-95">
                      <div className="px-4 py-2 border-b border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        {language === 'hi' ? 'आयुर्वेदिक श्रेणियाँ' : 'Product Categories'}
                      </div>
                      {categoriesData.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 text-stone-700 hover:text-[#184230] transition-colors group"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#184230] group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-semibold leading-tight">
                              {cat.name[language]}
                            </span>
                            <span className="text-[10px] text-stone-400 group-hover:text-emerald-700">
                              {cat.badge[language]}
                            </span>
                          </div>
                        </Link>
                      ))}
                      <div className="mt-1 pt-1 border-t border-stone-100 px-4 py-1.5">
                        <Link
                          to="/products"
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="text-xs font-bold text-[#c61d23] hover:underline"
                        >
                          {language === 'hi' ? 'सभी उत्पाद देखें →' : 'View All Products →'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. About Us */}
                <Link
                  to="/about"
                  className={`text-sm font-semibold transition-all py-3 border-b-2 flex items-center ${
                    isActive('/about')
                      ? 'text-[#184230] border-[#184230] font-bold'
                      : 'text-stone-700 hover:text-[#184230] border-transparent'
                  }`}
                >
                  {t.nav.about}
                </Link>

                {/* 5. Contact & Location */}
                <Link
                  to="/contact"
                  className={`text-sm font-semibold transition-all py-3 border-b-2 flex items-center ${
                    isActive('/contact')
                      ? 'text-[#184230] border-[#184230] font-bold'
                      : 'text-stone-700 hover:text-[#184230] border-transparent'
                  }`}
                >
                  {t.nav.contact}
                </Link>
              </nav>

              {/* Right Side Info: Physical Location & Guarantee */}
              <div className="flex items-center gap-4 text-xs font-medium text-stone-600">
                <Link
                  to="/contact"
                  className="flex items-center gap-1.5 hover:text-[#184230] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c61d23]" />
                  <span>
                    {language === 'hi'
                      ? 'चुंगी नं. 5, मोहल्ला खुरारा, शेरकोट'
                      : 'Chungi No. 5, Mohalla Khurara, Sherkot'}
                  </span>
                </Link>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {language === 'hi' ? 'असली भिवंडी फार्मेसी स्टॉक' : '100% Genuine Pharmacy Stock'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE / TABLET SECONDARY SCROLLABLE BAR ================= */}
        <div className="lg:hidden bg-[#faf7f0] border-b border-[#e5dccf] px-3 py-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/products"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/products')
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {t.nav.products}
            </Link>
            <Link
              to="/category/massage-oils"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/category/massage-oils'
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {language === 'hi' ? 'मालिश तेल' : 'Massage Oils'}
            </Link>
            <Link
              to="/category/pain-relief"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/category/pain-relief'
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {language === 'hi' ? 'पेन किलर' : 'Pain Relief'}
            </Link>
            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {t.nav.about}
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'bg-[#184230] text-white font-bold'
                  : 'bg-white text-stone-700 border border-[#dfd4c2]'
              }`}
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>

        {/* ================= MOBILE MENU DRAWER ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e5dccf] bg-[#fbf9f4] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dccf]">
              <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                Language / भाषा
              </span>
              <LanguageToggle />
            </div>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-bold text-stone-800 hover:bg-white transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-bold text-stone-800 hover:bg-white transition-colors"
              >
                {t.nav.products}
              </Link>

              {/* Mobile category accordion */}
              <div className="pl-3 py-1 space-y-1">
                <span className="text-xs font-bold text-[#184230] uppercase tracking-wide">
                  {t.nav.categories}:
                </span>
                {categoriesData.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm font-semibold text-stone-600 hover:text-[#184230]"
                  >
                    • {cat.name[language]}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-bold text-stone-800 hover:bg-white transition-colors"
              >
                {t.nav.about}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-bold text-stone-800 hover:bg-white transition-colors"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Quick action buttons in mobile drawer */}
            <div className="pt-2 space-y-2">
              <a
                href={`tel:${primaryPhone}`}
                className="w-full flex items-center justify-center gap-2 bg-[#184230] text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>
                  {t.nav.callNow}: {primaryPhoneFormatted}
                </span>
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-[#dfd4c2] text-stone-800 py-2.5 rounded-xl font-semibold text-sm"
              >
                <MapPin className="w-4 h-4 text-[#c61d23]" />
                <span>Sherkot Store Location</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};
