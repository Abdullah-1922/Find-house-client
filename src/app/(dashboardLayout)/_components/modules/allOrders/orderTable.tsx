"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import {
  useGetOrdersByPaymentGatewayQuery,
  useUpdatePaymentStatusMutation,
} from "@/redux/api/features/product/productOrderApi";
import { TOrder } from "@/types/products/order.types";
import Spinner from "@/components/ui/spinner";
import Nodata from "@/components/ui/noData";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrderTable({ gatewayName }: { gatewayName: string }) {
  const [updateStatus] = useUpdatePaymentStatusMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useGetOrdersByPaymentGatewayQuery(
    `${gatewayName}?limit=${limit}&page=${currentPage}`
  );

  const orders = data?.data as TOrder[];
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateStatus = async (
    id: string,
    transactionId: string,
    newStatus: string
  ) => {
    try {
      const updateData = {
        id: id,
        data: { status: newStatus, transactionId: transactionId },
      };
      const res = await updateStatus(updateData).unwrap();
      if (res?.data?.success) {
        toast.success(
          res?.data?.message || `Order status updated to ${newStatus}`
        );
      }
    } catch (err: any) {
      console.error("Error updating status:", err);
      toast.error(err?.data?.message || "Failed to update order status");
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
                {format(new Date(order.createdAt), "dd MMM, yyyy")}
              </TableCell>
              <TableCell className="py-5">à§³{order.amount}</TableCell>
              <TableCell className={`py-5`}>
                <p
                  className={`px-2 py-1 rounded-md border ${
                    order.status === "Paid"
                      ? "text-green-600/80 border-green-600/40 inline-block text-sm"
                      : order.status === "Canceled"
                      ? "text-red-600/80 border-red-600/40 inline-block text-sm"
                      : "text-yellow-600/80 border-yellow-600/40 inline-block text-sm"
                  }`}
                >
                  {order.status}
                </p>
              </TableCell>
              <TableCell className="py-5">{order.transactionId}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Status <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(
                            order.customerId._id,
                            order.transactionId,
                            "Paid"
                          )
                        }
                        disabled={order.status === "Paid"}
                      >
                        Mark as Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(
                            order.customerId._id,
                            order.transactionId,
                            "Canceled"
                          )
                        }
                        disabled={order.status === "Canceled"}
                      >
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
