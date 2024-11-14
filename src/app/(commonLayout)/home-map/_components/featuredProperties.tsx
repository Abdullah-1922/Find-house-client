'use client';

import React from 'react';
import SectionTitle from '@/components/ui/sectionTitle';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/shared/card/PropertyCard';
import { Button } from '@/components/ui/button';
import { CircleArrowRight } from 'lucide-react';

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

  {
    id: '5',
    title: 'Lakefront Cabin',
    location: '321 Lakeview Rd, Lake Tahoe, CA',
    price: 220000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1000,
    garages: 1,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
  {
    id: '6',
    title: 'Cozy Downtown Condo',
    location: '654 Main St, Chicago, IL',
    price: 160000,
    bedrooms: 2,
    bathrooms: 1,
    area: 750,
    garages: 0,
    featured: false,
    status: 'For Rent',
    imageUrl:
      'https://www.shutterstock.com/image-photo/beautiful-home-exterior-600nw-160071032.jpg',
  },
  {
    id: '7',
    title: 'Luxury Penthouse',
    location: '77 Park Ave, NYC',
    price: 450000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1400,
    garages: 1,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
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
    <div className="relative z-10 max-w-7xl m-auto px-2 md:px-4">
      <SectionTitle header="FEATURED" title="PROPERTIES" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
      >
        {properties.slice(0, 6).map((property, index) => (
          <PropertyCard key={index} property={property} />
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
