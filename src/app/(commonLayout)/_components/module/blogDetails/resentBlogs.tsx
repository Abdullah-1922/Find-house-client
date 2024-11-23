'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllBlogsQuery } from '@/redux/api/features/blog/blogApi';
import { TBlog } from '@/types';
import Skeleton from 'react-loading-skeleton';

export default function RecentBlogs() {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);
  const recentBlogs = blogs?.data as TBlog[];

  return (
    <Card className="shadow-lg rounded-lg border">
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg font-bold">
          Recent Blogs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton width={100} height={75} />
                <div>
                  <Skeleton width={150} height={20} />
                  <Skeleton width={100} height={15} />
                </div>
              </div>
            ))}
          </div>
        ) : recentBlogs?.length ? (
          <div className="space-y-4">
            {recentBlogs.slice(0, 4).map((blog: TBlog) => (
              <div key={blog._id} className="flex items-center gap-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={100}
                  height={75}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{blog.title}</h3>
                  <span className="text-sm text-gray-600">{blog.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent blogs found.</p>
        )}
      </CardContent>
    </Card>
  );
}
