import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ShieldCheck, Tag, MapPin, PhoneCall } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const points = [
    {
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: t.whyUs.point1Title,
      desc: t.whyUs.point1Desc,
    },
    {
      icon: Tag,
      color: 'bg-amber-100 text-amber-900 border-amber-200',
      title: t.whyUs.point2Title,
      desc: t.whyUs.point2Desc,
    },
    {
      icon: MapPin,
      color: 'bg-red-100 text-red-800 border-red-200',
      title: t.whyUs.point3Title,
      desc: t.whyUs.point3Desc,
    },
    {
      icon: PhoneCall,
      color: 'bg-teal-100 text-teal-900 border-teal-200',
      title: t.whyUs.point4Title,
      desc: t.whyUs.point4Desc,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#e8dfcf]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight">
            {t.whyUs.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.whyUs.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-6 sm:p-7 rounded-3xl bg-[#fbf9f4] border border-[#e4d9c7] hover:border-[#184230]/40 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${pt.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#184230] mb-2 leading-snug">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed flex-1">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

