import { useGetBlogCommentsQuery } from '@/redux/api/features/blog/blogCommentApi';
import { TBlogComment } from '@/types';
import { TBlog } from '@/types/blog/blog.type';
import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const { data: commentData, isLoading } = useGetBlogCommentsQuery(blog?._id, {
    skip: !blog?._id,
  });
  const comments = commentData?.data as TBlogComment[];
  return (
    <div
      key={blog._id}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <Image
        src={blog.image}
        alt={blog.title}
        width={400}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {comments?.length}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{blog.description.slice(0, 100)}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/blogs/${blog._id}`}
            className="text-black font-bold hover:underline"
          >
            Read more...
          </Link>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">By</span>
            <Image
              src={
                blog?.userId?.image ||
                'https://code-theme.com/html/findhouses/images/blog/b-1.jpg'
              }
              alt={blog?.userId?.firstName}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">
              {blog?.userId?.firstName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
