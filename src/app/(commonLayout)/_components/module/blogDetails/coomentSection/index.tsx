'use client';

import { useState } from 'react';
import { useGetBlogCommentsQuery } from '@/redux/api/features/blog/blogCommentApi';
import { Comment } from './comment';
import { CommentForm } from './commentForm';
import { TBlogComment } from '@/types';
import Skeleton from 'react-loading-skeleton';

export default function CommentSection({ blogId }: { blogId: string }) {
  const { data: commentData, isLoading } = useGetBlogCommentsQuery(blogId, {
    skip: !blogId,
  });
  const comments = commentData?.data as TBlogComment[];

  // State to manage displayed comments
  const [visibleComments, setVisibleComments] = useState(3);

  // Handlers for "See More" and "See Less"
  const handleLoadMore = () => setVisibleComments((prev) => prev + 4); // Show 4 more comments
  const handleSeeLess = () => setVisibleComments(3); // Reset to the initial state

  return (
    <div className="my-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          `${comments?.length || 0} Comments`
        )}
      </h2>
      <div className="space-y-4">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4 p-4 border-b">
                <Skeleton circle={true} height={48} width={48} />
                <div>
                  <Skeleton width={150} height={20} />
                  <Skeleton width={200} height={15} />
                  <Skeleton height={30} />
                </div>
              </div>
            ))
          : comments
              ?.slice(0, visibleComments) // Show only visible comments
              .map((comment, index) => (
                <Comment key={index} commentData={comment} />
              ))}
      </div>
      {/* "See More" and "See Less" Button */}
      <div className="mt-4">
        {visibleComments < (comments?.length || 0) && (
          <button
            onClick={handleLoadMore}
            className="text-gray-500 hover:underline"
          >
            See More
          </button>
        )}
        {visibleComments > 3 && (
          <button
            onClick={handleSeeLess}
            className="ml-4 text-gray-500 hover:underline"
          >
            See Less
          </button>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        Leave a Comment
      </h3>
      <CommentForm blogId={blogId} />
    </div>
  );
}
