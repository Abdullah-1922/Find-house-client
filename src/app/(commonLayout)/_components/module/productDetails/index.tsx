'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import BestSeller from './bestSeller';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetSingleProductQuery } from '@/redux/api/features/product/productApi';
import { TProduct } from '@/types';
import { ProductSearch } from './productSearch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductReviews } from './productReview';

export default function ProductDetails({ productId }: { productId: string }) {
  const { data: productData } = useGetSingleProductQuery(productId);
  const singleProduct = productData?.data as TProduct;

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const onBeforeSlide = (detail: { index: any; prevIndex: any }) => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Product Images and Details Section */}
        <div className="w-[70%] space-y-6">
          <div className="border rounded-md p-3 bg-white">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Product Images */}
              <div className="space-y-4 w-full">
                <LightGallery
                  elementClassNames="custom-wrapper-class"
                  onBeforeSlide={onBeforeSlide}
                >
                  {singleProduct.images.map((image, index) => (
                    <a
                      key={index}
                      href={image}
                      data-src={image}
                      className="w-full"
                    >
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={1000}
                        height={1000}
                        className="object-cover rounded-lg cursor-pointer"
                      />
                    </a>
                  ))}
                </LightGallery>

                <ScrollArea className="w-full">
                  <div className="flex gap-3">
                    <LightGallery
                      elementClassNames="custom-wrapper-class"
                      onBeforeSlide={onBeforeSlide}
                    >
                      {singleProduct.images.map((image, index) => (
                        <a
                          key={index}
                          href={image}
                          data-src={image}
                          className="w-full"
                        >
                          <Image
                            src={image}
                            alt={`Product thumbnail ${index + 1}`}
                            width={1000}
                            height={1000}
                            className="object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity w-1/3"
                          />
                        </a>
                      ))}
                    </LightGallery>
                  </div>
                </ScrollArea>
              </div>

              {/* Product Details */}
              <div className="space-y-6 w-full">
                <h1 className="text-2xl font-bold text-gray-900">
                  {singleProduct.name}
                </h1>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < singleProduct.rating
                            ? 'text-yellow-400'
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-800">
                    {singleProduct.review.length} Customer Review
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col items-start">
                    <span className="text-gray-500 line-through">
                      ${singleProduct.price + 20}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${singleProduct.price}
                    </span>
                  </div>
                  <div>
                    <Button className="bg-gray-800 hover:bg-gray-900 mt-5">
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-gray max-w-none py-8">
              <h2 className="text-lg font-semibold text-gray-800">
                Description
              </h2>
              <div className="h-1 w-12 bg-gray-800 mt-2 mb-4" />
              <p className="text-gray-600">{singleProduct.description}</p>
            </div>
          </div>
          <ProductReviews productId={productId} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 w-[30%] border rounded-md p-3 bg-white">
          <ProductSearch />
          <BestSeller />
        </div>
      </div>
    </div>
  );
}
