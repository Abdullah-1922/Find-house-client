'use client';

import { useUser } from '@/hooks/user.hook';
import {
  useGetMyFavoriteProductsQuery,
  useRemoveFavoriteProductsMutation,
} from '@/redux/api/features/product/productApi';
import { TProduct } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Delete } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import Nodata from '@/components/ui/noData';
import { formatDate } from 'date-fns';

export default function BookmarkedTable() {
  const { user } = useUser();
  const { data: favoriteData, isLoading } = useGetMyFavoriteProductsQuery(
    user?._id
  );

  const [removeFavoriteFn] = useRemoveFavoriteProductsMutation();

  const favoriteProducts = (favoriteData?.data as TProduct[]) || [];

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>My Products</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {favoriteProducts.length > 0
            ? favoriteProducts.map((product, index) => (
                <TableRow
                  key={product?._id}
                  className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
                >
                  {/* Product Image and Details */}
                  <TableCell colSpan={2} className="py-5 whitespace-nowrap">
                    <div className="flex items-start gap-4">
                      <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                        <Image
                          src={product?.images?.[0] || 'fallback-image-url.jpg'}
                          alt={product?.name || 'Property Image'}
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
                          href={`/product/${product?._id}`}
                          className="font-medium leading-none hover:underline whitespace-nowrap"
                        >
                          {product?.name
                            ? `${product.name.slice(0, 12)}...`
                            : 'No Title'}
                        </Link>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">
                          {product?.description
                            ? `${product.description.slice(0, 20)}...`
                            : 'No Description'}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="py-5 whitespace-nowrap">
                    {formatDate(product.createdAt, 'dd MMM, yyyy')}
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-5 whitespace-nowrap">
                    {product?.category?.charAt(0).toUpperCase() +
                      product?.category?.slice(1)}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-5 whitespace-nowrap">
                    ${product?.price || 'N/A'}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-5 whitespace-nowrap">
                    <div className="flex gap-3 items-center justify-end">
                      <Button
                        onClick={async () => {
                          if (!user?._id || !product?._id) {
                            return toast.error('User or product ID is missing');
                          }

                          try {
                            await removeFavoriteFn({
                              userId: user._id,
                              productId: product._id,
                            });
                            toast.success(
                              'Removed favorite product successfully'
                            );
                          } catch (error) {
                            toast.error(
                              'Failed to remove favorite product. Please try again.'
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
              ))
            : ''}
        </TableBody>
      </Table>

      {isLoading && <Spinner />}
      {!isLoading && favoriteProducts.length === 0 && <Nodata />}
    </div>
  );
}
