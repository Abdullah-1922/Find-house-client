'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  TProperty,
  PropertyStatus,
  PropertyCategory,
  PropertyType,
  Features,
  ExtraInfoAge,
  TRangeFilters,
} from '@/types';

const PropertySearch: React.FC = () => {
  const router = useRouter();
  const [searchType, setSearchType] = React.useState<PropertyCategory>('sell');
  const [filters, setFilters] = React.useState<
    Partial<TProperty> & TRangeFilters
  >({
    status: 'active',
    category: 'sell',
    type: undefined,
    area: { $gte: 0, $lte: 10000 },
    price: { $gte: 0, $lte: 1000000 },
    rooms: undefined,
    'extraInfo.bathrooms': undefined,
    features: [],
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (key.includes('.')) {
        const [parentKey, childKey] = key.split('.');
        newFilters[parentKey] = { ...newFilters[parentKey], [childKey]: value };
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string' || typeof subValue === 'number') {
              queryParams.append(`${key}.${subKey}`, subValue.toString());
            }
          });
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    queryParams.append('category', searchType);
    router.push(`/list-grid?${queryParams.toString()}`);
  };

  const propertyTypes: PropertyType[] = [
    'house',
    'commercial',
    'apartment',
    'lot',
    'garage',
  ];
  const features: Features[] = [
    'Air Conditioning',
    'Swimming Pool',
    'Central Heating',
    'Laundry Room',
    'Gym',
    'Alarm',
    'Window Covering',
    'Refrigerator',
    'TV Cable & WIFI',
    'Microwave',
  ];
  const ageOptions: ExtraInfoAge[] = [
    '0-1',
    '0-5',
    '0-10',
    '0-15',
    '0-20',
    '0-50',
    '50+',
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <div className="mb-6 flex space-x-4">
        <Button
          className={`${
            searchType === 'sell'
              ? 'bg-gray-800 hover:bg-gray-900'
              : 'bg-white border text-gray-800 hover:bg-gray-10'
          }`}
          onClick={() => setSearchType('sell')}
        >
          For Sale
        </Button>
        <Button
          className={`${
            searchType === 'rent'
              ? 'bg-gray-800 hover:bg-gray-900'
              : 'bg-white border text-gray-800 hover:bg-gray-10'
          }`}
          onClick={() => setSearchType('rent')}
        >
          For Rent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Enter keywords..."
          onChange={(e) => handleFilterChange('title', e.target.value)}
        />

        <Select
          onValueChange={(value: PropertyType) =>
            handleFilterChange('type', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value: string) =>
            handleFilterChange('location.city', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSearch}
          className="w-full bg-gray-800 hover:bg-gray-900"
        >
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-search">
          <AccordionTrigger>Advanced Search</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="mb-2 font-medium">Price Range</h4>
                <Slider
                  min={0}
                  max={1000000}
                  step={1000}
                  value={[
                    filters.price?.$gte || 0,
                    filters.price?.$lte || 1000000,
                  ]}
                  onValueChange={(value) =>
                    handleFilterChange('price', {
                      $gte: value[0],
                      $lte: value[1],
                    })
                  }
                />
                <div className="flex justify-between mt-2">
                  <span>${filters.price?.$gte}</span>
                  <span>${filters.price?.$lte}</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Area Size (sq ft)</h4>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={[filters.area?.$gte || 0, filters.area?.$lte || 10000]}
                  onValueChange={(value) =>
                    handleFilterChange('area', {
                      $gte: value[0],
                      $lte: value[1],
                    })
                  }
                />
                <div className="flex justify-between mt-2">
                  <span>{filters.area?.$gte} sq ft</span>
                  <span>{filters.area?.$lte} sq ft</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Bedrooms</h4>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange('rooms', parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Number of bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Bathrooms</h4>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange('extraInfo.bathrooms', parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Number of bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Property Age</h4>
                <Select
                  onValueChange={(value: ExtraInfoAge) =>
                    handleFilterChange('extraInfo.age', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Property Age" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={age} value={age}>
                        {age} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Property Status</h4>
                <Select
                  onValueChange={(value: PropertyStatus) =>
                    handleFilterChange('status', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Property Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="non-active">Non-Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 font-medium">Features</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange('features', [
                            ...(filters.features || []),
                            feature,
                          ]);
                        } else {
                          handleFilterChange(
                            'features',
                            (filters.features || []).filter(
                              (f) => f !== feature
                            )
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={feature}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PropertySearch;
