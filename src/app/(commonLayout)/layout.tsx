import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import Container from '@/components/ui/container';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F5F7FB]">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
