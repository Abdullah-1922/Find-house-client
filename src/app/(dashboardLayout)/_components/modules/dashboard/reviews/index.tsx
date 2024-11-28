import React from 'react';
import ReviewCard from './reviewCard';

interface TReview {
  name: string;
  avatar: string;
  time: string;
  reviewText: string;
  rating: number;
}

const reviews = [
  {
    name: 'John Doe',
    avatar:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-6.jpg',
    time: '2023-11-11T12:34:56Z',
    reviewText: 'This is a great product. I love it!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    avatar:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-5.jpg',
    time: '2023-11-10T10:15:23Z',
    reviewText: 'The product is good, but could be better.',
    rating: 3,
  },
  {
    name: 'Michael Johnson',
    avatar:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-4.jpg',
    time: '2023-11-09T15:22:45Z',
    reviewText: "I'm very satisfied with this product.",
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <div className="space-y-6 bg-white rounded-md border p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-1">
        {reviews.map((review: TReview) => (
          <ReviewCard key={review?.time} {...review} />
        ))}
      </div>
    </div>
  );
}
