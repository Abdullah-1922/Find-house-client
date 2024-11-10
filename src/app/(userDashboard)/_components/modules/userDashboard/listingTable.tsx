'use client';

import { Pencil, Star } from 'lucide-react';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Listing {
  id: string;
  name: string;
  date: Date;
  rating: number;
  status: 'Active' | 'Non-Active';
}

const listings: Listing[] = [
  {
    id: '1',
    name: 'Luxury Restaurant',
    date: new Date('2020-01-23'),
    rating: 5.0,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Gym in Town',
    date: new Date('2020-02-11'),
    rating: 4.5,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Cafe in Boston',
    date: new Date('2020-01-09'),
    rating: 5.0,
    status: 'Non-Active',
  },
  {
    id: '4',
    name: 'Car Dealer in New York',
    date: new Date('2018-02-24'),
    rating: 4.5,
    status: 'Active',
  },
];

export default function ListingsTable() {
  return (
    <div className="space-y-4 bg-white rounded-md border p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Listing
      </h2>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Listing Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.name}</TableCell>
                <TableCell>{format(listing.date, 'dd MMM yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{listing.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      listing.status === 'Active'
                        ? 'border-green-500 text-green-500'
                        : 'border-red-500 text-red-500'
                    }
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {listing.name}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
