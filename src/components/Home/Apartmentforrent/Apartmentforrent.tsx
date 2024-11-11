"use client"
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Apartmentforrent = () => { 
  useEffect(() => {
    AOS.init({
      offset: 300,
      easing: 'ease-in-sine',
      duration: 600,
    });
  }, []);

  return (
    <div className="mt-20">
      <div 
        className="h-[600px] flex items-center p-28"  
        style={{
          backgroundImage: "url(https://code-theme.com/html/findhouses/images/bg/bg-2-home-5.jpg)",
        }}
      >
        <div 
          data-aos="fade-right"
          className="relative min-h-[300px] w-full max-w-xl overflow-hidden rounded bg-cover bg-center"
        >
          <div className="absolute inset-0 h-full w-full bg-white/90 p-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-semibold text-gray-900">Apartment for rent</h2>
              <p className="mt-4 text-2xl font-semibold text-primary">$6,400/month</p>
              <p className="mt-4 text-gray-600">
                We help you find the best places and offers nearby. Explore win-win strategies for proactive living.
              </p>
              <button className="mt-6 rounded-md bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartmentforrent;
