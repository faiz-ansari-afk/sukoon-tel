import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { siteConfig } from '../data/site-config';
import { Product, ProductVariant } from '../types/product';
import { formatPrice } from '../lib/format-currency';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { Badge } from '../components/ui/badge';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  Building,
  HeartPulse,
} from 'lucide-react';

const products = productsData as Product[];

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const category = categoriesData.find((c) => c.id === product.categoryId);

  // Variant selector state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );

  // Gallery state
  const allImages = [
    product.images.primary,
    product.images.showcase,
    product.images.ad,
    ...(product.images.additional || []),
  ].filter(Boolean) as string[];

  const [activeImage, setActiveImage] = useState<string>(allImages[0] || product.images.primary);

  const primaryPhone = siteConfig.contact.primaryPhone;
  const primaryPhoneFormatted = siteConfig.contact.primaryPhoneFormatted;

  const whatsappUrl = createWhatsAppUrl({
    productName: product.name[language],
    packSize: selectedVariant.packSize,
    mrp: selectedVariant.mrp,
    language,
  });

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-8 overflow-x-auto whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#184230] transition-colors">
            {t.productDetail.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link to="/products" className="hover:text-[#184230] transition-colors">
            {t.productDetail.breadcrumbProducts}
          </Link>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <Link
                to={`/category/${category.slug}`}
                className="hover:text-[#184230] transition-colors"
              >
                {category.name[language]}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="font-bold text-[#184230] truncate">
            {product.name[language]}
          </span>
        </nav>

        {/* Master Product Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#e4d9c7] shadow-sm mb-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Active Hero Image Frame */}
            <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-[#fbf8f2] to-[#f4ece0] border border-[#e8dfcf] p-6 flex items-center justify-center overflow-hidden">
              <img
                src={activeImage}
                alt={product.name[language]}
                className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
              />

              {/* Tagline pill */}
              {product.tagline && (
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#184230] text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{product.tagline[language]}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl bg-[#f8f5ee] border-2 p-1 overflow-hidden shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#184230] ring-2 ring-[#184230]/20'
                        : 'border-[#e4d9c7] hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Variants & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                {category && (
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#184230] bg-emerald-100/70 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors"
                  >
                    {category.name[language]}
                  </Link>
                )}
                <Badge variant="ayurGreen" className="text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  100% Genuine Nageena
                </Badge>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight leading-tight">
                {product.name[language]}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base font-semibold text-[#c61d23]">
                {product.subtitle[language]}
              </p>

              {/* Description */}
              <p className="text-sm text-stone-700 leading-relaxed">
                {product.description[language]}
              </p>

              {/* Variant Selector */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2.5">
                  {t.productDetail.selectPackSize}
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-3 rounded-2xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#184230] bg-[#184230] text-white shadow-md'
                            : 'border-[#dfd4c2] bg-[#fbf9f4] text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="text-xs font-medium opacity-90">{v.packSize}</div>
                        <div className="text-base font-black">
                          {formatPrice(v.mrp)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Pricing Card */}
              <div className="rounded-2xl bg-[#fbf8f2] p-4 sm:p-5 border border-[#e5d9c7] flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium block">
                    {t.productDetail.mrpVerified}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#c61d23] mt-0.5">
                    {formatPrice(selectedVariant.mrp)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Pack: {selectedVariant.packSize}</span>
                  </span>
                </div>
              </div>

              {/* Non-Ecommerce Notice */}
              <div className="rounded-xl bg-amber-50/80 border border-amber-200/80 p-3 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{t.productDetail.nonEcommerceNotice}</span>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div className="space-y-3 pt-4 border-t border-[#e8dfcf]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Call Action */}
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center justify-center gap-2 bg-[#184230] hover:bg-[#113123] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102"
                >
                  <Phone className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[10px] text-emerald-200 uppercase font-semibold">
                      {t.productDetail.callToEnquire}
                    </span>
                    <span className="text-sm font-extrabold">{primaryPhoneFormatted}</span>
                  </div>
                </a>

                {/* WhatsApp Action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.productDetail.whatsappEnquire}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs / Accordions: Ingredients, Directions, Indications, Manufacturer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ingredients & Indications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4d9c7] shadow-xs space-y-6">
            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h3 className="text-lg font-bold text-[#184230] flex items-center gap-2 mb-3 pb-2 border-b border-[#f0e6d8]">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{t.productDetail.ingredientsTitle}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                  {product.ingredients[language].map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-[#fcfaf6] p-2 rounded-lg border border-[#f0e8dc]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Indications */}
            {product.indications && (
              <div>
                <h3 className="text-lg font-bold text-[#184230] flex items-center gap-2 mb-3 pb-2 border-b border-[#f0e6d8]">
                  <HeartPulse className="w-4 h-4 text-[#c61d23]" />
                  <span>{t.productDetail.indicationsTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {product.indications[language].map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Usage & Manufacturer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4d9c7] shadow-xs space-y-6">
            {/* Directions */}
            {product.directions && (
              <div>
                <h3 className="text-lg font-bold text-[#184230] flex items-center gap-2 mb-3 pb-2 border-b border-[#f0e6d8]">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{t.productDetail.directionsTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#fbf9f4] p-4 rounded-2xl border border-[#ede3d4]">
                  {product.directions[language]}
                </p>
              </div>
            )}

            {/* Manufacturer Info */}
            <div>
              <h3 className="text-lg font-bold text-[#184230] flex items-center gap-2 mb-3 pb-2 border-b border-[#f0e6d8]">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>{t.productDetail.manufacturerTitle}</span>
              </h3>
              <div className="text-xs sm:text-sm text-stone-700 space-y-2">
                <p className="font-extrabold text-[#184230]">
                  {product.manufacturer.name}
                </p>
                <p className="text-stone-600 leading-relaxed">
                  {product.manufacturer.address[language]}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="bg-stone-100 text-stone-700 font-semibold px-2.5 py-1 rounded-md border border-stone-200">
                    {product.manufacturer.licenseNo}
                  </span>
                  {product.manufacturer.certifications?.map((cert, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-md border border-emerald-200"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

