'use client';

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SectionTitle from '@/components/ui/sectionTitle';
import PropertyCard from '@/components/shared/card/PropertyCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  garages: number;
  featured: boolean;
  status: 'For Sale' | 'For Rent';
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: '1',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://www.shutterstock.com/image-photo/beautiful-home-exterior-600nw-160071032.jpg',
  },
  {
    id: '2',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Rent',
    imageUrl:
      'https://www.premierhomesca.com/wp-content/uploads/2020/03/EL3-Model-11-scaled-e1611704624780.jpg',
  },
  {
    id: '3',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
  {
    id: '4',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
];

export default function ResentPropertySlider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <SectionTitle header="RECENT" title="PROPERTIES" />
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full md:mx-4"
      >
        <CarouselContent className="md:-ml-4">
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              {isClient && <PropertyCard property={property} />}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-ml-3 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
        <CarouselNext className="-mr-3 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
      </Carousel>
    </div>
  );
}
