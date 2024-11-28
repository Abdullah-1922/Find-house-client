import dynamic from 'next/dynamic';

const IndustryLocation = dynamic(
  () => import('../_components/module/homeMap/IndustryLocation'),
  { ssr: false }
);
const ResentPropertySlider = dynamic(
  () => import('../_components/module/homeMap/resentPropertySlider'),
  { ssr: false }
);
const PropertyServices = dynamic(
  () => import('../_components/module/homeMap/propertyServicesParallax'),
  { ssr: false }
);
const FeaturedProperties = dynamic(
  () => import('../_components/module/homeMap/featuredProperties'),
  { ssr: false }
);
const MeetOurAgents = dynamic(
  () => import('../_components/module/homeMap/meetOurAgents'),
  { ssr: false }
);
const LatestNews = dynamic(
  () => import('../_components/module/homeMap/latestNews'),
  { ssr: false }
);
const HappyCustomers = dynamic(
  () => import('../_components/module/homeMap/happyCustomers'),
  { ssr: false }
);
const DetailsParallax = dynamic(
  () => import('../_components/module/homeMap/detailsParallax'),
  { ssr: false }
);
const PopularPlaces = dynamic(
  () => import('@/components/Home/PopularPlaces/PopularPlaces'),
  { ssr: false }
);

const HomeMap = () => {
  return (
    <div className="overflow-x-hidden space-y-16">
      <IndustryLocation />
      <ResentPropertySlider />
      <PropertyServices />
      <FeaturedProperties />
      {/* <PopularPlaces /> */}
      <PopularPlaces />
      <MeetOurAgents />
      <LatestNews />
      <HappyCustomers />
      <DetailsParallax />
    </div>
  );
};

export default HomeMap;
