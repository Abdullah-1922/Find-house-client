
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet directly
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Sample property data
const properties = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    price: 750000,
    beds: 3,
    baths: 2,
    type: 'House',
    status: 'For Sale',
  },
  {
    id: 2,
    lat: 40.7589,
    lng: -73.9851,
    price: 1200000,
    beds: 2,
    baths: 2,
    type: 'Apartment',
    status: 'For Rent',
  },
  {
    id: 3,
    lat: 40.7306,
    lng: -73.9352,
    price: 950000,
    beds: 4,
    baths: 3,
    type: 'Condo',
    status: 'For Sale',
  },
  {
    id: 4,
    lat: 40.7069,
    lng: -74.0113,
    price: 600000,
    beds: 1,
    baths: 1,
    type: 'Studio',
    status: 'For Rent',
  },
  {
    id: 5,
    lat: 40.7484,
    lng: -73.9857,
    price: 3000000,
    beds: 5,
    baths: 4,
    type: 'Penthouse',
    status: 'For Sale',
  },
  {
    id: 6,
    lat: 40.7411,
    lng: -73.9897,
    price: 2000000,
    beds: 3,
    baths: 2,
    type: 'Loft',
    status: 'For Rent',
  },
  {
    id: 7,
    lat: 40.759,
    lng: -73.9845,
    price: 850000,
    beds: 2,
    baths: 2,
    type: 'Townhouse',
    status: 'For Sale',
  },
  {
    id: 8,
    lat: 40.715,
    lng: -74.009,
    price: 550000,
    beds: 1,
    baths: 1,
    type: 'Apartment',
    status: 'For Rent',
  },
  {
    id: 9,
    lat: 40.7308,
    lng: -73.9973,
    price: 1250000,
    beds: 3,
    baths: 3,
    type: 'Condo',
    status: 'For Sale',
  },
  {
    id: 10,
    lat: 40.732,
    lng: -74.0018,
    price: 700000,
    beds: 2,
    baths: 1,
    type: 'House',
    status: 'For Sale',
  },
];

interface Filters {
  status: string;
  type: string;
  location: string;
  priceRange: number[];
  beds: string;
  baths: string;
  areaMin: string;
  areaMax: string;
}

export default function HomeMap() {
  const [filters, setFilters] = useState<Filters>({
    status: 'Any Status',
    type: 'Any Type',
    location: 'Any Location',
    priceRange: [40000, 130000],
    beds: 'Any',
    baths: 'Any',
    areaMin: '',
    areaMax: '',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark the app as client-side rendered
  }, []);

  useEffect(() => {
    // Initialize Leaflet icon - Only run on client-side to avoid SSR issues
    if (isClient) {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/marker-icon-2x.png',
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',
      });
    }
  }, [isClient]);

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
  };

  // Custom icon for the marker
  const customIcon = new L.DivIcon({
    className: 'leaflet-div-icon',
    html: `
      <div class=" flex items-center justify-center hover:scale-110 transition-transform duration-300 -mt-2">
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/location-8631201-7174337.png?f=webp&w=256" class="w-14 h-14 object-cover" alt="Home icon" />
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <div className="relative h-[600px] w-full">
      {isClient && (
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={customIcon} // Apply custom marker icon
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.type}</h3>
                  <p className="text-sm">${property.price.toLocaleString()}</p>
                  <p className="text-sm">
                    {property.beds} beds, {property.baths} baths
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="absolute bottom-2 md:mx-0 md:top-10 md:right-10 w-full md:w-[400px] md:h-[450px] bg-white/95 z-[999]">
          <CardContent className="p-4">
            <div className="flex flex-row md:flex-col gap-3 w-full">
              <div className="w-full">
                <label className="text-sm font-medium">Property Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[999] w-full">
                    <SelectItem value="Any Status">Any Status</SelectItem>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="text-sm font-medium">Property Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent className="z-[999] w-full">
                    <SelectItem value="Any Type">Any Type</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full">
              <div className="w-full">
                <label className="text-sm font-medium">Location</label>
                <Select
                  value={filters.location}
                  onValueChange={(value) =>
                    setFilters({ ...filters, location: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent className="z-[999] w-full">
                    <SelectItem value="Any Location">Any Location</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                    <SelectItem value="Queens">Queens</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 w-full md:flex-row md:gap-3">
                <div className="w-1/2">
                  <label className="text-sm font-medium">Beds</label>
                  <Select
                    value={filters.beds}
                    onValueChange={(value) =>
                      setFilters({ ...filters, beds: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="z-[999] w-full">
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-1/2">
                  <label className="text-sm font-medium">Baths</label>
                  <Select
                    value={filters.baths}
                    onValueChange={(value) =>
                      setFilters({ ...filters, baths: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="z-[999] w-full">
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <label className="text-sm font-medium">
                Price Range: ${filters.priceRange[0].toLocaleString()} - $
                {filters.priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={filters.priceRange}
                min={40000}
                max={130000}
                step={1000}
                color="bg-gray-800 hover:bg-gray-900"
                onValueChange={(value) =>
                  setFilters({ ...filters, priceRange: value })
                }
                className="py-4 w-full"
              />
            </div>

            <Button
              onClick={handleSearch}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-900"
            >
              Search
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
