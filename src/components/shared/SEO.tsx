import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}

const DEFAULT_TITLE = 'Nageena Ayurvedic Agency | Sherkot, Bijnor - Original Nageena Products';
const DEFAULT_DESCRIPTION = 'शेरकोट (बिजनौर) में असली नगीना आयुर्वेदिक उत्पाद - नगीना सुकून तेल, ऑनियन हेयर ऑयल, रहनुमा केश तेल और सुकून पेन किलर। मूल एमआरपी, उत्पाद विवरण व काउंटर उपलब्धता के लिए सीधे कॉल या व्हाट्सएप करें।';
const DEFAULT_IMAGE = '/og-image.jpg';

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  canonical,
}) => {
  useEffect(() => {
    // English title for search engines
    document.title = title;

    // Hindi description for search snippet
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // OG Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) {
      ogImg.setAttribute('content', image);
    }

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description);
    }

    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) {
      twitterImg.setAttribute('content', image);
    }

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      }
    }
  }, [title, description, image, canonical]);

  return null;
};

