'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LayoutGrid, List, Rotate3D, RotateCw } from 'lucide-react';
import PropertyCard from '@/components/shared/card/PropertyCard';
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';
import PropertyLoadingCard from '@/components/shared/card/PropertyLoadingCard';
import Link from 'next/link';

export default function ListGridProperties() {
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState<string>('-price');

  const searchParams = useSearchParams();
  const router = useRouter();

  if (!searchParams) {
    notFound();
  }

  // Extract query parameters from the URL
  const sortParam = searchParams.get('sort') || price; // Default to sorting by price descending
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const bathrooms = searchParams.get('bathrooms');
  const features = searchParams.get('features');
  const location = searchParams.get('location');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minArea = searchParams.get('minArea');
  const maxArea = searchParams.get('maxArea');
  const pageParam = searchParams.get('page');
  const limit = 9;

  // Sync the state with query parameters
  useEffect(() => {
    if (pageParam) setCurrentPage(Number(pageParam));
  }, [pageParam]);

  // Update the query parameters in the URL
  const updateQueryParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };

  // Handle page change and update the URL
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  // Construct query for the Redux hook
  const query = new URLSearchParams({
    limit: limit.toString(),
    page: currentPage.toString(),
    ...(sortParam ? { sort: sortParam } : {}),
    ...(category ? { category } : {}),
    ...(type ? { type } : {}),
    ...(bathrooms ? { bathrooms } : {}),
    ...(features ? { features } : {}),
    ...(location ? { location } : {}),
    ...(minPrice ? { minPrice } : {}),
    ...(maxPrice ? { maxPrice } : {}),
    ...(minArea ? { minArea } : {}),
    ...(maxArea ? { maxArea } : {}),
  }).toString();

  const { data, isLoading } = useGetAllPropertiesQuery(query);

  const meta = data?.meta;
  const totalPages = meta?.totalPage || 0;
  const properties = data?.data as TProperty[];

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted-foreground text-start">
          {properties?.length || 0} Search results
        </p>
        <div className="flex items-center gap-4">
          <Link href={'/list-grid'}>
            <Button size={'sm'} variant={'outline'}>
              <RotateCw />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">SORT BY:</span>
            <Select
              value={sortParam}
              onValueChange={(value) => updateQueryParams('sort', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem onClick={() => setPrice('-price')} value="-price">
                  Price (low to high)
                </SelectItem>
                <SelectItem onClick={() => setPrice('-rice')} value="price">
                  Price (high to low)
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
        className={`grid gap-6 ${
          isGridView
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'md:grid-cols-1'
        }`}
      >
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <PropertyLoadingCard key={index} />
          ))}

        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isGridView={isGridView}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
