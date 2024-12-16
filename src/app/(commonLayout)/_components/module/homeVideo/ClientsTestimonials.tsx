'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Quote } from 'lucide-react'
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Gary Steven",
    location: "Philadelphia",
    rating: 4,
    text: "Lorem ipsum dolor sit amet, ligula magna at etiam aliquip venenatis. Vitae sit felis donec, suscipit tortor et sapien donec.",
    image: "https://code-theme.com/html/findhouses/images/testimonials/ts-4.jpg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "New York",
    rating: 5,
    text: "Exceptional service! The team went above and beyond my expectations. I highly recommend their products to everyone.",
    image: "https://code-theme.com/html/findhouses/images/testimonials/ts-3.jpg"
  },
  {
    id: 3,
    name: "Michael Chang",
    location: "San Francisco",
    rating: 4,
    text: "Great experience overall. The product quality is outstanding, and the customer support is very responsive.",
    image: "https://code-theme.com/html/findhouses/images/testimonials/ts-2.jpg"
  }
]

const ClientsTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(true)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])


  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isPlaying) {
      intervalId = setInterval(nextTestimonial, 2000) // Change testimonial every 5 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, nextTestimonial])



  const currentTestimonial = testimonials[currentIndex]
  return (
    <div className=""
      style={{
        backgroundImage:
          "url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)",
      }}>
      <div>
        <h2 className="text-center text-4xl font-bold md:pt-20 pt-10 mb-3">Clients Testimonials</h2>
        <p className="text-center text-gray-500">We collect reviews from our customers.</p>
      </div>
      <div className="relative flex flex-col items-center max-w-md mx-auto p-6 rounded-lg ">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={currentTestimonial.image}
            alt={`${currentTestimonial.name}'s profile picture`}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{currentTestimonial.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{currentTestimonial.location}</p>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < currentTestimonial.rating ? "text-gray-600 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <Quote className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-center text-gray-600 italic mb-6">
          {currentTestimonial.text}
        </p>
        <div className="flex space-x-2 mb-4">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-gray-800" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsTestimonials;