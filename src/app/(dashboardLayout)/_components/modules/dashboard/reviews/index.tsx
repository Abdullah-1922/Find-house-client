import React, { useEffect, useState } from 'react';
import ReviewCard from './reviewCard';
import { TProductReview, TUser } from '@/types';
import {
  useGetAllProductReviewByAdminQuery,
  useGetAllProductReviewByUserQuery,
} from '@/redux/api/features/product/productReviewApi';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';

interface TReview {
  name: string;
  avatar: string;
  time: string;
  reviewText: string;
  rating: number;
}

export default function Reviews({
  user,
  role,
}: {
  user: TUser;
  role: 'user' | 'admin' | 'agent';
}) {
  return (
    <div>
      {role === 'admin' ? <AdminReviews /> : <UserReviews user={user} />}
    </div>
  );
}
export function AdminReviews() {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 3;

  const { data: ReviewRes } = useGetAllProductReviewByAdminQuery({
    query: `?limit=${limit}&page=${currentPage}`,
  });

  const reviewsData = (ReviewRes?.data as TProductReview[]) || [];
  console.log(reviewsData);
  const reviews = reviewsData?.map((item) => ({
    name: `${item.userId.firstName} ${item.userId.secondName}`,
    avatar: item.userId.image,
    time: item.createdAt,
    reviewText: item.review,
    rating: item.rating,
  }));

  const meta = ReviewRes?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Whenever the sortBy or page changes, reset to the first page
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6 bg-white rounded-md border p-2 md:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-1">
        {reviews?.map((review: TReview) => (
          <ReviewCard key={review?.time} {...review} />
        ))}
      </div>
      {/* Pagination */}

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
export function UserReviews({ user }: { user: TUser }) {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 3;

  const { data: ReviewRes } = useGetAllProductReviewByUserQuery({
    userId: user._id,
    query: `?limit=${limit}&page=${currentPage}`,
  });
  const reviewsData = ReviewRes?.data as TProductReview[];

  const reviews =
    reviewsData?.map((item) => ({
      name: `${item.userId.firstName} ${item.userId.secondName}`,
      avatar: item.userId.image,
      time: item.createdAt,
      reviewText: item.review,
      rating: item.rating,
    })) || [];
  const meta = ReviewRes?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Whenever the sortBy or page changes, reset to the first page
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6 bg-white rounded-md border p-2 md:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Product Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-1">
        {reviews?.length === 0 && (
          <div className="text-center text-3xl font-bold my-5">
            No reviews found
          </div>
        )}
        {reviews?.length !== 0 &&
          reviews?.map((review: TReview) => (
            <ReviewCard key={review?.time} {...review} />
          ))}
      </div>
      {/* Pagination */}
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
