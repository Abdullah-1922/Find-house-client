import React from 'react';
import Image from 'next/image';
import { Delete, Eye, StarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Review {
  name: string;
  avatar: string;
  time: string;
  reviewText: string;
  rating: number;
}

const ReviewCard: React.FC<Review> = ({
  name,
  avatar,
  time,
  reviewText,
  rating,
}) => {
  return (
    <Card className="bg-white p-4 rounded-lg mb-4 flex justify-between items-center gap-5">
      <div>
        <div className="flex items-center mb-2">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>

        <p className="text-gray-700">{reviewText}</p>

        <div className="flex items-center mt-2">
          {[...Array(rating)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="size-6" />
          <span className="sr-only">View Review</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Delete className="size-6 text-red-500" />
          <span className="sr-only">Delete Review</span>
        </Button>
      </div>
    </Card>
  );
};

export default ReviewCard;
