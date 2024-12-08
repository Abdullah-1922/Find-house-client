"use client";

import { Bookmark, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BestSeller from "./bestSeller";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  useAddFavoriteProductsMutation,
  useGetSingleProductQuery,
} from "@/redux/api/features/product/productApi";
import { TProduct, TProductReview } from "@/types";
import { ProductSearch } from "./productSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductReviews } from "./productReview";
import { toast } from "sonner";
import { useUser } from "@/hooks/user.hook";
import { useState } from "react";
import { useGetAllProductReviewsQuery } from "@/redux/api/features/product/productReviewApi";
import Spinner from "@/components/ui/spinner";
import { AuthorizationModal } from "../../modal/authorizationModal";

export default function ProductDetails({ productId }: { productId: string }) {
  const { user } = useUser();

  const { data: productData } = useGetSingleProductQuery(productId);
  const { data: reviewData, refetch } = useGetAllProductReviewsQuery(productId);
  const [addFavoriteFn] = useAddFavoriteProductsMutation();

  const singleProduct = productData?.data as TProduct;
  const allProductReviews = reviewData?.data as TProductReview[];

  // Calculate overall site rating
  const overallRating =
    allProductReviews?.length > 0
      ? allProductReviews.reduce((acc, review) => acc + review.rating, 0) /
        allProductReviews.length
      : 0;

  console.log(overallRating);

  const [selectedImage, setSelectedImage] = useState<string | null>(
    singleProduct?.images?.[0] || null
  );

  if (!singleProduct) {
    return <Spinner />;
  }

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToFavorite = async () => {
    try {
      await addFavoriteFn({
        productId: singleProduct._id,
        userId: user?._id,
      });
      toast.success("Product added to favorite successfully!");
    } catch (error) {
      console.error("Error adding product to favorite:", error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-2 md:p-5">
        {/* Product Images and Details Section */}
        <div className="w-[70%] space-y-6">
          <div className="border rounded-md p-3 bg-white">
            <div className="flex flex-col md:flex-row gap-6 md:p-5">
              {/* Product Images */}
              <div className="space-y-4 w-full md:w-[7/12">
                <LightGallery elementClassNames="lightgallery">
                  <a
                    href={selectedImage || singleProduct?.images[0]}
                    data-src={selectedImage}
                  >
                    <Image
                      src={selectedImage || singleProduct?.images[0]}
                      alt="Main Product Image"
                      width={1000}
                      height={1000}
                      className="w-full object-cover rounded-lg cursor-pointer"
                    />
                  </a>
                </LightGallery>

                <ScrollArea className="w-full">
                  {/* Thumbnail Images */}
                  <div className="flex gap-4 mt-4 overflow-x-auto">
                    {singleProduct.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className={`object-cover rounded-lg cursor-pointer hover:opacity-80 m-3 transition ${
                          selectedImage === image
                            ? "ring-2 ring-gray-800"
                            : "opacity-60"
                        }`}
                        onClick={() => handleThumbnailClick(image)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Product Details */}
              <div className="space-y-6 w-full md:w-7/12">
                <h1 className="text-2xl font-bold text-gray-900">
                  {singleProduct.name}
                </h1>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < overallRating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-500"
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
                  <div className="flex items-center gap-3 pt-5">
                    <div>
                      {user?.email ? (
                        <Button
                          onClick={async () => {
                            if (!user?._id || !singleProduct?._id) {
                              return toast.error(
                                "User or product ID is missing"
                              );
                            }

                            try {
                              await addFavoriteFn({
                                userId: user._id,
                                productId: singleProduct._id,
                              });
                              toast.success(
                                "Added to favorite product successfully"
                              );
                            } catch (error) {
                              toast.error(
                                "Failed to add favorite product. Please try again."
                              );
                            }
                          }}
                          className="bg-gray-800 hover:bg-gray-900"
                        >
                          Add To Cart
                        </Button>
                      ) : (
                        <AuthorizationModal buttonText="Add To Card" />
                      )}
                    </div>
                    <div>
                      {user ? (
                        <Button onClick={handleAddToFavorite}>
                          <Bookmark size={22} />
                        </Button>
                      ) : (
                        <AuthorizationModal
                          buttonText={<Bookmark size={22} />}
                        />
                      )}
                    </div>
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
          <ProductReviews
            refetch={refetch}
            allProductReviews={allProductReviews}
            productId={productId}
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-2 md:p-5 w-[30%] border rounded-md p-3 bg-white">
          <ProductSearch />
          <BestSeller />
        </div>
      </div>
    </div>
  );
}
