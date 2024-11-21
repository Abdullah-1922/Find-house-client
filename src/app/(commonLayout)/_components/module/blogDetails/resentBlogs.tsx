'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllBlogsQuery } from '@/redux/api/features/blog/blogApi';
import { TBlog } from '@/types';

export default function ResentBlogs() {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);
  const recentBlogs = blogs?.data as TBlog[];
  console.log(recentBlogs);
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-gray-800"'>Recent Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        {recentBlogs?.length ? (
          <div className="space-y-4">
            {recentBlogs?.slice(0, 4)?.map((blog: TBlog) => (
              <div key={blog._id} className="flex items-center gap-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={100}
                  height={75}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-lg font-semibold text-primary">
                    ${blog.category.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}
