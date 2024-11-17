'use client';

import React from 'react';
import SectionTitle from '@/components/ui/sectionTitle';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/shared/card/PropertyCard';
import { Button } from '@/components/ui/button';
import { CircleArrowRight } from 'lucide-react';
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

export default function FeaturedProperties() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className="relative z-10 max-w-7xl m-auto px-2 md:px-2 md:px-4">
      <SectionTitle header="FEATURED" title="PROPERTIES" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
      >
        {properties.slice(0, 6).map((property, index) => (
          <PropertyCard isGridView={true} key={index} property={property} />
        ))}
      </motion.div>

      <div className="flex items-center justify-center my-5">
        <Button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 rounded-full">
          See More
          <CircleArrowRight />
        </Button>
      </div>
    </div>
  );
}
