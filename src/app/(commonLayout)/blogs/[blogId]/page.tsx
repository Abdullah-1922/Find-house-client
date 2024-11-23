import React from 'react';
import Blogs from '../../_components/module/blogDetails';
import Banner from '../../_components/shared/banner';

export default function BlogDetails({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = params;
  return (
    <div>
      <Banner pageName="Blog Details" />
      <Blogs blogId={blogId} />;
    </div>
  );
}
