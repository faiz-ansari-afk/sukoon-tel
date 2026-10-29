import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useLanguage } from '../../hooks/useLanguage';
import { formatPrice } from '../../lib/format-currency';
import { siteConfig } from '../../data/site-config';
import { createWhatsAppUrl } from '../../lib/whatsapp';
import categoriesData from '../../data/categories.json';
import { Phone, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const category = categoriesData.find((c) => c.id === product.categoryId);

  const minPrice = Math.min(...product.variants.map((v) => v.mrp));
  const maxPrice = Math.max(...product.variants.map((v) => v.mrp));
  const primaryPhone = siteConfig.contact.primaryPhone;

  const whatsappUrl = createWhatsAppUrl({
    productName: product.name[language],
    packSize: product.variants[0]?.packSize,
    mrp: minPrice,
    language,
  });

  return (
    <div className="group flex flex-col rounded-3xl bg-white border border-[#e4d9c7] shadow-xs hover:shadow-xl hover:border-[#184230]/40 transition-all duration-300 overflow-hidden">
      {/* Product Image Frame */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full bg-gradient-to-b from-[#fbf8f2] to-[#f4ece0] p-4 overflow-hidden"
      >
        <img
          src={product.images.primary}
          alt={product.name[language]}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
          loading="lazy"
        />

        {/* Category Pill */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#184230] shadow-xs border border-stone-200">
              {category.name[language]}
            </span>
          </div>
        )}

        {/* Verified Stock Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#184230] text-white">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            {t.productCard.inStock}
          </span>
        </div>
      </Link>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-extrabold text-[#184230] group-hover:text-[#c61d23] transition-colors leading-snug line-clamp-1 mb-1">
              {product.name[language]}
            </h3>
          </Link>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.subtitle[language]}
          </p>
        </div>

        {/* Available Pack Sizes & Pricing */}
        <div className="bg-[#fcfaf5] rounded-2xl p-3 border border-[#ede3d4] space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>{t.productCard.availableSizes}</span>
            <span className="font-bold text-stone-800">
              {product.variants.map((v) => v.packSize).join(' • ')}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-[#f0e6d8]">
            <span className="text-xs text-stone-500 font-medium">
              {t.productCard.mrpLabel}:
            </span>
            <div className="text-right">
              {minPrice === maxPrice ? (
                <span className="text-lg font-black text-[#c61d23]">
                  {formatPrice(minPrice)}
                </span>
              ) : (
                <span className="text-lg font-black text-[#c61d23]">
                  {formatPrice(minPrice)} – {formatPrice(maxPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: View Details, Call, WhatsApp */}
        <div className="space-y-2 pt-1">
          <Link
            to={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#184230] hover:bg-[#123627] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-colors"
          >
            <span>{t.productCard.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${primaryPhone}`}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#f5efe4] text-[#184230] border border-[#d8cbb8] py-2 px-2 rounded-xl text-xs font-bold transition-colors"
              aria-label={`Call to enquire about ${product.name[language]}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.productCard.enquireCall}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 py-2 px-2 rounded-xl text-xs font-bold transition-colors"
              aria-label={`WhatsApp enquiry for ${product.name[language]}`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.productCard.enquireWhatsApp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

