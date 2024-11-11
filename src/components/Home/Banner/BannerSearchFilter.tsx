'use client';

import * as React from 'react';
import {
  ChevronDown,
  Search,
  Home,
  MapPin,
  KeyRound,
  Bed,
  Bath,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import menuicon from '../../../../public/assets/logo/dots.png';
import Image from 'next/image';

const BannerSearchFilter = () => {
  const [searchType, setSearchType] = React.useState<'sale' | 'rent'>('sale');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenProperty, setIsOpenProperty] = React.useState(false);
  const [isOpenAdvance, setIsOpenAdvance] = React.useState(false);

  const toggleDropdownProperty = () => {
    setIsOpenProperty(!isOpenProperty);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownAdvance = () => {
    setIsOpenAdvance(!isOpenAdvance);
  };

  const [areaRange, setAreaRange] = React.useState([0, 1270]);
  const [priceRange, setPriceRange] = React.useState([0, 600000]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="relative">
          {/* Search Type Toggle */}
          {/* sily is none  backdrop-blur-sm */}
          <div className="flex justify-start mb-5 rounded-lg p-1  shadow-sm gap-5">
            <button
              onClick={() => setSearchType('sale')}
              className={cn(
                'px-6 py-3 rounded-lg text-sm font-medium transition-colors',
                searchType === 'sale'
                  ? 'bg-slate-700 text-white'
                  : 'hover:bg-slate-100 bg-white text-slate-700'
              )}
            >
              For Sale
            </button>
            <button
              onClick={() => setSearchType('rent')}
              className={cn(
                'px-6 py-3 rounded-lg text-sm font-medium transition-colors',
                searchType === 'rent'
                  ? 'bg-slate-700 text-white'
                  : 'hover:bg-slate-100 bg-white text-slate-700'
              )}
            >
              For Rent
            </button>
          </div>

          {/* Search Form */}
          <form className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white rounded-lg px-4 py-7 shadow-lg border-transparent border-8 border-sky-100">
            <div className="relative">
              <KeyRound
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Enter Keyword..."
                className="w-full h-12 pl-10 pr-4 rounded-lg border text-gray-700 border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
              />
            </div>

            <div className="relative ">
              <button
                type="button"
                onClick={toggleDropdownProperty}
                className="w-full h-12 pl-10 pr-4 text-left rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-gray-500 focus:ring-slate-700 focus:border-transparent flex items-center justify-around"
              >
                <Home
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                Property Type
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isOpenProperty && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <ul className="py-2 text-left">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                      Apartment
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                      Family House
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                      Condo
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full h-12 pl-10 pr-4 text-left rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-gray-500 focus:ring-slate-700 focus:border-transparent flex items-center justify-around"
                >
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  Location
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <ul className="py-2  text-gray-500 text-left">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Rajshahi
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Rongpur
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Dhaka
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Pabna
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Sylet
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdownAdvance}
                className="w-full h-12 pl-10 text-gray-500 pr-4 text-left rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent flex items-center justify-around"
              >
                Advanced Search
                <Image
                  className="w-5"
                  src={menuicon}
                  alt="world svg for language"
                  width={1000}
                  height={1000}
                />
              </button>
            </div>
            <div className="relative">
              <button
                type="submit"
                className="h-12 px-8 rounded-lg bg-slate-700 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpenAdvance && (
        <div className="max-w-7xl  bg-white rounded-lg shadow-lg border border-gray-200 z-10 ">
          <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent">
                  <option value="">Property Status</option>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                  <option value="sold">Sold</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-6 focus:border-transparent">
                  <option value="">Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Bed className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-6 focus:border-transparent">
                  <option value="">Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Bath className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-10">
              <div className="space-y-6 w-full">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Area Size
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="1300"
                        value={areaRange[0]}
                        onChange={(e) =>
                          setAreaRange([parseInt(e.target.value), areaRange[1]])
                        }
                        className="w-full  h-2 bg-gray-600 rounded-lg appearance-none text-gray-600 cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{areaRange[0]} sq ft</span>
                      <span>{areaRange[1]} sq ft</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="600000"
                        step="1000"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full">
                <div className="space-y-4">
                  {[
                    'Air Conditioning',
                    'Swimming Pool',
                    'Central Heating',
                    'Laundry Room',
                    'Gym',
                    'Alarm',
                    'Window Covering',
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={amenity.toLowerCase().replace(' ', '-')}
                        className="rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                        defaultChecked={index < 4}
                      />
                      <label
                        htmlFor={amenity.toLowerCase().replace(' ', '-')}
                        className="text-sm text-gray-700"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    'WiFi',
                    'TV Cable',
                    'Dryer',
                    'Microwave',
                    'Washer',
                    'Refrigerator',
                    'Outdoor Shower',
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={amenity.toLowerCase().replace(' ', '-')}
                        className="rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                        defaultChecked={index === 0}
                      />
                      <label
                        htmlFor={amenity.toLowerCase().replace(' ', '-')}
                        className="text-sm text-gray-700"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSearchFilter;
