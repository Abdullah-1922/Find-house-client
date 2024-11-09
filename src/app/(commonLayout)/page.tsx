import Apartmentforrent from "@/components/Home/Apartmentforrent/Apartmentforrent";
import Banner from "@/components/Home/Banner/Banner";
import MeetOurAgents from "@/components/Home/MeetOurAgents/MeetOurAgents";
import PopularPlaces from "@/components/Home/PopularPlaces/PopularPlaces";
import RecentProperties from "@/components/Home/RecentProperties/RecentProperties";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";



export default function Home() {
  return (
 <div>
    <Banner/>
    <RecentProperties/>
    <WhyChooseUs/>
    <PopularPlaces/>
    <Apartmentforrent/>
    <MeetOurAgents/>
 </div>
  );
}
