"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  TProperty,
  PropertyStatus,
  PropertyCategory,
  PropertyType,
  Features,
  ExtraInfoAge,
  TRangeFilters,
} from "@/types";
type TData = {
  maxPrice: number;
  minPrice: number;
  maxArea: number;
  minArea: number;
  cities: string[];
};
const PropertySearch = ({ data }: { data: TData }) => {
  const router = useRouter();
  const [searchType, setSearchType] = React.useState<PropertyCategory>("sell");
  const [filters, setFilters] = React.useState<
    Partial<TProperty> & TRangeFilters
  >({
    status: "active",
    category: searchType,
    type: undefined,
    minArea: data?.minArea,
    maxArea: data?.maxArea,
    minPrice: data?.minPrice,
    maxPrice: data?.maxPrice,
    rooms: undefined,
    "bathrooms": undefined,
    features: [],
  });

  const handleFilterChange = (key: string, value: any) => {
    console.log(key, value);
    console.log(key, value);
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (key.includes(".")) {
        const [parentKey, childKey] = key.split(".");
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
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === "string" || typeof subValue === "number") {
              queryParams.append(`${key}.${subKey}`, subValue.toString());
            }
          });
        } else if (Array.isArray(value)) {
          queryParams.append(key, value.join(","));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    queryParams.append("category", searchType);
    router.push(`/list-grid?${queryParams.toString()}`);
  };

  const propertyTypes: PropertyType[] = [
    "house",
    "commercial",
    "apartment",
    "lot",
    "garage",
  ];
  const features: Features[] = [
    "Air Conditioning",
    "Swimming Pool",
    "Central Heating",
    "Laundry Room",
    "Gym",
    "Alarm",
    "Window Covering",
    "Refrigerator",
    "TV Cable & WIFI",
    "Microwave",
  ];
  const ageOptions: ExtraInfoAge[] = [
    "0-1",
    "0-5",
    "0-10",
    "0-15",
    "0-20",
    "0-50",
    "50+",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <div className="mb-6 flex space-x-4">
        <Button
          className={`${
            searchType === "sell"
              ? "bg-gray-800 hover:bg-gray-900"
              : "bg-white border text-gray-800 hover:bg-gray-10"
          }`}
          onClick={() => {
            return (
              setSearchType("sell"), handleFilterChange("category", "sell")
            );
          }}
        >
          For Sale
        </Button>
        <Button
          className={`${
            searchType === "rent"
              ? "bg-gray-800 hover:bg-gray-900"
              : "bg-white border text-gray-800 hover:bg-gray-10"
          }`}
          onClick={() => {
            return (
              setSearchType("rent"), handleFilterChange("category", "rent")
            );
          }}
        >
          For Rent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Enter keywords..."
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        />

        <Select
          onValueChange={(value: PropertyType) =>
            handleFilterChange("type", value)
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
            handleFilterChange("location", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {data.cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
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
          <AccordionTrigger className="no-underline border-none">
            Advanced Search
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="mb-2 font-medium">Price Range</h4>
                <Slider
                  min={data?.minPrice || 0}
                  max={data?.maxPrice || 1000000}
                  step={1000}
                  value={[
                    filters.minPrice || data?.minPrice || 0,
                    filters.maxPrice || data?.maxPrice || 10000000,
                  ]}
                  onValueChange={(value) => {
                    handleFilterChange("minPrice", value[0]);
                    handleFilterChange("maxPrice", value[1]);
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span>${filters.minPrice || data?.minPrice}</span>
                  <span>${filters.maxPrice || data?.maxPrice}</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Area Size (sq ft)</h4>
                <Slider
                  min={data?.minArea || 0}
                  max={data?.maxArea || 10000}
                  step={100}
                  value={[
                    filters.minArea || data?.minArea || 0,
                    filters.maxArea || data?.minArea || 10000,
                  ]}
                  onValueChange={(value) => {
                    handleFilterChange("minArea", value[0]);
                    handleFilterChange("maxArea", value[1]);
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span>{filters.minArea || data?.minArea} sq ft</span>
                  <span>{filters.maxArea || data?.maxArea} sq ft</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Bedrooms</h4>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange("rooms", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Number of bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, "5+"].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "bedroom" : "bedrooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Bathrooms</h4>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange("bathrooms", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Number of bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, "5+"].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "bathroom" : "bathrooms"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Property Age</h4>
                <Select
                  onValueChange={(value: ExtraInfoAge) =>
                    handleFilterChange("age", value)
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
                    handleFilterChange("status", value)
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
                          handleFilterChange("features", [
                            ...(filters.features || []),
                            feature,
                          ]);
                        } else {
                          handleFilterChange(
                            "features",
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
