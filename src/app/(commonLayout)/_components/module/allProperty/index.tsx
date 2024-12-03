"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import PropertyCard from "@/components/shared/card/PropertyCard";
import { TProperty } from "@/types";
import { useGetAllPropertiesQuery } from "@/redux/api/features/property/propertyApi";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import PropertyLoadingCard from "@/components/shared/card/PropertyLoadingCard";

export default function AllProperties() {
  const [sortBy, setSortBy] = useState("");
  const [isGridView, setIsGridView] = useState<boolean | undefined>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Update query based on sorting
  const sortQuery =
    sortBy === "Price(low to high)"
      ? "price"
      : sortBy === "Price(high to low)"
      ? "-price"
      : "";

  const { data: propertyData, isLoading } = useGetAllPropertiesQuery(
    `limit=${limit}&page=${currentPage}&sort=${sortQuery}`
  );

  const properties = propertyData?.data as TProperty[];
  const meta = propertyData?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Whenever the sortBy or page changes, reset to the first page
    setCurrentPage(1);
  }, [sortBy]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-2 md:px-4">
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
                <SelectItem value="Price(low to high)">
                  Price(low to high)
                </SelectItem>
                <SelectItem value="Price(high to low)">
                  Price(high to low)
                </SelectItem>
                {/* Add other sorting options if needed */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isGridView ? "default" : "outline"}
              size="icon"
              className={`${
                isGridView
                  ? "bg-gray-800 hover:bg-gray-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              onClick={() => setIsGridView(true)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={!isGridView ? "default" : "outline"}
              size="icon"
              className={`${
                !isGridView
                  ? "bg-gray-800 hover:bg-gray-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
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
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "md:grid-cols-1"
        }`}
      >
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <PropertyLoadingCard key={index} />
          ))}
        {properties?.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            isGridView={isGridView}
          />
        ))}
      </div>

      {/* Pagination */}
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
