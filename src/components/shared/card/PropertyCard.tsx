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
import { TProperty } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NextLink from 'next/link';

interface PropertyCardProps {
  property: TProperty;
  isGridView?: boolean | undefined;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isGridView,
}) => {
  const [hovered, setHovered] = useState(false);

  console.log(isGridView);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        className={`overflow-hidden border-none ${
          isGridView ? 'flex flex-col' : 'flex flex-row justify-between'
        }`}
      >
        <div
          className={`relative aspect-[4/3] ${
            isGridView ? '' : 'w-1/2 md:w-1/3'
          } ${isGridView === undefined && 'flex flex-col'}`}
        >
          <div
            className={`absolute top-4 left-4 right-4 z-10 flex justify-between ${
              isGridView ? '' : 'flex-col md:flex-row gap-3'
            }`}
          >
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
                <NextLink href={`/all-properties/${property.id}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </NextLink>
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

        <div className="flex flex-col md:w-full">
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
            <div
              className={`grid gap-4 ${
                isGridView ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
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

          {isGridView === undefined ? (
            <CardFooter
              className={`py-4 border-t flex items-center gap-2 justify-between`}
            >
              <div className="text-sm md:text-lg font-semibold whitespace-nowrap">
                $ {property.price.toLocaleString()}
              </div>
              <div className="flex gap-1 md:gap-2">
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
          ) : (
            <CardFooter className="flex items-center justify-between gap-3 border-t p-4">
              <div className={`flex items-center gap-2 md:gap-3`}>
                <Avatar
                  className={`size-10 rounded-full ${
                    isGridView ? '' : 'size-6 md:size-10 '
                  }`}
                >
                  <AvatarImage
                    src={property.agent.image}
                    alt={property.agent.name}
                  />
                  <AvatarFallback>{property.agent.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span
                    className={`text-sm md:text-sm font-medium text-gray-900 ${
                      isGridView ? '' : 'text-xs md:text-sm'
                    }`}
                  >
                    {property.agent.name}
                  </span>
                </div>
              </div>
              <div>
                <span
                  className={`text-sm text-gray-500 whitespace-nowrap ${
                    isGridView ? '' : 'text-xs md:text-sm'
                  }`}
                >
                  {property.postedTime}
                </span>
              </div>
            </CardFooter>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
