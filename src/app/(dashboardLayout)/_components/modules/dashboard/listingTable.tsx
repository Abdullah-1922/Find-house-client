"use client";

import { Pencil } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProperty, TUser } from "@/types";
import {
  useGetAllPropertiesQuery,
  useGetMyAllPropertiesQuery,
} from "@/redux/api/features/property/propertyApi";
import { useEffect, useState } from "react";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Nodata from "@/components/ui/noData";

export default function ListingsTable({
  user,
  role,
}: {
  user: TUser;
  role: "admin" | "agent";
}) {
  return (
    <div>
      {role === "admin" ? (
        <AdminListingsTable />
      ) : (
        <AgentListingsTable user={user} />
      )}
    </div>
  );
}
export function AdminListingsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 3;

  const { data: propertyData } = useGetAllPropertiesQuery(
    `limit=${limit}&page=${currentPage}`
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
  }, []);

  return (
    <div className="space-y-4 bg-white rounded-md border p-2 md:p-5">
    <h2 className="text-xl font-semibold tracking-tight text-gray-700">
      Listing
    </h2>
    <div className="rounded-lg border bg-white shadow-sm">
      {/* Add horizontal scroll container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>favorite By</TableHead>
              <TableHead>category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Edit</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {properties?.length !== 0 &&
              properties?.map((property: TProperty) => (
                <TableRow className="overflow-x-auto" key={property._id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {property.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(property.createdAt, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {property.favoriteBy?.length} user
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {property.category}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={
                        property.status === "active"
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {property?.title}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
    {/* Pagination */}
    {properties?.length === 0 && <Nodata />}
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
export function AgentListingsTable({ user }: { user: TUser }) {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 3;

  const { data: propertyData } = useGetMyAllPropertiesQuery({
    userId: user._id,
    query: `?limit=${limit}&page=${currentPage}`,
  });

  const properties = propertyData?.data.result as TProperty[];

  const meta = propertyData?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Whenever the sortBy or page changes, reset to the first page
    setCurrentPage(1);
  }, []);
  console.log(properties);
  return (
    <div className="space-y-4 bg-white rounded-md border p-2 md:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Listing
      </h2>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>favorite By</TableHead>
              <TableHead>category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Edit</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {properties?.length !== 0 &&
              properties?.map((property: TProperty) => (
                <TableRow className="overflow-x-auto" key={property._id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {property.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(property.createdAt, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {property.favoriteBy?.length} user
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {property.category}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={
                        property.status === "active"
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                      }
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {property?.title}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {properties?.length === 0 && <Nodata />}
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
