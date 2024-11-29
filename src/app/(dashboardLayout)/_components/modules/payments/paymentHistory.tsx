'use client';

import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyProductPaymentsDataQuery } from '@/redux/api/features/product/productApi';
import { useUser } from '@/hooks/user.hook';
import { TProductPayment } from '@/types';
import Nodata from '@/components/ui/noData';
import Spinner from '@/components/ui/spinner';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';
import { useState } from 'react';

export default function PaymentHistory() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetMyProductPaymentsDataQuery(
    `${user?._id}?limit=${limit}&page=${currentPage}`
  );
  const allPaymentHistory = data?.data as TProductPayment[];

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Selected Page:', page);
  };

  return (
    <div className="space-y-4 rounded-md border p-2 md:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Product Payment History
      </h2>
      <div className="rounded-lg border bg-white shadow-sm p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Product Names</TableHead>
              <TableHead className="whitespace-nowrap">
                Transaction Date
              </TableHead>
              <TableHead className="whitespace-nowrap">Amount (BDT)</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPaymentHistory && allPaymentHistory.length > 0 ? (
              allPaymentHistory.map((payment: any) => (
                <TableRow key={payment._id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {payment.products
                      .map((product: any) => product.name)
                      .join(', ')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(payment.createdAt), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    ৳ {payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={
                        payment.status === 'Paid'
                          ? 'border-green-500 text-green-500'
                          : 'border-red-500 text-red-500'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="whitespace-nowrap">
                <TableCell colSpan={4} className="text-center">
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isLoading && <Spinner />}

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
