"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/ui/sectionTitle";
import PropertyCard from "@/components/shared/card/PropertyCard";

import { useGetAllPropertiesQuery } from "@/redux/api/features/property/propertyApi";
import { TProperty } from "@/types/property/property.type";
import PropertyLoadingCard from "@/components/shared/card/PropertyLoadingCard";

export default function ResentPropertySlider() {
  const { data, isLoading } = useGetAllPropertiesQuery("limit=6");
  const properties = data?.data;
  console.log(properties);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <SectionTitle header="RECENT" title="PROPERTIES" />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full md:mx-4"
      >
        <CarouselContent className="md:-ml-4">
          {isLoading && (
           [1, 2, 3, 4, 5, 6].map((index) => (
              <CarouselItem
                key={index}
                className="md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <PropertyLoadingCard />
              </CarouselItem>
            ))
          )}

          {isLoading ||
            properties?.map((property: TProperty) => (
              <CarouselItem
                key={property.id}
                className="md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                {isClient && (
                  <PropertyCard isGridView={true} property={property} />
                )}
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="ml-6 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
        <CarouselNext className="mr-6 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
      </Carousel>
    </div>
  );
}
