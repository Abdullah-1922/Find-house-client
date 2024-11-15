'use client';

import Image from 'next/image';
import { Delete, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Favorite {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  dateAdded: string;
  views: number;
  imageUrl: string;
}

const favorites: Favorite[] = [
  {
    id: 1,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 5,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 143,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
  {
    id: 2,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 4,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 202,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
  {
    id: 3,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 5,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 412,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
  {
    id: 4,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 4,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 875,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
  {
    id: 5,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 5,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 325,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
  {
    id: 6,
    name: 'Luxury Villa House',
    address: 'Est5, 77 Central Park South, NYC',
    rating: 4,
    reviews: 5,
    dateAdded: '08.14.2020',
    views: 247,
    imageUrl:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
];

export default function FavoritesTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>My Properties</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Views</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favorites.map((Favorite, index) => (
            <TableRow
              key={Favorite.id}
              className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
            >
              <TableCell colSpan={2} className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={Favorite.imageUrl}
                      alt={Favorite.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">
                      {Favorite.name}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {Favorite.address}
                    </p>
                    <div className="flex items-center whitespace-nowrap gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Favorite.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground mt-1">
                        ({Favorite.reviews} Reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">{Favorite.dateAdded}</TableCell>
              <TableCell className="py-5">{Favorite.views}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <Button
                    variant="outline"
                    className="text-green-600 hover:text-green-700"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    size="sm"
                  >
                    <Delete />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#24324A] hover:bg-[#24324A] hover:text-white text-white"
        >
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
