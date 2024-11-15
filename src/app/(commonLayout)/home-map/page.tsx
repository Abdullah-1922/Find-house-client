import IndustryLocation from './_components/IndustryLocation';
import ResentPropertySlider from './_components/resentPropertySlider';
import PropertyServices from './_components/propertyServicesParallax';
import FeaturedProperties from './_components/featuredProperties';
// import PopularPlaces from './_components/mostPopularPlaces';
import MeetOurAgents from './_components/meetOurAgents';
import LatestNews from './_components/latestNews';
import HappyCustomers from './_components/happyCustomers';
import DetailsParallax from './_components/detailsParallax';
import PopularPlaces from '@/components/Home/PopularPlaces/PopularPlaces';

const HomeMap = () => {
  return (
    <div className="overflow-x-hidden space-y-16">
      <IndustryLocation />
      <ResentPropertySlider />
      <PropertyServices />
      <FeaturedProperties />
      {/* <PopularPlaces /> */}
      <PopularPlaces/>
      <MeetOurAgents />
      <LatestNews />
      <HappyCustomers />
      <DetailsParallax />
    </div>
  );
};

export default HomeMap;
