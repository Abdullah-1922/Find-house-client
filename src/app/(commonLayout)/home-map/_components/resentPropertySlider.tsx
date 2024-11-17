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
import { TProperty } from '@/types';

const properties: TProperty[] = [
  {
    id: 1,
    title: 'Real House Luxury Villa',
    price: 9000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Sale',
    featured: true,
    agent: {
      name: 'Lisa Jhonson',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-1.jpg',
  },
  {
    id: 2,
    title: 'Real House Luxury Villa',
    price: 8000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Rent',
    featured: false,
    agent: {
      name: 'Karl Smith',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
  },
  {
    id: 3,
    title: 'Real House Luxury Villa',
    price: 9000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Sale',
    featured: false,
    agent: {
      name: 'katy Teddy',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
  },
  {
    id: 3,
    title: 'Real House Luxury Villa',
    price: 9000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Sale',
    featured: false,
    agent: {
      name: 'katy Teddy',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
  },
  {
    id: 3,
    title: 'Real House Luxury Villa',
    price: 9000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Sale',
    featured: false,
    agent: {
      name: 'katy Teddy',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
  },
  {
    id: 3,
    title: 'Real House Luxury Villa',
    price: 9000,
    location: 'Est St, 77 - Central Park South, NYC',
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    status: 'For Sale',
    featured: false,
    agent: {
      name: 'katy Teddy',
      image: '/placeholder.svg?height=40&width=40',
    },
    postedTime: '2 months ago',
    imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
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
              {isClient && (
                <PropertyCard isGridView={true} property={property} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-ml-3 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
        <CarouselNext className="-mr-3 size-16 bg-white text-gray-800 text-2xl hidden md:flex" />
      </Carousel>
    </div>
  );
}
