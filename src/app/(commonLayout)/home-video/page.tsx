import React from 'react';
import WhyChooseUs from './_components/WhyChooseUs';
import RecentProject from './_components/RecentProject';
import PopularPlaces from '@/components/Home/PopularPlaces/PopularPlaces';
import PopularProperties from './_components/PopularProperties';
import ClientsTestimonials from './_components/ClientsTestimonials';
import ArticlesAndTips from '@/components/Home/ArticlesAndTips/ArticlesAndTips';
import OurPartners from '@/components/Home/OurPartners/OurPartners';

const HomeVideo = () => {
    return (
        <div>
            {/* TODO: Create home video banner */}
            <WhyChooseUs/>
            <RecentProject/>
            <PopularPlaces/>
            <PopularProperties/>
            <ClientsTestimonials/>
            <ArticlesAndTips/>
            <OurPartners/>
        </div>
    );
};

export default HomeVideo;