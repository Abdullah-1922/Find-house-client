'use client';
import React from 'react';
import PropertyCarousel from './propertyCarousel';
import CalenderSchedule from '../agencies/CalerderSchedule';
import PropertyDetails from './propertyDetails';
import PropertyDescription from './propertyDescription';
import AgentInformation from './agentInformation';
import FloorPlan from './floorPlan';
import PropertyVideo from './propertyVideo';
import FeaturedProperties from '../agencies/FeatureProperties';
import ResentProperties from '../agencies/ResentProperties';
import SpecialOfTheDay from './specialOfTheDay';
import ProperLocation from './propertyLocation';
import PopularTags from './PopularTags';
import ResentPropertySlider from '@/app/(commonLayout)/_components/module/homeMap/resentPropertySlider';
import { useGetSinglePropertyQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';
import Spinner from '@/components/ui/spinner';
import { Toaster } from 'sonner';

export default function Property({ propertyId }: { propertyId: string }) {
  const { data, isLoading } = useGetSinglePropertyQuery(propertyId);
  if (isLoading) {
    return <Spinner className="h-[600px]" />;
  }
  const property = data?.data as TProperty;
  const {
    _id,
    title,
    description,
    features,
    price,
    area,
    location,
    category,
    type,
    status,
    rooms,
    extraInfo,
    videoUrl,
    images,
    contactInfo,
    floorPlanImage,
  } = property;
  const propertyDetails = {
    _id,
    type,
    status,
    price,
    rooms,
    bedrooms: extraInfo.rooms,
    bath: extraInfo.bathrooms,
    garages: 2,
    age: extraInfo.age,
  };

  const slideImages = images.map((image) => ({
    src: image,
    alt: 'image',
  }));

  const { firstName, secondName, email, image, _id: agentId } = property.author;

  const agent = {
    name: `${firstName} ${secondName}`,
    title: contactInfo.userName,
    address: `${location.city},  ${location.country}`,
    phone: contactInfo.phone as string,
    email,
    image,
    _id: agentId,
  };
  return (
    <div>
      <PropertyCarousel images={slideImages} />
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex lg:flex-row flex-col gap-2 md:p-5 w-full my-8">
          <div className="flex flex-col gap-2 md:p-5 w-full space-y-5">
            <PropertyDescription
              category={category}
              pricePerSqFt={price / area}
              description={description}
              title={title}
              price={price}
              location={`${location.address}, ${location.city},  ${location.country}`}
            />
            <PropertyDetails details={propertyDetails} amenities={features} />
            <FloorPlan image={floorPlanImage[0]} />
            <PropertyVideo thumbnail={images[0]} videoUrl={videoUrl} />
            <ProperLocation
              Longitude={Number(location.longitude)}
              latitude={Number(location.latitude)}
            />
          </div>
          {/* Sidebar Forms */}
          <div className="flex flex-col gap-2 md:p-5 sm:w-[50%] w-full space-y-5">
            {/* Schedule Tour */}
            <CalenderSchedule propertyId={propertyId} agentId={agentId} />
            <AgentInformation agent={agent} />
            <ResentProperties />
            <FeaturedProperties />
            <SpecialOfTheDay />
            <PopularTags />
          </div>
        </div>
      </div>
      <ResentPropertySlider />
      <Toaster duration={2000} position="bottom-right" />
    </div>
  );
}
