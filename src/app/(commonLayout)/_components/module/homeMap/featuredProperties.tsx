'use client';

import React from 'react';
import SectionTitle from '@/components/ui/sectionTitle';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/shared/card/PropertyCard';
import { Button } from '@/components/ui/button';
import { CircleArrowRight } from 'lucide-react';
import { TProperty } from '@/types';
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';

export default function FeaturedProperties() {
  const { data: propertiesData } = useGetAllPropertiesQuery(undefined);
  const allProperties = propertiesData?.data as TProperty[];
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
        {allProperties?.slice(0, 6).map((property, index) => (
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
