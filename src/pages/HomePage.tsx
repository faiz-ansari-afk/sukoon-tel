import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryDiscovery } from '../components/home/CategoryDiscovery';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionalVideoSection } from '../components/home/PromotionalVideoSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { LocationSection } from '../components/home/LocationSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryDiscovery />
      <FeaturedProducts />
      <PromotionalVideoSection />
      <WhyChooseUs />
      <LocationSection />
    </div>
  );
};

