'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertyCarousel() {
  const images = [
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-1.jpg',
      alt: 'Modern kitchen with granite countertops and pendant lighting',
    },
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-2.jpg',
      alt: 'Elegant dining room with purple chairs and large windows',
    },
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-3.jpg',
      alt: 'Contemporary hallway with stone accent wall',
    },
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-4.jpg',
      alt: 'Cozy living room with a stone fireplace',
    },
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-5.jpg',
      alt: 'Luxury bedroom with large windows and a king-sized bed',
    },
    {
      src: 'https://code-theme.com/html/findhouses/images/single-property/s-6.jpg',
      alt: 'Spa-like bathroom with marble tiles',
    },
  ];

  const onBeforeSlide = (detail: { index: any; prevIndex: any }) => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  return (
    <div className="relative w-full">
      {/* Custom Navigation Buttons */}
      <button
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full border text-black p-2 shadow-lg hover:shadow-xl"
        id="prev-button"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full border text-black p-2 shadow-lg hover:shadow-xl"
        id="next-button"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: '#prev-button',
          nextEl: '#next-button',
        }}
        pagination
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <LightGallery
              elementClassNames="custom-wrapper-class"
              onBeforeSlide={onBeforeSlide}
            >
              <a target="_self" href={image.src}>
                <Image
                  width={1000}
                  height={1000}
                  src={image.src}
                  alt={image.alt}
                  className="object-cover h-[300px] w-full cursor-pointer"
                />
              </a>
            </LightGallery>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
