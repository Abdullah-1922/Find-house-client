"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TProductPayment, TProperty, TPropertyPayment } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Nodata from "@/components/ui/noData";
import { useUser } from "@/hooks/user.hook";
import { usePathname } from "next/navigation";
import { useGetAllPropertyPaymentsQuery } from "@/redux/api/features/property/propertyPaymentApi";
export default function AdminPropertyPayment() {
  const { user } = useUser();
  const params = usePathname();
  //   const [deleteProperty] = useDeletePropertyMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const queryString = `limit=${limit}&page=${currentPage}`;

  const { data, isFetching } = useGetAllPropertyPaymentsQuery(queryString);

  if (isFetching) return <Spinner className="h-[400px]" />;

  const payments = data?.data?.map((payment: TPropertyPayment) => ({
    id: payment?._id,
    name: payment?.property?.title,
    address: `${payment?.property?.location?.state}, ${payment?.property?.location?.city}`,
    category: payment?.category,
    paymentType: payment?.paymentType,
    dateAdded: payment?.createdAt,
    gatewayName: payment?.gatewayName,
    currency: payment?.currency,
  }));
  console.log(payments);

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Selected Page:", page);
  };

  if (payments?.length === 0) {
    return <Nodata />;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Gateway Name</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment: any, index: number) => (
            <TableRow
              key={payment?._id}
              className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
            >
              <TableCell className="py-5">
                <div className="flex items-start gap-4">
                  <h3 className="font-medium leading-none">{payment?.name}</h3>
                </div>
              </TableCell>
              <TableCell className="py-5">{payment?.address},</TableCell>
              <TableCell className="py-5">{payment?.category}</TableCell>
              <TableCell className="py-5">{payment?.paymentType}</TableCell>
              <TableCell className="py-5">{payment?.gatewayName}</TableCell>
              <TableCell className="py-5">{payment?.currency}</TableCell>
              <TableCell className="py-5">
                {format(new Date(payment?.dateAdded), "dd MMM, yyyy")}
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
  );
}
