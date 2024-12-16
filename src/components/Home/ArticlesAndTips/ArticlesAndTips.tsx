'use client';

import { TBlog } from '@/types/blog/blog.type';
import BlogCard from '@/components/shared/card/BlogCard';
import { useGetAllBlogsQuery } from '@/redux/api/features/blog/blogApi';
import PropertyLoadingCard from '@/components/shared/card/PropertyLoadingCard';

const ArticlesAndTips = () => {
  const { data: blogData, isLoading } = useGetAllBlogsQuery(undefined);
  const allBlogs = blogData?.data;

  console.log(allBlogs);


  return (
    <div className="my-20 px-2 md:px-4 max-w-7xl mx-auto">
      <div className=" ">
        <h2 className="text-center text-4xl font-bold">Articles & Tips</h2>
        <p className="text-center">Read the latest news from our blog.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {allBlogs?.map((article: TBlog) => (
            <BlogCard key={article?._id} blog={article} />

          ))}
          {isLoading &&
            [1, 2, 3].map((index) => <PropertyLoadingCard key={index}/>)}
        </div>
      </div>
    </div>
  );
};

export default ArticlesAndTips;
