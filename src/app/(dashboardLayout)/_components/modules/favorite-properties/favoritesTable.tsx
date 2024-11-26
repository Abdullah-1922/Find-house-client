'use client';

import Image from 'next/image';
import { Delete } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/user.hook';
import { TProperty } from '@/types';
import {
  useGetMyFavoritePropertiesQuery,
  useRemoveFavoritePropertyMutation,
} from '@/redux/api/features/property/propertyApi';
import Link from 'next/link';
import { toast } from 'sonner';
import Nodata from '@/components/ui/noData';
import FeaturedProperties from '@/app/(commonLayout)/_components/module/agencies/FeatureProperties';

export default function FavoritesTable() {
  const { user } = useUser();
  const { data: favoriteData } = useGetMyFavoritePropertiesQuery(user?._id);

  const [removeFavoriteFn] = useRemoveFavoritePropertyMutation();

  console.log('favoriteData', favoriteData);
  const favoriteProperties = favoriteData?.data as TProperty[];

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>My Properties</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {favoriteProperties?.map((property, index) => (
            <TableRow
              key={property?._id}
              className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
            >
              {/* Property Details */}
              <TableCell colSpan={2} className="py-5 whitespace-nowrap">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={property?.images?.[0] || ''}
                      alt={property?.title || 'Property Image'}
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
                    <Link
                      href={`/property/${property?._id}`}
                      className="font-medium leading-none hover:underline whitespace-nowrap"
                    >
                      {property?.title.slice(0, 12) + '...'}
                    </Link>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {property?.description?.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap">
                <p className="bg-green-100 px-2 rounded-md">
                  {' '}
                  {property?.category === 'rent' ? 'For Rent' : 'For Sell'}
                </p>
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap">
                ${property?.price}
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap">
                {property?.location?.address}, {property?.location?.city}
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap">
                <ul className="list-disc list-inside">
                  {property?.features?.slice(0, 2)?.map((feature, i) => (
                    <li className="whitespace-nowrap" key={i}>
                      {feature}
                    </li>
                  ))}
                  {property?.features?.length > 3 && (
                    <li className="whitespace-nowrap">
                      +{property.features.length - 3} more
                    </li>
                  )}
                </ul>
              </TableCell>
              <TableCell className="py-5 whitespace-nowrap">
                <div className="flex gap-3 items-center justify-end">
                  <Button
                    onClick={async () => {
                      if (!user?._id || !property?._id) {
                        return toast.error('User or property ID is missing');
                      }

                      try {
                        await removeFavoriteFn({
                          userId: user._id,
                          propertyId: property._id,
                        });
                        toast.success(
                          'Remove favorite properties successfully'
                        );
                      } catch (error) {
                        toast.error(
                          'Failed to remove favorite property. Please try again.'
                        );
                      }
                    }}
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
      {FeaturedProperties?.length === 0 && <Nodata />}
    </div>
  );
}
