import IndustryLocation from '../_components/module/homeMap/IndustryLocation';
import ResentPropertySlider from '../_components/module/homeMap/resentPropertySlider';
import PropertyServices from '../_components/module/homeMap/propertyServicesParallax';
import FeaturedProperties from '../_components/module/homeMap/featuredProperties';
import MeetOurAgents from '../_components/module/homeMap/meetOurAgents';
import LatestNews from '../_components/module/homeMap/latestNews';
import HappyCustomers from '../_components/module/homeMap/happyCustomers';
import DetailsParallax from '../_components/module/homeMap/detailsParallax';
import PopularPlaces from '@/components/Home/PopularPlaces/PopularPlaces';

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
