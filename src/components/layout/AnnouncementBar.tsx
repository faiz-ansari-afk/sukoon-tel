import React, { useState } from 'react';
import { siteConfig } from '../../data/site-config';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  const announcement = siteConfig.announcement;

  if (!announcement.enabled || dismissed) {
    return null;
  }

  const message = announcement.message[language];
  const linkText = announcement.linkText ? announcement.linkText[language] : null;

  return (
    <div className="relative bg-gradient-to-r from-[#184230] via-[#1f563e] to-[#184230] text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-[#286b4d]">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 hidden sm:inline" />
          <span className="font-medium tracking-wide">{message}</span>
          {linkText && announcement.linkUrl && (
            <Link
              to={announcement.linkUrl}
              className="inline-flex items-center gap-1 font-bold text-amber-300 underline underline-offset-2 hover:text-amber-200 ml-1.5 shrink-0"
            >
              <span>{linkText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-800/50 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

