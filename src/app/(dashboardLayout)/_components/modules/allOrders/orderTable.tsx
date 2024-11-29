"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import {
  useGetAllOrderQuery,
  useUpdatePaymentStatusMutation,
} from "@/redux/api/features/product/productOrderApi";
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
import Spinner from "@/components/ui/spinner";
import Nodata from "@/components/ui/noData";
import { SquareCheckBig } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tolltip";
import { toast } from "sonner";

export default function OrderTable({
  gatewayName,
}: {
  gatewayName: "Online Payment" | "Cash On Delivery";
}) {
  const [updateStatus] = useUpdatePaymentStatusMutation();
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

  const handleUpdateStatus = async (id: string) => {
    try {
      const res = await updateStatus({ id, status: "Paid" }).unwrap();
      console.log("res", res);
      if (res?.data?.success) {
        toast.success(
          res?.data?.message || "Payment status updated successfully"
        );
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error(err?.data?.message || "Failed to update payment status");
    }
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
                  {order.status !== "Paid" && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SquareCheckBig
                            onClick={() => {
                              handleUpdateStatus(order._id);
                            }}
                            className="cursor-pointer p-2 rounded-md bg-green-600 text-white"
                            size={35}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark as Paid</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
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
