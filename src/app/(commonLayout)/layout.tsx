import Navbar from '@/components/shared/Navbar/Navbar';
import Container from '@/components/ui/container';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F5F7FB]">
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default layout;
