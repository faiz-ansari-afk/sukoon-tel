import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { siteConfig } from '../data/site-config';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const contact = siteConfig.contact;

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10 sm:py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#184230] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'hi' ? 'एजेंसी परिचय' : 'About Our Agency'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#184230] tracking-tight">
            {language === 'hi'
              ? 'नगीना आयुर्वेदिक एजेंसी, शेरकोट (बिजनौर)'
              : 'Nageena Ayurvedic Agency, Sherkot'}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'hi'
              ? 'बिजनौर जिले के लोगों तक १९९३ से भिवंडी निर्मित असली व प्रामाणिक नगीना आयुर्वेदिक उत्पाद पहुंचाने का विश्वसनीय स्थानीय केंद्र।'
              : 'Your trusted local agency bringing genuine Bhiwandi-manufactured Nageena Ayurvedic formulations directly to customers in Sherkot and Bijnor district.'}
          </p>
        </div>

        {/* Narrative Card 1: Our Agency Mission */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e4d9c7] shadow-sm mb-8 space-y-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#184230] flex items-center justify-center mb-2">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#184230]">
            {language === 'hi' ? 'हमारा उद्देश्य एवं स्थानीय उपस्थिति' : 'Our Local Mission in Sherkot'}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {language === 'hi'
              ? 'नगीना आयुर्वेदिक एजेंसी की स्थापना शेरकोट (बिजनौर, उत्तर प्रदेश) में स्थानीय ग्राहकों की सुविधा हेतु की गई है। बाजार में कई प्रकार के मिलावटी और अनधिकृत तेलों के प्रचलन को देखते हुए, हमारी एजेंसी का प्रमुख उद्देश्य ग्राहकों को सीधे भिवंडी स्थित मूल फार्मेसी द्वारा निर्मित असली नगीना उत्पाद उपलब्ध कराना है।'
              : 'Nageena Ayurvedic Agency was established in Sherkot, Bijnor to serve local families seeking authentic Ayurvedic formulations. In a market where unauthorized duplicates exist, our counter ensures you receive verified, unadulterated products with original seals, correct bottle volumes, and official MRP.'}
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {language === 'hi'
              ? 'हमारा केंद्र चुंगी नंबर ५, मोहल्ला खुरारा, उमर फारूक मस्जिद के पास स्थित है। यहां ग्राहक आकर स्वयं विभिन्न पैक साइज़ देख सकते हैं और अपनी आवश्यकतानुसार सही उत्पाद की जानकारी प्राप्त कर सकते हैं।'
              : 'Located at Chungi No. 5, Mohalla Khurara, near Umar Faruq Masjid, our counter welcomes walk-in visitors to inspect pack sizes, understand usage directions, and verify genuine seals before purchasing.'}
          </p>
        </div>

        {/* Narrative Card 2: The Nageena Heritage */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e4d9c7] shadow-sm mb-8 space-y-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#184230]">
            {language === 'hi'
              ? 'नगीना आयुर्वेदिक फार्मेसी (भिवंडी) की विरासत'
              : 'The Nageena Ayurvedic Heritage (Est. 1993)'}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {language === 'hi'
              ? 'नगीना आयुर्वेदिक फार्मेसी का निर्माण केंद्र १८१, अत्तर कम्पाउण्ड, अप्सरा टॉकीज के पास, कल्याण रोड, भिवंडी (ठाणे, महाराष्ट्र - ४२१३०२) में स्थित है। सन १९९३ से यह संस्थान पारंपरिक आयुर्वेदिक ग्रंथों और विधियों के अनुसार औषधीय तेलों का निर्माण कर रहा है। यह इकाई ISO 9001:2018 प्रमाणित है एवं औषधि निर्माण लाइसेंस (Mfg. Lic. No KB. AYU 221) के अंतर्गत संचालित है।'
              : 'All products displayed on this site are manufactured by Nageena Ayurvedic Pharmacy, located at 181 Attarwala Compound, Near Apsara Talkies, Kalyan Road, Bhiwandi, Thane, Maharashtra (421302). Operating since 1993 under Manufacturing License No. KB. AYU 221, the facility is ISO 9001:2018 certified, adhering to classical Ayurvedic decoction and extraction methods.'}
          </p>
        </div>

        {/* Narrative Card 3: Our Core Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#fcfaf6] p-6 rounded-2xl border border-[#ede3d4] text-left space-y-2">
            <span className="text-2xl font-black text-[#c61d23]">100%</span>
            <h3 className="font-bold text-[#184230]">
              {language === 'hi' ? 'असली स्टॉक' : 'Genuine Stock'}
            </h3>
            <p className="text-xs text-stone-600">
              Direct from Bhiwandi factory with genuine factory batch seals.
            </p>
          </div>

          <div className="bg-[#fcfaf6] p-6 rounded-2xl border border-[#ede3d4] text-left space-y-2">
            <span className="text-2xl font-black text-[#184230]">MRP</span>
            <h3 className="font-bold text-[#184230]">
              {language === 'hi' ? 'पारदर्शी मूल्य' : 'Honest Pricing'}
            </h3>
            <p className="text-xs text-stone-600">
              Strictly adherence to authorized packaging and maximum retail prices.
            </p>
          </div>

          <div className="bg-[#fcfaf6] p-6 rounded-2xl border border-[#ede3d4] text-left space-y-2">
            <span className="text-2xl font-black text-amber-700">7 Days</span>
            <h3 className="font-bold text-[#184230]">
              {language === 'hi' ? 'सक्रिय संपर्क' : 'Always Reachable'}
            </h3>
            <p className="text-xs text-stone-600">
              Open 7 days a week from 9 AM to 9 PM with call and WhatsApp support.
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-gradient-to-r from-[#184230] to-[#123526] rounded-3xl p-8 sm:p-10 text-white text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'हमसे सीधे संपर्क करें' : 'Get in Touch with Our Sherkot Counter'}
          </h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">
            {language === 'hi'
              ? 'उत्पाद की उपलब्धता जानने या काउंटर पर आने से पहले किसी भी प्रश्न के लिए सीधे फोन करें।'
              : 'Call or WhatsApp us anytime for packaging confirmation, directions to our shop, or bulk enquiries.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${contact.primaryPhone}`}
              className="inline-flex items-center gap-2 bg-[#c61d23] hover:bg-[#a8141a] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {contact.primaryPhoneFormatted}</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#184230] hover:bg-stone-100 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#c61d23]" />
              <span>View Store Address</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
