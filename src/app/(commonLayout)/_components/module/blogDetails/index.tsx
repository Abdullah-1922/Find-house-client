'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search } from 'lucide-react';
import { useGetSingleBlogQuery } from '@/redux/api/features/blog/blogApi';
import ResentBlogs from './resentBlogs';
import Image from 'next/image';
import CommentSection from './coomentSection';

export default function Blogs({ blogId }: { blogId: string }) {
  const { data: singleBlog, isLoading, error } = useGetSingleBlogQuery(blogId);

  return (
    <div>
      {/* Always display the banner */}

      {/* Handle loading, error, or data rendering */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500 h-[300px] flex items-center justify-center">
          Loading blog details...
        </div>
      ) : error || !singleBlog?.data ? (
        <div className="text-center py-10 text-red-500">
          Failed to load blog details. Please try again later.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-2 lg:px-4">
          <div className="flex gap-5 w-full my-8">
            <div className="w-[70%]">
              {/* Blog content */}
              {singleBlog.data.image && (
                <Image
                  src={singleBlog.data.image}
                  width={1000}
                  height={100}
                  className="w-full object-cover rounded-lg"
                  alt="Blog image"
                />
              )}
              <div className="my-4 space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {singleBlog.data.title}
                </h2>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <span>
                    {new Date(singleBlog.data.createdAt).toLocaleDateString()}
                  </span>
                  <span>/</span>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="text-gray-800 w-4 h-4" />
                    {singleBlog.data.comment?.length || 0} comments
                  </span>
                </div>
                <span className="text-gray-700 leading-relaxed">
                  {singleBlog.data.description}
                </span>
              </div>
              <CommentSection blogId={blogId} />
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5 w-[30%]">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Search</h2>
                <div className="flex items-center w-full">
                  <Input
                    className="rounded-l-md"
                    type="search"
                    placeholder="Search blogs"
                  />
                  <Search className="bg-gray-800 text-white h-10 px-2 rounded-r-md" />
                </div>
              </div>
              <ResentBlogs />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
