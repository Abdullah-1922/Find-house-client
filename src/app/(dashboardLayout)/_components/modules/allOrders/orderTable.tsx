"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import { useGetAllOrderQuery } from "@/redux/api/features/product/productOrderApi";
import { TOrder } from "@/types/products/order.types";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
import Nodata from "@/components/ui/noData";

export default function OrderTable({
  gatewayName,
}: {
  gatewayName: "Online Payment" | "Cash On Delivery";
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useGetAllOrderQuery(
    `gatewayName=${gatewayName}&limit=${limit}&page=${currentPage}`
  );

  const orders = data?.data.result as TOrder[];
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Spinner />;
  if (orders?.length === 0) return <Nodata />;

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction Id</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: TOrder, index: number) => (
            <TableRow
              key={order._id}
              className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
            >
              <TableCell className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={order.customerId.image}
                      alt={order.name}
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
                    <h3 className="font-medium leading-none">{order.name}</h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {order.email}
                    </p>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {order.address}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                {format(order.createdAt, "dd MMM, yyyy")}
              </TableCell>
              <TableCell className="py-5">৳{order.amount}</TableCell>
              <TableCell className={`py-5`}>
                <p
                  className={`px-2 py-1 rounded-md border ${
                    order.status === "Paid"
                      ? "text-green-600/80 border-green-600/40 inline-block text-sm"
                      : "text-yellow-600/80 border-yellow-600/40 inline-block text-sm"
                  }`}
                >
                  {order.status}
                </p>
              </TableCell>
              <TableCell className="py-5">{order.transactionId}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <Link href={`/edit-property/${order._id}`}>
                    <Button
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Link>
                  {/* <PopConfirm
                    name={"property"}
                    onConfirm={() => handleDeleteProperty(order.id.toString())}
                  /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 5 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
