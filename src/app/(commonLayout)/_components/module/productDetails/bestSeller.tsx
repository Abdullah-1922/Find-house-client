import { useGetAllProductsQuery } from '@/redux/api/features/product/productApi';
import { TProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function BestSeller() {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery({ limit: 6 });

  const allProducts = productsData?.data as TProduct[];
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Best Sellers</h2>
      <div className="space-y-4">
        {allProducts?.map((product) => (
          <Link
            key={product?._id}
            href={`/product/${product?._id}`}
            className="flex items-center space-x-4 group border rounded-md"
          >
            <div className="relative w-20 h-20">
              <Image
                src={product?.images?.[0]}
                alt={`Best seller ${product?.name}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600">
                {product?.name}
              </h3>
              <p className="text-gray-600">$ {product?.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
