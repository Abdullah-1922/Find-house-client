import React from 'react';
import dynamic from 'next/dynamic'; // Always place at the top

// Dynamic imports (use ssr: false for problematic components)
const WhyChooseUs = dynamic(() => import('./WhyChooseUs'), { ssr: false });
const RecentProject = dynamic(() => import('./RecentProject'), { ssr: false });
import PopularPlaces from '../homeMap/mostPopularPlaces';

const PopularProperties = dynamic(() => import('./PopularProperties'), {
  ssr: false,
});
const ClientsTestimonials = dynamic(() => import('./ClientsTestimonials'), {
  ssr: false,
});
const ArticlesAndTips = dynamic(
  () => import('@/components/Home/ArticlesAndTips/ArticlesAndTips'),
  { ssr: false }
);
const OurPartners = dynamic(
  () => import('@/components/Home/OurPartners/OurPartners'),
  { ssr: false }
);

// Regular imports (safe for SSR)
import VideoBanner from './VideoBanner';

const HomeVideo = () => {
  return (
    <div>
      <VideoBanner />
      <div className="space-y-16">
        <WhyChooseUs />
        <RecentProject />
        <PopularPlaces />
        <PopularProperties />
        <ClientsTestimonials />
        <ArticlesAndTips />
        <OurPartners />
      </div>
    </div>
  );
};

export default HomeVideo;
