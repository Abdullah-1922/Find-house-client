'use client';

import { useGetAllBlogsQuery } from '@/redux/api/features/blog/blogApi';

import { TBlog } from '@/types/blog/blog.type';
import BlogLoadingCard from '../../../../../components/shared/card/BlogLoadingCard';
import BlogCard from '@/components/shared/card/BlogCard';

const Blogs = () => {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data;

  return (
    <div>
      <div>
        <div className="flex justify-center my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
            {isLoading &&
              [1, 2, 3, 4, 5, 6].map((index) => (
                <BlogLoadingCard key={index} />
              ))}

            {isLoading ||
              blogs?.map((blog: TBlog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
