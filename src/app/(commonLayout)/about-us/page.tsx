'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import OurPartners from '@/components/Home/OurPartners/OurPartners';
import ClientsTestimonials from '../_components/module/homeVideo/ClientsTestimonials';
import MeetOurAgents from '@/components/Home/MeetOurAgents/MeetOurAgents';
import DetailsParallax from '../_components/module/homeMap/detailsParallax';
import WhyChooseUs from '../_components/module/homeVideo/WhyChooseUs';

const AboutUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div>
      <div
        className="max-h-[300px] py-36"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://www.nojitter.com/sites/default/files/AdobeStock_162103915.jpeg)
    `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            About Our Company
          </h3>

          <p className="font-bold text-white text-lg">Home / About Us</p>
        </div>
      </div>

      <div className="my-20">
        <div className="container mx-auto px-4 py-12 ">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                <span className="text-black">ABOUT</span>{' '}
                <span className="text-gray-700">FIND HOUSES</span>
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum odio id voluptatibus incidunt cum? Atque quasi eum
                  debitis optio ab. Esse itaque officiis tempora possimus odio
                  rerum aperiam ratione, sunt.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum odio id voluptatibus incidunt cum? Atque quasi eum
                  debitis optio ab. Esse itaque officiis tempora possimus odio
                  rerum aperiam ratione, sunt.
                </p>
              </div>

              <div className="flex justify-around items-center">
                <Button
                  variant="outline"
                  className="border-2 border-gray-text-gray-700 border-gray-700 hover:bg-pink-50 py-7 px-10"
                >
                  READ MORE
                </Button>

                <Image
                  width={1000}
                  height={1000}
                  src="https://code-theme.com/html/findhouses/images/signature.png"
                  alt="Signature"
                  className="h-12 object-contain"
                />
              </div>
            </div>

            {/* Video Section */}
            <div className="relative rounded-lg overflow-hidden">
              {showVideo ? (
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              ) : (
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setShowVideo(true)}
                >
                  <Image
                    width={1000}
                    height={1000}
                    src="https://code-theme.com/html/findhouses/images/bg/bg-video.jpg"
                    alt="Video thumbnail"
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-20 h-10 text-white fill-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs />
      <DetailsParallax />
      <MeetOurAgents />
      <ClientsTestimonials />
      <OurPartners />
    </div>
  );
};

export default AboutUs;
