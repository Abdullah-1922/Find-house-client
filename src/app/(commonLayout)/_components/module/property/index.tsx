'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LayoutGrid, List } from 'lucide-react';
import PropertyCard from '@/components/shared/card/PropertyCard';
import { TProperty } from '@/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function AllProperties() {
  const [sortBy, setSortBy] = useState('Top Selling');
  const [isGridView, setIsGridView] = useState<boolean | undefined>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;

  const properties: TProperty[] = [
    {
      _id: '67372a4c5c0eade732d63cf8',
      author: {
        _id: '673704d3db3cdc44c18d7b6b',
        firstName: 'Abdullah Al Kafi7',
        secondName: 'Al Kafi',
        auth: '673704d3db3cdc44c18d7b69',
        image:
          'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
        role: 'user',
        paymentHistory: [],
        property: ['67372a4c5c0eade732d63cf8'],
        createdAt: '2024-11-15T08:22:43.986Z',
        updatedAt: '2024-11-15T11:02:36.369Z',
        __v: 0,
      },
      ownedBy: {
        _id: '673704d3db3cdc44c18d7b6b',
        firstName: 'Abdullah Al Kafi7',
        secondName: 'Al Kafi',
        auth: '673704d3db3cdc44c18d7b69',
        image:
          'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
        role: 'user',
        paymentHistory: [],
        property: ['67372a4c5c0eade732d63cf8'],
        createdAt: '2024-11-15T08:22:43.986Z',
        updatedAt: '2024-11-15T11:02:36.369Z',
        __v: 0,
      },
      status: 'active',
      feedback: [],
      title: 'Modern Apartment in Downtown4',
      description:
        'A spacious modern apartment located in the heart of the city with all the necessary amenities2.',
      category: 'rent',
      type: 'apartment',
      rooms: 3,
      price: 1500,
      area: 1200,
      images: [
        'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
        'https://code-theme.com/html/findhouses/images/feature-properties/fp-2.jpg',
      ],
      location: {
        address: '1234 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        latitude: '40.712776',
        longitude: '-74.005974',
      },
      extraInfo: {
        age: '0-10',
        rooms: 3,
        bathrooms: 2,
        _id: '67372a4c5c0eade732d63cf9',
      },
      features: [
        'Air Conditioning',
        'Central Heating',
        'TV Cable & WIFI',
        'Laundry Room',
      ],
      contactInfo: {
        name: 'John Doe',
        userName: 'johndoe123',
        phone: '+1 123 456 7890',
        email: 'johndoe@example.com',
        _id: '67372a4c5c0eade732d63cfa',
      },
      createdAt: '2024-11-15T11:02:36.133Z',
      updatedAt: '2024-11-17T11:04:31.602Z',
      comment: ['673896e4ceacaa8f003fa53c', '6739cdbf4cf3dd5b02aae3c1'],
    },
  ];

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted-foreground text-start">All Properties</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">SORT BY:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Top Selling">Top Selling</SelectItem>
                <SelectItem value="Most Viewed">Most Viewed</SelectItem>
                <SelectItem value="Price(low to high)">
                  Price(low to high)
                </SelectItem>
                <SelectItem value="Price(high to low)">
                  Price(high to low)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isGridView ? 'default' : 'outline'}
              size="icon"
              className={`${
                isGridView
                  ? 'bg-gray-800 hover:bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => setIsGridView(true)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={!isGridView ? 'default' : 'outline'}
              size="icon"
              className={`${
                !isGridView
                  ? 'bg-gray-800 hover:bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => setIsGridView(false)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-6
            ${
              isGridView
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'md:grid-cols-1'
            }
        `}
      >
        {paginatedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isGridView={isGridView}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
