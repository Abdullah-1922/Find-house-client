"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Nodata from "@/components/ui/noData";
import { useGetAllNewsLetterQuery } from "@/redux/api/features/newsletter/newsletterApi";
import { TNewsLetter } from "@/types/newsletter";

export default function NewsLetters() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetAllNewsLetterQuery(
    `limit=${limit}&page=${currentPage}`
  );
  const productData = data?.data;
  console.log("data", data?.meta);
  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Selected Page:", page);
  };

  if (isLoading) return <Spinner className="h-[600px]" />;
  if (productData.length === 0) {
    return <Nodata />;
  }

  return (
    <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
        Newsletters
      </h2>
      <div className="w-full">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead colSpan={2}>Email</TableHead>
              <TableHead>Date Of Subscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData?.map((item: TNewsLetter, index: number) => (
              <TableRow
                key={item._id}
                className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
              >
                <TableCell colSpan={2} className="py-5">
                  {item.email}
                </TableCell>
                <TableCell className="py-5">
                  {format(item.createdAt, "dd MMM, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <DynamicPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
