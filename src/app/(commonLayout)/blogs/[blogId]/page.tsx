import React from 'react';
import Blogs from '../../_components/module/blogDetails';

export default function BlogDetails({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = params;
  return <Blogs blogId={blogId} />;
}
