import React from 'react';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { createWhatsAppUrl } from '../../lib/whatsapp';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageCircle,
  Building,
  Navigation,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { language, t } = useLanguage();
  const contact = siteConfig.contact;
  const whatsappUrl = createWhatsAppUrl({ language });

  return (
    <section id="location" className="py-16 lg:py-24 bg-gradient-to-b from-[#fbf9f4] via-[#f5ede0] to-[#f4ece0]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c61d23]/10 text-[#c61d23] text-xs font-bold uppercase tracking-wider border border-[#c61d23]/20">
            <MapPin className="w-4 h-4" />
            <span>{language === 'hi' ? 'भौतिक केंद्र' : 'Physical Agency Counter'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight">
            {t.location.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.location.sectionSubtitle}
          </p>
        </div>

        {/* Master Location Showcase Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border-2 border-[#dfd4c2] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Header / Banner on left/top */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#184230] via-[#143728] to-[#0b2118] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
                  <Building className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                    {language === 'hi' ? 'नगीना आयुर्वेदिक एजेंसी' : 'Nageena Ayurvedic Agency'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {language === 'hi' ? 'शेरकोट, जिला बिजनौर' : 'Sherkot, Dist. Bijnor'}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-2 font-medium">
                    Uttar Pradesh, India
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-emerald-800/80 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-medium">{contact.timings[language]}</span>
                  </div>
                  <p className="text-[11px] text-emerald-300/80">
                    Walk in anytime during business hours for genuine product advice.
                  </p>
                </div>
              </div>

              {/* Verified Poster snippet */}
              <div className="mt-8 pt-4 border-t border-emerald-800/80 relative z-10">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs text-xs space-y-1">
                  <span className="font-bold text-amber-300 block">
                    {language === 'hi' ? 'बिजनौर वालों का अपना भरोसेमंद केंद्र' : 'Trusted Local Counter'}
                  </span>
                  <span className="text-stone-300 text-[11px]">
                    Direct stock from Bhiwandi Pharmacy • Genuine MRP guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Address Details & Action Buttons on right */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              {/* Bilingual Address Cards */}
              <div className="space-y-5">
                {/* Hindi Address */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#fbf9f4] border border-[#e4d9c7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c61d23] uppercase tracking-wider mb-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>हिन्दी में पता (Hindi Address)</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#184230] leading-relaxed">
                    {contact.address.fullText.hi}
                  </p>
                </div>

                {/* English Address */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#fbf9f4] border border-[#e4d9c7]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#184230] uppercase tracking-wider mb-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>English Address</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-stone-800 leading-relaxed">
                    {contact.address.fullText.en}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Open Maps, Call Primary, WhatsApp */}
              <div className="space-y-4 pt-2 border-t border-[#ede3d4]">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Google Maps search button */}
                  <a
                    href={contact.address.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#184230] hover:bg-[#113325] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102"
                  >
                    <Navigation className="w-4 h-4 text-amber-300" />
                    <span>{t.location.openMaps}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>

                  {/* Primary Call */}
                  <a
                    href={`tel:${contact.primaryPhone}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#c61d23] hover:bg-[#a6151a] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>Call: {contact.primaryPhoneFormatted}</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-500">Alt Phone:</span>
                    <a
                      href={`tel:${contact.secondaryPhone}`}
                      className="font-bold text-[#184230] hover:underline"
                    >
                      {contact.secondaryPhoneFormatted}
                    </a>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#128C7E] hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.location.whatsAppDirect}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

