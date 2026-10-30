import React from 'react';
import { SEO } from '../components/shared/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryDiscovery } from '../components/home/CategoryDiscovery';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionalVideoSection } from '../components/home/PromotionalVideoSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { LocationSection } from '../components/home/LocationSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="Nageena Ayurvedic Agency | Sherkot, Bijnor - Original Nageena Products"
        description="शेरकोट (बिजनौर) में असली नगीना आयुर्वेदिक उत्पाद - नगीना सुकून तेल, ऑनियन हेयर ऑयल, रहनुमा केश तेल और सुकून पेन किलर। मूल एमआरपी, उत्पाद विवरण व काउंटर उपलब्धता के लिए सीधे कॉल या व्हाट्सएप करें।"
      />
      <HeroSection />
      <CategoryDiscovery />
      <FeaturedProducts />
      <PromotionalVideoSection />
      <WhyChooseUs />
      <LocationSection />
    </div>
  );
};

