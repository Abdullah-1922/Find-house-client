"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useGetAllPropertiesQuery } from "@/redux/api/features/property/propertyApi";
import { da } from "date-fns/locale";

const Apartmentforrent = () => {
  useEffect(() => {
    AOS.init({
      offset: 300,
      easing: "ease-in-sine",
      duration: 600,
    });
  }, []);

  const  {data}= useGetAllPropertiesQuery('limit=1&category=sell');
console.log(data?.data[0]);
 
  return (
    <div className="mt-20">
      <div
        className="flex items-center sm:p-28 p-8"
        style={{
          backgroundImage:
            "url(https://code-theme.com/html/findhouses/images/bg/bg-2-home-5.jpg)",
        }}
      >
        <div
          data-aos="fade-right"
          className="relative md:min-h-[300px] min-h-[350px] w-full max-w-xl overflow-hidden rounded bg-cover bg-center"
        >
          <div className="absolute inset-0 w-full bg-white/90 p-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-semibold text-gray-900">
                Apartment for sell
              </h2>
              <p className="mt-4 text-2xl font-semibold text-primary">
                ${data?.data[0].price}
              </p>
              <p className="mt-4 text-gray-600">
                We help you find the best places and offers nearby. Explore
                win-win strategies for proactive living.
              </p>
              <Link href={`/all-properties/${data?.data[0]._id}`}>
                <button className="mt-6 rounded-md bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartmentforrent;
