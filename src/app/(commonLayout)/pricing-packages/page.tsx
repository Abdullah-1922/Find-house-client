"use client"
import React, { useState } from 'react';

const packages = [
  { name: "BASIC", price: "49" },
  { name: "STANDARD", price: "99" },
  { name: "PROFESSIONAL", price: "149" },
  { name: "PREMIUM", price: "399" },
]

const features = [
  "100GB Monthly Bandwidth",
  "$100 Google AdWords",
  "100 Domain Hosting", 
  "SSL Shopping Cart",
  "24/7 Live Support",
]

const PricingPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div>
        
      <section className="w-full py-12 bg-white">
      <div className="flex items-center space-x-4 p-4 max-w-md lg:ml-20 pt-20">
        <div className="w-4 h-16 bg-[#FF3366] rounded"></div>
        <div>
          <p className="text-lg font-bold text-black mb-1">Pricing</p>
          <h2 className="text-3xl font-extrabold text-[#FF3366]">Packages</h2>
        </div>
      </div>
        <div className="px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className='flex justify-center'>
              <div className="grid gap-6 mt-8 lg:grid-cols-4 lg:gap-8">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.name} 
                    className={`flex flex-col w-80 border rounded-sm cursor-pointer ${
                      pkg.name === "PROFESSIONAL" ? " " : "bg-white text-black"
                    }`}
                    onClick={() => setSelectedPackage(pkg.name)}
                  >
                    <div className="text-center pt-8 pb-4">
                      <h3 className={`text-2xl font-bold ${
                        pkg.name === "PROFESSIONAL" ? "text-black" : "text-black"
                      }`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-xs font-medium tracking-wider ${
                        pkg.name === "PROFESSIONAL" ? "text-black" : "text-gray-500"
                      }`}>
                        MONTHLY PLAN
                      </p>
                    </div>
                    
                    <div className="flex-1">
                      <div className={`relative py-6 text-center ${
                        selectedPackage === pkg.name ? "bg-black" :
                        pkg.name === "PROFESSIONAL" ? "bg-[#FF3366]" : "bg-[#FF3366]"
                      }`}>
                        <div className="relative">
                          <span className="text-4xl font-bold text-white">
                            <sup className="text-xl">$</sup>
                            {pkg.price}
                            <sub className="text-xl">.99</sub>
                          </span>
                        </div>
                        <div className={`absolute -bottom-4 left-0 right-0 mx-auto h-4 w-8 ${
                          selectedPackage === pkg.name ? "bg-black" :
                          pkg.name === "PROFESSIONAL" ? "" : "bg-[#FF3366]"
                        }`} style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
                      </div>
                      
                      <div className="mt-8 space-y-0">
                        {features.map((feature, index) => (
                          <div key={feature}>
                            <div className={`py-3 text-center text-sm ${
                              pkg.name === "PROFESSIONAL" ? "text-black" : "text-gray-600"
                            }`}>
                              {feature}
                            </div>
                            {index !== features.length - 1 && (
                              <div className="border-t border-gray-200 my-1"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <button 
                        className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90 w-full py-2 rounded-sm font-semibold "
                      
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPackages;