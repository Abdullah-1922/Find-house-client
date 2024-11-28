'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  useAddFavoriteProductsMutation,
  useGetAllProductsQuery,
} from '@/redux/api/features/product/productApi';
import { TProduct } from '@/types';
import { ProductSkeletonCard } from '../../skeleton/productSkeletonCard';
import { useUser } from '@/hooks/user.hook';
import { toast } from 'sonner';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();

  const [addFavoriteFn] = useAddFavoriteProductsMutation();
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery({ page: currentPage, limit: 6 });

  const allProducts = productsData?.data as TProduct[];
  const totalPages = productsData?.meta.totalPage || 1;

  console.log(allProducts);

  // Handle error state
  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        There was an error loading the products. Please try again later.
      </div>
    );
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 my-10">
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>Shop List</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold mb-8 text-gray-900">Shop List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, index) => <ProductSkeletonCard key={index} />)
          : allProducts?.map((product) => {
              const overallRating =
                product?.review?.length > 0
                  ? product?.review.reduce(
                      (acc, review) => acc + review.rating,
                      0
                    ) / product?.review.length
                  : 0;

              return (
                <Card
                  key={product._id}
                  className="overflow-hidden bg-gray-100 shadow-sm border border-gray-300"
                >
                  <CardContent className="p-0">
                    <Link href={`/products/${product._id}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-[200px] object-cover"
                      />
                    </Link>
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-semibold mb-2 text-gray-900">
                        {product.name}
                      </h2>
                      <div
                        className="flex justify-center mb-2"
                        role="img"
                        aria-label={`${product.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < overallRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-400 text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-red-500 font-bold">
                          ${(product.price * 0.8).toFixed(2)}{' '}
                          {/* Discount Price Example */}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={async () => {
                        if (!user?._id || !product?._id) {
                          return toast.error('User or product ID is missing');
                        }

                        try {
                          await addFavoriteFn({
                            userId: user._id,
                            productId: product._id,
                          });
                          toast.success('Favorite added product successfully');
                        } catch (error) {
                          toast.error(
                            'Failed to product favorite. Please try again.'
                          );
                        }
                      }}
                      className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      Add To Cart
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="text-sm text-gray-600 border-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? 'default' : 'outline'}
            size="sm"
            className="text-sm"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="text-sm text-gray-600 border-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllProducts;
