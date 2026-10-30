import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { siteConfig } from '../data/site-config';
import { createWhatsAppUrl } from '../lib/whatsapp';
import { SEO } from '../components/shared/SEO';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  Facebook,
  Send,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const contact = siteConfig.contact;

  const [customMsg, setCustomMsg] = useState('');
  const [userName, setUserName] = useState('');

  const handleSendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const number = contact.whatsappNumber;
    let text = '';
    if (language === 'hi') {
      text = `नमस्ते नगीना आयुर्वेदिक एजेंसी शेरकोट!`;
      if (userName.trim()) text += ` मेरा नाम ${userName} है।`;
      if (customMsg.trim()) text += ` संदेश: ${customMsg}`;
    } else {
      text = `Hello Nageena Ayurvedic Agency Sherkot!`;
      if (userName.trim()) text += ` My name is ${userName}.`;
      if (customMsg.trim()) text += ` Enquiry: ${customMsg}`;
    }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10 sm:py-16">
      <SEO
        title="Contact & Location | Nageena Ayurvedic Agency Sherkot"
        description="नगीना आयुर्वेदिक एजेंसी, चुंगी नंबर 5, मोहल्ला खुर्राड़ा, शेरकोट (बिजनौर)। काउंटर उपलब्धता व उत्पाद पूछताछ के लिए सीधे कॉल या व्हाट्सएप करें: +91 94121 34692."
      />
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#c61d23] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सीधा संपर्क एवं पता' : 'Direct Agency Contact'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#184230] tracking-tight">
            {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact Nageena Agency'}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            {language === 'hi'
              ? 'शेरकोट स्थित हमारी एजेंसी पर पधारें अथवा कॉल और व्हाट्सएप के माध्यम से तुरंत जानकारी प्राप्त करें।'
              : 'Visit our agency counter in Sherkot or reach us immediately via phone call and WhatsApp message.'}
          </p>
        </div>

        {/* Top 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Primary Phone */}
          <a
            href={`tel:${contact.primaryPhone}`}
            className="flex flex-col p-6 rounded-3xl bg-white border-2 border-emerald-600/30 shadow-sm hover:border-[#184230] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#184230] flex items-center justify-center mb-4 group-hover:bg-[#184230] group-hover:text-white transition-colors">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xs font-bold uppercase text-stone-500 mb-1">
              {language === 'hi' ? 'प्राथमिक कॉल नंबर' : 'Primary Phone'}
            </span>
            <span className="text-lg font-black text-[#184230]">
              {contact.primaryPhoneFormatted}
            </span>
            <span className="text-xs text-stone-500 mt-2">
              Tap to call directly from mobile
            </span>
          </a>

          {/* Secondary Phone */}
          <a
            href={`tel:${contact.secondaryPhone}`}
            className="flex flex-col p-6 rounded-3xl bg-white border border-[#e4d9c7] shadow-sm hover:border-[#184230] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase text-stone-500 mb-1">
              {language === 'hi' ? 'वैकल्पिक नंबर' : 'Alternative Phone'}
            </span>
            <span className="text-lg font-black text-stone-800">
              {contact.secondaryPhoneFormatted}
            </span>
            <span className="text-xs text-stone-500 mt-2">
              Customer support & enquiries
            </span>
          </a>

          {/* WhatsApp Action */}
          <a
            href={createWhatsAppUrl({ language })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-3xl bg-white border border-[#25D366]/30 shadow-sm hover:border-[#25D366] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase text-stone-500 mb-1">
              WhatsApp Chat
            </span>
            <span className="text-lg font-black text-[#128C7E]">
              +{contact.whatsappNumber}
            </span>
            <span className="text-xs text-stone-500 mt-2">
              Instant chat for product enquiries
            </span>
          </a>
        </div>

        {/* Detailed Address Showcase & Map Link Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e4d9c7] shadow-sm mb-12 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#f0e6d8]">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#c61d23] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#184230]">
                {language === 'hi' ? 'शेरकोट एजेंसी का आधिकारिक पता' : 'Physical Agency Address in Sherkot'}
              </h2>
              <span className="text-xs text-stone-500">
                District Bijnor, Uttar Pradesh, India
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hindi Address */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#e8dfcf] space-y-2">
              <span className="text-xs font-bold uppercase text-[#c61d23] tracking-wide block">
                हिन्दी में पता:
              </span>
              <p className="text-base font-bold text-[#184230] leading-relaxed">
                {contact.address.fullText.hi}
              </p>
            </div>

            {/* English Address */}
            <div className="p-5 rounded-2xl bg-[#fbf9f4] border border-[#e8dfcf] space-y-2">
              <span className="text-xs font-bold uppercase text-[#184230] tracking-wide block">
                English Address:
              </span>
              <p className="text-sm sm:text-base font-bold text-stone-800 leading-relaxed">
                {contact.address.fullText.en}
              </p>
            </div>
          </div>

          {/* Timings and Map Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#f0e6d8]">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">{contact.timings[language]}</span>
            </div>

            <a
              href={contact.address.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#184230] hover:bg-[#123627] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{t.location.openMaps}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Facebook Page and WhatsApp Fast Enquiry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Facebook Official Page */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#1877F2]/10 to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-200/60 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md">
                <Facebook className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-stone-900">
                {language === 'hi' ? 'आधिकारिक फेसबुक पेज' : 'Official Facebook Page'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'hi'
                  ? 'नवीनतम उत्पाद उपलब्धता, स्थानीय अपडेट और सूचनाओं के लिए हमारे आधिकारिक फेसबुक पेज से जुड़ें।'
                  : 'Follow our official Facebook community page for recent announcements and authentic product updates.'}
              </p>
            </div>

            <a
              href={contact.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-sm py-3 px-5 rounded-xl shadow-md transition-colors"
            >
              <span>{t.footer.followOnFacebook}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick WhatsApp Message Box */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e4d9c7] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-800">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <h3 className="text-lg font-bold text-[#184230]">
                {language === 'hi' ? 'त्वरित व्हाट्सएप पूछताछ भेजें' : 'Send Fast WhatsApp Message'}
              </h3>
            </div>

            <form onSubmit={handleSendCustomWhatsApp} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  {language === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Name (Optional)'}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. राजेश कुमार' : 'e.g. John Doe'}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#fbf9f4] text-xs sm:text-sm focus:outline-none focus:border-[#184230]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  {language === 'hi' ? 'आपका प्रश्न या पूछताछ' : 'Your Enquiry / Question'}
                </label>
                <textarea
                  rows={3}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. मुझे नगीना सुकून तेल २०० मिली की उपलब्धता जाननी है...'
                      : 'e.g. I would like to know if Nageena Sukoon Oil 200ml is available...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#fbf9f4] text-xs sm:text-sm focus:outline-none focus:border-[#184230]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>
                  {language === 'hi' ? 'व्हाट्सएप पर संदेश भेजें' : 'Send via WhatsApp'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
