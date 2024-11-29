'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/container';
import { useGetMyProductPaymentsDataQuery } from '@/redux/api/features/product/productApi';
import { TProductPayment } from '@/types';
import { useUser } from '@/hooks/user.hook';
import Nodata from '@/components/ui/noData';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';
import Spinner from '@/components/ui/spinner';
import InvoiceCard from './invoiceCard';

export default function Invoice() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetMyProductPaymentsDataQuery(
    `${user?._id}?limit=${limit}&page=${currentPage}`
  );
  const allPaymentHistory = data?.data as TProductPayment[];

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Selected Page:', page);
  };

  return (
    <Container>
      {allPaymentHistory?.map((invoice) => (
        <InvoiceCard key={invoice?._id} productPaymentDetails={invoice} />
      ))}

      {isLoading && <Spinner />}

      {allPaymentHistory?.length === 0 && <Nodata />}

      {totalPages > 1 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}
