'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import SectionTitle from '@/components/ui/sectionTitle';

interface Place {
  name: string;
  properties: number;
  image: string;
  featured?: boolean;
}

const places: Place[] = [
  {
    name: 'New York City',
    properties: 203,
    image:
      'https://media.istockphoto.com/id/1319269543/photo/new-homes-on-a-quiet-street-in-raleigh-nc.jpg?s=612x612&w=0&k=20&c=qaRMP-xgYqFAXR9aTpiG0dtkyqPhJiTAovvxyG1AxvM=',
    featured: true,
  },
  {
    name: 'Los Angeles',
    properties: 307,
    image:
      'https://st3.depositphotos.com/30630704/32626/i/450/depositphotos_326262574-stock-photo-red-gray-row-houses.jpg',
  },
  {
    name: 'San Francisco',
    properties: 409,
    image: 'https://images.estately.net/175_24016785_0_1726777405_636x435.jpg',
  },
  {
    name: 'Miami',
    properties: 507,
    image:
      'https://cdn.listingphotos.sierrastatic.com/pics3x/v1726517452/221/221_24019384_01.jpg',
    featured: true,
  },
];

const PlaceCard: React.FC<Place> = ({ name, properties, image, featured }) => (
  <div className="relative overflow-hidden rounded shadow-lg">
    {/* Overlay for Text and Background Color */}
    <motion.div
      className="absolute inset-0 z-10 flex flex-col justify-center items-center p-6 text-white bg-black bg-opacity-30 transition-all duration-300"
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p>{properties} Properties</p>
    </motion.div>

    {/* Badge for Featured Label */}
    {featured && (
      <Badge className="absolute top-4 left-4 z-20 bg-green-700 text-white">
        Featured
      </Badge>
    )}

    {/* Image Scaling Only on Hover */}

    <motion.div
      className="h-64"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
      />
    </motion.div>
  </div>
);

export default function PopularPlaces() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <SectionTitle header="MOST POPULAR" title="PLACES" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="col-span-12 md:col-span-4">
          <PlaceCard {...places[0]} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <PlaceCard {...places[1]} />
        </div>
        <div className="col-span-12 md:col-span-8">
          <PlaceCard {...places[2]} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <PlaceCard {...places[3]} />
        </div>
      </div>
    </section>
  );
}
