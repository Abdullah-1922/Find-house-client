'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/container';
import dynamic from 'next/dynamic';
import { useGetMyProductPaymentsDataQuery } from '@/redux/api/features/product/productApi';
import { TProductPayment } from '@/types';
import { useUser } from '@/hooks/user.hook';
import Nodata from '@/components/ui/noData';
import Invoice from '../_components/modules/invoice';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';

export default function InvoicePage() {
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
        <Invoice key={invoice?._id} productPaymentDetails={invoice} />
      ))}

      {allPaymentHistory?.length === 0 && <Nodata />}

      {totalPages > 5 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}
