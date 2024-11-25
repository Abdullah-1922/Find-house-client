'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import SectionTitle from '@/components/ui/sectionTitle';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Home, Warehouse } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="md:p-6 bg-[#1e2837] text-white rounded-lg hover:shadow-lg transform transition-all duration-300 cursor-pointer relative"
  >
    <CardHeader>
      <div className="size-20 absolute right-4 -top-8 rounded-full bg-gray-800 flex items-center justify-center mb-4">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300">{description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="link" className="text-white p-0">
        Read More →
      </Button>
    </CardFooter>
  </motion.div>
);

const services: ServiceCardProps[] = [
  {
    icon: <Home className="size-12" />,
    title: 'Houses',
    description: 'High-quality houses available with comprehensive facilities.',
  },
  {
    icon: <Building2 className="size-12" />,
    title: 'Apartments',
    description:
      'Luxurious apartments with modern amenities and prime locations.',
  },
  {
    icon: <Warehouse className="size-12" />,
    title: 'Commercial',
    description: 'Spacious commercial spaces ideal for businesses of any size.',
  },
];

const PropertyServices: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }
  }, [controls, isVisible]);

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
    <motion.section
      ref={ref}
      className="relative pb-20 pt-2 md:px-4 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.prismic.io/cuub/3620a9fb-0b5d-4069-9a1e-d372b976f36f_BOILER%20V01.jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=75&w=1280')",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Dark overlay for the parallax background */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 max-w-7xl m-auto text-white px-2 md:px-4 py-8">
        <SectionTitle header="PROPERTY" title="SERVICES" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PropertyServices;
