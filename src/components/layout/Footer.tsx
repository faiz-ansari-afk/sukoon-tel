import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../shared/LanguageToggle';
import { createWhatsAppUrl } from '../../lib/whatsapp';
import categoriesData from '../../data/categories.json';
import {
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  Facebook,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const contact = siteConfig.contact;
  const whatsappUrl = createWhatsAppUrl({ language });

  return (
    <footer className="bg-[#122e22] text-[#e6ece8] border-t-4 border-[#c61d23] pt-14 pb-24 md:pb-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Agency Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c61d23] to-[#8e0d12] flex items-center justify-center text-white font-serif font-black text-xl shadow-md border border-red-500/30">
                <span>N</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white tracking-tight">
                  {language === 'hi' ? 'नगीना आयुर्वेदिक एजेंसी' : 'NAGEENA'}
                </h3>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
                  {language === 'hi' ? 'शेरकोट, बिजनौर (उ.प्र.)' : 'Sherkot, Bijnor (U.P.)'}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#b8c9c0] leading-relaxed">
              {t.footer.aboutAgency}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase text-stone-400 tracking-wider block mb-2">
                Language / भाषा चयन
              </span>
              <LanguageToggle />
            </div>
          </div>

          {/* Column 2: 4 Primary Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase text-white tracking-wider mb-4 pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t.footer.categories}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categoriesData.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-[#c7d8ce] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-400 text-xs">▸</span>
                    <span>{cat.name[language]}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                >
                  <span>{t.nav.products}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Prominent Contact & Phone Numbers */}
          <div>
            <h4 className="text-sm font-bold uppercase text-white tracking-wider mb-4 pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3.5 text-sm">
              <div>
                <span className="text-xs text-stone-400 block mb-1">
                  {language === 'hi' ? 'प्राथमिक दूरभाष (Primary Call)' : 'Primary Contact'}:
                </span>
                <a
                  href={`tel:${contact.primaryPhone}`}
                  className="inline-flex items-center gap-2 text-lg font-black text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{contact.primaryPhoneFormatted}</span>
                </a>
              </div>

              <div>
                <span className="text-xs text-stone-400 block mb-1">
                  {language === 'hi' ? 'वैकल्पिक दूरभाष (Alt Phone)' : 'Alternative Number'}:
                </span>
                <a
                  href={`tel:${contact.secondaryPhone}`}
                  className="inline-flex items-center gap-2 text-base font-bold text-white hover:text-amber-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{contact.secondaryPhoneFormatted}</span>
                </a>
              </div>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-[#54eb8b] hover:bg-[#25D366]/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: +{contact.whatsappNumber}</span>
                </a>
              </div>

              {/* Verified Facebook Link */}
              <div className="pt-2">
                <a
                  href={contact.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#70aeff] hover:bg-[#1877F2]/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span>{t.footer.followOnFacebook}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Physical Address & Manufacturer Details */}
          <div>
            <h4 className="text-sm font-bold uppercase text-white tracking-wider mb-4 pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {language === 'hi' ? 'एजेंसी पता (शेरकोट)' : 'Physical Agency Address'}
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-white font-medium leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c61d23] shrink-0 mt-1" />
                <span>{contact.address.fullText[language]}</span>
              </p>

              <div className="flex items-center gap-2 text-xs text-amber-200 pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{contact.timings[language]}</span>
              </div>

              <div className="pt-2">
                <a
                  href={contact.address.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#184230] hover:bg-emerald-900 text-white text-xs font-bold px-3 py-2 rounded-lg border border-emerald-600/50 transition-colors"
                >
                  <span>{t.location.openMaps}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </div>

              {/* Manufacturer Reference */}
              <div className="pt-3 border-t border-emerald-800/50 text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5 text-stone-300 font-semibold mb-0.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'hi' ? 'निर्माता: नगीना आयुर्वेदिक फार्मेसी' : 'Mfg: Nageena Ayurvedic Pharmacy'}
                  </span>
                </div>
                <span>Bhiwandi, Maharashtra (Est. 1993 • ISO 9001:2018)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-emerald-900/80 text-xs text-stone-400 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            {t.footer.disclaimer}
          </p>
          <p className="font-medium text-stone-400 shrink-0">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

