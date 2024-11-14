'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card className="overflow-hidden">
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

          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
          />

          {hovered && (
            <motion.div
              className="absolute inset-0 flex justify-end items-end bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {hovered && (
            <div className="absolute inset-0 gap-4 transition-opacity duration-300">
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h2 className="text-lg text-white font-bold">VIEW PROPERTY</h2>
                <h3 className="text-sm text-white font-semibold">
                  REAL ESTATE
                </h3>
              </div>
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                }}
                className="absolute inset-0 flex justify-end items-end mb-3 mr-3 gap-3"
              >
                <Button variant="outline" size="icon" className="rounded-full">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          )}
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
    </motion.div>
  );
};

export default PropertyCard;
