import { getCurrentUser } from '@/utils/getCurrentUser';
import Blogs from '../_components/module/blogs/Blogs';
import Banner from '../_components/shared/banner';

const BlogsPage = async () => {
  return (
    <div>
      <Banner pageName="Blogs" />
      <Blogs />
    </div>
  );
};

export default BlogsPage;
