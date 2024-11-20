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
      id: 1,
      title: 'Real House Luxury Villa',
      price: 9000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Sale',
      featured: true,
      agent: {
        name: 'Lisa Jhonson',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-1.jpg',
    },
    {
      id: 2,
      title: 'Real House Luxury Villa',
      price: 8000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Rent',
      featured: false,
      agent: {
        name: 'Karl Smith',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
    },
    {
      id: 3,
      title: 'Real House Luxury Villa',
      price: 9000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Sale',
      featured: false,
      agent: {
        name: 'katy Teddy',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
    },
    {
      id: 3,
      title: 'Real House Luxury Villa',
      price: 9000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Sale',
      featured: false,
      agent: {
        name: 'katy Teddy',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
    },
    {
      id: 3,
      title: 'Real House Luxury Villa',
      price: 9000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Sale',
      featured: false,
      agent: {
        name: 'katy Teddy',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
    },
    {
      id: 3,
      title: 'Real House Luxury Villa',
      price: 9000,
      location: 'Est St, 77 - Central Park South, NYC',
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: 'For Sale',
      featured: false,
      agent: {
        name: 'katy Teddy',
        image: '/placeholder.svg?height=40&width=40',
      },
      postedTime: '2 months ago',
      imageUrl: 'https://code-theme.com/html/findhouses/images/blog/b-11.jpg',
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
