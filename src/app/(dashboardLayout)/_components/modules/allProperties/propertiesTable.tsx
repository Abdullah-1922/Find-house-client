"use client";

import Image from "next/image";
import { Delete, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetAllPropertiesQuery } from "@/redux/api/features/property/propertyApi";
import { TProperty } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";

interface Property {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  dateAdded: string;
  views: number;
  imageUrl: string;
}

export default function PropertiesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isFetching } = useGetAllPropertiesQuery(
    `limit=${limit}&page=${currentPage}`
  );

  if (isFetching) return <Spinner className="h-[400px]" />;

  const properties = data?.data?.map((property: TProperty) => ({
    id: property.id,
    name: property.title,
    address: property.location.address,
    rating: 4,
    reviews: property.feedback.length,
    dateAdded: property.createdAt,
    views: property.views,
    imageUrl: property.images[0],
  }));

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;
  console.log("meta", meta);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Selected Page:", page);
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>My Properties</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Views</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties?.map((property: Property, index: number) => (
            <TableRow
              key={property.id}
              className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
            >
              <TableCell colSpan={2} className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={property.imageUrl}
                      alt={property.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">
                      {property.name}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {property.address}
                    </p>
                    <div className="flex items-center whitespace-nowrap gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < property.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground mt-1">
                        ({property.reviews} Reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                {format(property.dateAdded, "dd MMM, yyyy")}
              </TableCell>
              <TableCell className="py-5">{property.views}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <Button
                    variant="outline"
                    className="text-green-600 hover:text-green-700"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    size="sm"
                  >
                    <Delete />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
