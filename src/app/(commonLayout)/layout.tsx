import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F5F7FB]">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default layout;
