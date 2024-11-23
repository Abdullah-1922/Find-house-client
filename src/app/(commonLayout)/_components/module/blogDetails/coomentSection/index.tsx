'use client';

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
          : comments?.map((comment, index) => (
              <Comment key={index} commentData={comment} />
            ))}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        Leave a Comment
      </h3>
      <CommentForm />
    </div>
  );
}
