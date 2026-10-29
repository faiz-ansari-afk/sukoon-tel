import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Play, Video, ShieldCheck, Volume2 } from 'lucide-react';

export const PromotionalVideoSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#fbf9f4] to-[#f4ede2] border-b border-[#e8dfcf]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#c61d23] text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Official Packaging & Demonstration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#184230] tracking-tight">
            {t.video.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.video.sectionSubtitle}
          </p>
        </div>

        {/* Video Player Container (16:9 Aspect Ratio) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-[#dfd4c2] aspect-video">
            {!videoError ? (
              <video
                controls
                preload="metadata"
                poster="/images/banners/wellness-banner.png"
                className="w-full h-full object-contain bg-black"
                onError={() => setVideoError(true)}
              >
                <source
                  src="/videos/nageena-promotional-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              /* Graceful Fallback if video fails to load */
              <div className="relative w-full h-full">
                <img
                  src="/images/banners/wellness-banner.png"
                  alt="Nageena Ayurvedic Products Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">
                    {language === 'hi'
                      ? 'असली नगीना आयुर्वेदिक उत्पाद प्रदर्शन'
                      : 'Nageena Ayurvedic Authentic Demonstration'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md">
                    {t.video.videoFallback}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Subtext info */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-stone-500 px-2 gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? 'मूल नगीना आयुर्वेदिक फार्मेसी भिवंडी (१९९३)'
                  : 'Genuine Nageena Ayurvedic Pharmacy Bhiwandi (Est. 1993)'}
              </span>
            </span>
            <span className="flex items-center gap-1 text-stone-400">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Native audio controls • Tap play to listen</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
