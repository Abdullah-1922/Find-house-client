'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search } from 'lucide-react';
import {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
} from '@/redux/api/features/blog/blogApi';
import ResentBlogs from './resentBlogs';
import Image from 'next/image';
import CommentSection from './coomentSection';
import { useGetBlogCommentsQuery } from '@/redux/api/features/blog/blogCommentApi';
import { TBlogComment } from '@/types';
import { BlogSearchModal } from '../../modal/blogSearchModal';

export default function Blogs({ blogId }: { blogId: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const {
    data: singleBlog,
    isLoading: singleBlogLoading,
    error,
  } = useGetSingleBlogQuery(blogId);

  const { data: searchResults, isFetching } = useGetAllBlogsQuery(query, {
    skip: !query,
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setQuery(`searchTerm=${searchTerm}`);
      setModalOpen(true);
    }
  };
  const { data: commentData } = useGetBlogCommentsQuery(blogId, {
    skip: !blogId,
  });
  const comments = commentData?.data as TBlogComment[];

  return (
    <div>
      {/* Always display the banner */}

      {/* Handle loading, error, or data rendering */}
      {singleBlogLoading ? (
        <div className="text-center py-10 text-gray-500 h-[300px] flex items-center justify-center">
          Loading blog details...
        </div>
      ) : error || !singleBlog?.data ? (
        <div className="text-center py-10 text-red-500">
          Failed to load blog details. Please try again later.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-2 lg:px-4">
          <div className="flex gap-2 md:p-5 w-full my-8">
            <div className="w-[70%]">
              <div className=" border rounded-md bg-white">
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
                <div className="my-4 space-y-2  p-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {singleBlog.data.title}
                  </h2>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <span>
                      {new Date(singleBlog?.data?.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </span>
                    <span>/</span>
                    <span className="flex items-center">
                      <MessageCircle className="text-gray-800 w-4 h-4 mb-0.5" />
                      {comments?.length || 0}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    {singleBlog.data.description}
                  </p>
                </div>
              </div>
              <CommentSection blogId={blogId} />
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-2 md:p-5 w-[30%] border rounded-md p-3 bg-white">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Search</h2>
                <div className="flex items-center w-full h-10 relative">
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-l-md h-10 border-r-0 w-full focus:outline-none"
                    type="search"
                    placeholder="Search blogs"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gray-800 size-6 w-10 text-white h-10 px-2 rounded-r-md absolute right-0"
                  >
                    <Search />
                  </button>
                </div>
                <BlogSearchModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  results={searchResults?.data || []}
                />
              </div>
              <ResentBlogs />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
