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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5dccf] shadow-xs">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
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

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link
                to="/"
                className={`text-sm font-bold transition-colors py-1 ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-[#184230] border-b-2 border-[#184230]'
                    : 'text-stone-600 hover:text-[#184230]'
                }`}
              >
                {t.nav.home}
              </Link>

              <Link
                to="/products"
                className={`text-sm font-bold transition-colors py-1 ${
                  isActive('/products')
                    ? 'text-[#184230] border-b-2 border-[#184230]'
                    : 'text-stone-600 hover:text-[#184230]'
                }`}
              >
                {t.nav.products}
              </Link>

              {/* Categories dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`text-sm font-bold flex items-center gap-1 py-1 transition-colors ${
                    isActive('/category')
                      ? 'text-[#184230] border-b-2 border-[#184230]'
                      : 'text-stone-600 hover:text-[#184230]'
                  }`}
                  aria-expanded={categoriesDropdownOpen}
                >
                  <span>{t.nav.categories}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {categoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#e5dccf] py-2 z-50 animate-in fade-in-50 zoom-in-95">
                    {categoriesData.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 text-stone-700 hover:text-[#184230] transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#184230]" />
                        <span className="text-xs sm:text-sm font-semibold">
                          {cat.name[language]}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`text-sm font-bold transition-colors py-1 ${
                  isActive('/about')
                    ? 'text-[#184230] border-b-2 border-[#184230]'
                    : 'text-stone-600 hover:text-[#184230]'
                }`}
              >
                {t.nav.about}
              </Link>

              <Link
                to="/contact"
                className={`text-sm font-bold transition-colors py-1 ${
                  isActive('/contact')
                    ? 'text-[#184230] border-b-2 border-[#184230]'
                    : 'text-stone-600 hover:text-[#184230]'
                }`}
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right side controls: Search trigger, Language toggle, Call button */}
            <div className="flex items-center gap-3">
              {/* Search button trigger */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f5efe4] hover:bg-[#ede3d3] border border-[#dfd4c2] text-stone-600 text-xs sm:text-sm font-medium transition-colors"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 text-[#184230]" />
                <span className="hidden sm:inline">{t.nav.search}</span>
                <span className="hidden md:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 font-mono">
                  ⌘K
                </span>
              </button>

              {/* Language Toggle */}
              <LanguageToggle className="hidden sm:inline-flex" />

              {/* Call Now button */}
              <a
                href={`tel:${primaryPhone}`}
                className="hidden md:inline-flex items-center gap-2 bg-[#184230] hover:bg-[#123627] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-950/20 border border-emerald-700/40 transition-all hover:scale-102"
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
                className="lg:hidden p-2.5 rounded-xl bg-[#f5efe4] text-stone-700 hover:bg-[#eae0cf] transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
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
