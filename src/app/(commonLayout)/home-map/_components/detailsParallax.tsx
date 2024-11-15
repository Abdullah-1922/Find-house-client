'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, List, Users, Award } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const stats = [
  { icon: <Home className="w-8 h-8" />, number: 300, label: 'Sold Houses' },
  { icon: <List className="w-8 h-8" />, number: 400, label: 'Daily Listings' },
  { icon: <Users className="w-8 h-8" />, number: 250, label: 'Expert Agents' },
  { icon: <Award className="w-8 h-8" />, number: 200, label: 'Won Awards' },
];

const DetailsParallax: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Function to handle smooth counting
  const countTo = (end: number, duration: number) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      let interval = (end / duration) * 100;

      const timer = setInterval(() => {
        start += 1;
        if (start >= end) {
          clearInterval(timer);
        }
        setCount(start);
      }, interval);

      return () => clearInterval(timer); // Clear interval when component unmounts
    }, [end, duration]);

    return count;
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
      {/* Overlays for the parallax effect */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-white px-2 md:px-4 py-8">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => {
            const animatedNumber = countTo(stat.number, 2000); // 2000ms for smooth counting
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-black bg-opacity-50 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 text-primaryColor">{stat.icon}</div>
                <h3 className="text-3xl font-bold">{animatedNumber}</h3>
                <p className="mt-2 text-lg">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DetailsParallax;
