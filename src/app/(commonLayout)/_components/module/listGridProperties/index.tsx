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
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';

export default function ListGridProperties() {
  const [sortBy, setSortBy] = useState('Top Selling');
  const [isGridView, setIsGridView] = useState<boolean | undefined>(true);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isFetching } = useGetAllPropertiesQuery(
    `limit=${limit}&page=${currentPage}`
  );

  const properties = data?.data as TProperty[];
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted-foreground text-start">
          {properties?.length} Search results
        </p>
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
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isGridView={isGridView}
          />
        ))}
      </div>
    </div>
  );
}
