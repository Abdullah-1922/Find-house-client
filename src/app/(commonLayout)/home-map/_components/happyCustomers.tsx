'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import SectionTitle from '@/components/ui/sectionTitle';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mary Deshaw',
    location: 'Chicago',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
  {
    id: 2,
    name: 'Gary Steven',
    location: 'Philadelphia',
    rating: 4.5,
    comment:
      'Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
  {
    id: 3,
    name: 'Cristy Mayer',
    location: 'San Francisco',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
  {
    id: 4,
    name: 'Cristy Mayer',
    location: 'San Francisco',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
  {
    id: 5,
    name: 'Cristy Mayer',
    location: 'San Francisco',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <Card className="bg-white shadow-lg">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={80}
          height={80}
          className="rounded-full"
        />
      </motion.div>
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg font-semibold mb-1"
      >
        {testimonial.name}
      </motion.h3>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-sm text-gray-500 mb-2"
      >
        {testimonial.location}
      </motion.p>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex mb-3"
      >
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i + 1 <= testimonial.rating ? (
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            ) : i + 0.5 === testimonial.rating ? (
              <StarHalf className="w-4 h-4 text-yellow-400 fill-current" />
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        ))}
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-600"
      >
        {testimonial.comment}
      </motion.p>
    </CardContent>
  </Card>
);

export default function HappyCustomers() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 15 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 15 },
      },
    },
  });

  // Auto-slider functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % testimonials.length;
      instanceRef.current?.moveToIdx(nextSlide);
    }, 1200); // Change slide every 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle header="HAPPY" title="CUSTOMERS" />
        <div ref={sliderRef} className="keen-slider">
          <AnimatePresence>
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="keen-slider__slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {loaded && instanceRef.current && (
          <div className="flex justify-center mt-4">
            {[...Array(instanceRef.current.track.details.slides.length)].map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    currentSlide === idx ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
