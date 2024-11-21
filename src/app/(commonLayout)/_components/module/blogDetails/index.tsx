'use client';

import React from 'react';
import Banner from '../../ui/shared/banner';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search } from 'lucide-react';
import { useGetSingleBlogQuery } from '@/redux/api/features/blog/blogApi';
import ResentBlogs from './resentBlogs';
import Image from 'next/image';
import { TBlog } from '@/types';
import CommentSection from './coomentSection';

export default function Blogs({ blogId }: { blogId: string }) {
  console.log(blogId);
  const { data: singleBlog, isLoading } = useGetSingleBlogQuery(blogId);
  const blog = singleBlog?.data as TBlog;
  console.log(singleBlog);
  return (
    <div>
      <Banner pageName="Blogs Details" />
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex gap-5 w-full my-8">
          <div className="flex flex-col items-start gap-5 space-y-5"></div>
          {/* Sidebar Forms */}
          <div>
            <Image
              src={blog?.image}
              width={1000}
              height={100}
              className="w-full object-cover"
              alt="blog image"
            />
            <div className="my-2 space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {blog.title}
              </h2>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                <span>/</span>
                <p className="flex items-center gap-2">
                  <MessageCircle className="text-gray-800 w-4 h-4" />{' '}
                  {blog.comment.length} comments
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {blog.description}
              </p>
            </div>
            {/* Comment section */}
            <CommentSection />
          </div>
          <div className="flex flex-col gap-5 w-[50%] space-y-5">
            {/* Schedule Tour */}
            <div className="w-full flex flex-col items-start gap-3">
              <h2 className="text-gray-800 text-lg md:text-xl font-bold">
                Search
              </h2>
              <div className="flex items-center w-full">
                <Input
                  className="rounded-l-md h-10 w-full"
                  type="search"
                  placeholder="Search blogs"
                />
                <Search className="bg-gray-800 text-white h-10 px-2 rounded-r-lg size-12" />
              </div>
            </div>
            <ResentBlogs />
          </div>
        </div>
      </div>
    </div>
  );
}
