import React from 'react';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { createWhatsAppUrl } from '../../lib/whatsapp';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StickyCallBar: React.FC = () => {
  const { language, t } = useLanguage();
  const primaryPhone = siteConfig.contact.primaryPhone;
  const whatsappUrl = createWhatsAppUrl({ language });

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dfd4c2] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 py-2.5">
      <div className="flex items-center gap-2">
        {/* Direct Call Button (Dominant) */}
        <a
          href={`tel:${primaryPhone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#184230] hover:bg-[#123627] text-white py-3 px-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
          aria-label={`Call Nageena Agency at ${primaryPhone}`}
        >
          <Phone className="w-4 h-4 text-emerald-300 animate-pulse" />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
              {t.mobileBar.callNow}
            </span>
            <span className="text-sm font-extrabold">{primaryPhone}</span>
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 px-3.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
        </a>

        {/* Store Location Button */}
        <Link
          to="/contact"
          className="flex items-center justify-center p-3 bg-[#f5efe4] text-[#184230] border border-[#dfd4c2] rounded-xl hover:bg-[#ece2d0] transition-colors"
          aria-label={t.mobileBar.viewAddress}
          title={t.mobileBar.viewAddress}
        >
          <MapPin className="w-5 h-5 text-[#c61d23]" />
        </Link>
      </div>
    </div>
  );
};

