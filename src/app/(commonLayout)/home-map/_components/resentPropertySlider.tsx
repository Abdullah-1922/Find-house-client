'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Bed,
  Car,
  Expand,
  Heart,
  ImageIcon,
  Link,
  MapPin,
  Share2,
  ShowerHead,
  Square,
  Video,
} from 'lucide-react';

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
  return (
    <div className="w-full px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-16 bg-gray-800" />
        <div>
          <h2 className="text-sm font-semibold text-gray-800">RECENT</h2>
          <h3 className="text-2xl font-bold">PROPERTIES</h3>
        </div>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full mx-4"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden group relative">
                <div className="relative aspect-[4/3]">
                  <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 hover:bg-gray-900 text-white"
                    >
                      Featured
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={
                        property.status === 'For Sale'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>

                  {/* Motion div for hover effect, image still visible */}
                  <motion.div
                    whileHover={{ x: 10, opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  <div className="absolute inset-0 flex justify-end items-end bg-black/50 bg-opacity-50" />

                  {/* Hover content with sliding effect */}
                  <motion.div
                    className="absolute inset-0 gap-4 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      <h2 className="text-lg text-white font-bold">
                        VIEW PROPERTY
                      </h2>
                      <h3 className="text-sm text-white font-semibold">
                        REAL ESTATE
                      </h3>
                    </div>
                    <div className="absolute inset-0 flex justify-end items-end mb-3 mr-3 gap-3">
                      <div className="flex flex-col items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <CardContent className="p-4 space-y-6">
                  <div className="flex items-start flex-col">
                    <h3 className="text-lg font-semibold text-gray-600">
                      {property.title}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin className="h-4 w-4" />
                      {property.location}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShowerHead className="h-4 w-4" />
                      <span>{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Square className="h-4 w-4" />
                      <span>{property.area} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="h-4 w-4" />
                      <span>{property.garages} Garages</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 border-t flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    $ {property.price.toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Expand className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
