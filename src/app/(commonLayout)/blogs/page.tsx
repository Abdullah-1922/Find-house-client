import { Home } from 'lucide-react';
import BlogCards from '../_components/module/blogs/BlogCards';
import Link from 'next/link';
import Banner from '../_components/ui/shared/banner';

const Blogs = () => {
  return (
    <div>
      <Banner pageName="Blogs" />
      <BlogCards />
    </div>
  );
};

export default Blogs;
