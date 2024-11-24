'use client';

import React from 'react';
import PropertyCarousel from './propertyCarousel';
import CalenderSchedule from '../agencies/CalerderSchedule';
import PropertyDetails from './propertyDetails';
import PropertyDescription from './propertyDescription';
import WhatsNearby from './whatsNearby';
import AgentInformation from './agentInformation';
import FloorPlan from './floorPlan';
import PropertyVideo from './propertyVideo';
import FeaturedProperties from '../agencies/FeatureProperties';
import ResentProperties from '../agencies/ResentProperties';
import SpecialOfTheDay from './specialOfTheDay';
import ProperLocation from './propertyLocation';
import PopularTags from './PopularTags';
import ResentPropertySlider from '@/app/(commonLayout)/home-map/_components/resentPropertySlider';

export default function Property() {
  return (
    <div>
      <PropertyCarousel />
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex gap-5 w-full my-8">
          <div className="flex flex-col gap-5 w-full space-y-5">
            <PropertyDescription />
            <PropertyDetails />
            <FloorPlan />
            <WhatsNearby />
            <PropertyVideo />
            <ProperLocation />
          </div>
          {/* Sidebar Forms */}
          <div className="flex flex-col gap-5 w-[50%] space-y-5">
            {/* Schedule Tour */}
            <CalenderSchedule />
            <AgentInformation />
            <ResentProperties />
            <FeaturedProperties />
            <SpecialOfTheDay />
            <PopularTags />
          </div>
        </div>
      </div>
      <ResentPropertySlider />
    </div>
  );
}
