"use client";

import * as React from "react";
import { Edit, MoreHorizontal, Star, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  useCreateProductReviewMutation,
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation,
} from "@/redux/api/features/product/productReviewApi";
import { TProductReview } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/user.hook";
import { useState } from "react";
import { AuthorizationModal } from "../../modal/authorizationModal";

export function ProductReviews({
  productId,
  allProductReviews,
  refetch,
}: {
  productId: string;
  allProductReviews: TProductReview[];
  refetch: any;
}) {
  const [rating, setRating] = useState(0);
  const { user } = useUser();

  // For editing and deleting reviews
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  // Redux hooks for CRUD operations
  const [createProductReviewFn, { isLoading: isCreating }] =
    useCreateProductReviewMutation();
  const [updateProductReviewFn, { isLoading: isUpdating }] =
    useUpdateProductReviewMutation();
  const [deleteProductReviewFn, { isLoading: isDeleting }] =
    useDeleteProductReviewMutation();

  // Handle Create Review
  const handleCreateReview = async () => {
    try {
      const reviewData = {
        userId: user?._id,
        product: productId,
        rating,
        review: editedComment,
      };
      await createProductReviewFn(reviewData).unwrap();
      setEditedComment("");
      refetch();
      setRating(0);
      console.log("Review created successfully");
    } catch (error) {
      console.error("Failed to create review", error);
    }
  };

  // Handle Edit Review
  const handleUpdate = async () => {
    if (selectedReviewId) {
      try {
        await updateProductReviewFn({
          id: selectedReviewId,
          data: { review: editedComment, rating },
        }).unwrap();
        setIsEditOpen(false);
        setEditedComment("");
        setRating(0);
        refetch();
        setSelectedReviewId(null);
        console.log("Review updated successfully");
      } catch (error) {
        console.error("Failed to update review", error);
      }
    }
  };

  // Handle Delete Review
  const handleDelete = async () => {
    if (selectedReviewId) {
      try {
        await deleteProductReviewFn(selectedReviewId).unwrap();
        setIsDeleteOpen(false);
        refetch();
        setSelectedReviewId(null);
        console.log("Review deleted successfully");
      } catch (error) {
        console.error("Failed to delete review", error);
      }
    }
  };

  // State to manage displayed comments
  const [visibleReviews, setVisibleReviews] = useState(3);

  // Handlers for "See More" and "See Less"
  const handleLoadMore = () => setVisibleReviews((prev) => prev + 4); // Show 4 more comments
  const handleSeeLess = () => setVisibleReviews(3); // Reset to the initial state

  return (
    <div className="border rounded-md p-6 bg-white shadow-lg">
      {/* Reviews Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {allProductReviews?.length} Customer Reviews
        </h2>
        <div className="h-1 w-12 bg-gray-800 mt-2" />
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {allProductReviews?.slice(0, visibleReviews)?.map((review) => (
          <div key={review._id} className="border-b pb-8 last:border-b-0">
            <div className="flex items-start gap-6">
              {/* Avatar and Review Info */}
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={review.userId.image}
                  alt={review.userId.firstName}
                />
                <AvatarFallback>
                  {review.userId.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.userId.firstName} {review.userId.secondName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-end gap-2 flex-col">
                    {user?._id === review?.userId?._id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setIsEditOpen(true);
                              setSelectedReviewId(review._id);
                              setEditedComment(review.review);
                              setRating(review.rating);
                            }}
                          >
                            <Edit className="mr-1 size-4 mb-0.5" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setIsDeleteOpen(true);
                              setSelectedReviewId(review._id);
                            }}
                          >
                            <Trash className="mr-1 size-4 mb-0.5 text-red-500" />
                            <span className="text-red-500">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{review?.review}</p>
              </div>
            </div>
          </div>
        ))}

        {/* "See More" and "See Less" Button */}
        <div className="mt-4">
          {visibleReviews < (allProductReviews?.length || 0) && (
            <button
              onClick={handleLoadMore}
              className="text-gray-500 hover:underline"
            >
              See More
            </button>
          )}
          {visibleReviews > 3 && (
            <button
              onClick={handleSeeLess}
              className="ml-4 text-gray-500 hover:underline"
            >
              See Less
            </button>
          )}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Add Your Review</h3>
        <div className="flex gap-2 mb-4">
          {/* Rating Buttons */}
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => setRating(index + 1)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  index < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Review Form */}
        <Textarea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          placeholder="Write your review here"
          className="min-h-[120px] border-gray-300"
        />
        {user ? (
          <Button
            onClick={handleCreateReview}
            disabled={isCreating}
            className="bg-gray-800 hover:bg-gray-900 text-white mt-4 w-full md:w-auto"
          >
            {isCreating ? "Submitting..." : "Submit Review"}
          </Button>
        ) : (
          <AuthorizationModal buttonText="Submit Request" />
        )}
      </div>

      {/* Edit Comment Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Update your review and adjust your rating.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mb-4">
            {/* Rating Buttons */}
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    index < rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="min-h-[120px] border-gray-300"
          />
          <DialogFooter>
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              {isUpdating ? "Updating..." : "Update Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeleteOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
