'use client';

import { TBlog } from '@/types/blog/blog.type';
import BlogCard from '@/components/shared/card/BlogCard';
import { useGetAllBlogsQuery } from '@/redux/api/features/blog/blogApi';

const ArticlesAndTips = () => {
  const { data: blogData, isLoading } = useGetAllBlogsQuery('?sort=-createdAt');
  const allBlogs = blogData?.data;

  return (
    <div className="my-16">
      <div className=" ">
        <h2 className="text-center text-4xl font-bold">Articles & Tips</h2>
        <p className="text-center">Read the latest news from our blog.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {allBlogs?.map((article: TBlog) => (
            <BlogCard key={article?._id} blog={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesAndTips;
