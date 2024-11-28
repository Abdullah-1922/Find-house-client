import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F5F7FB]">
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
      <Toaster duration={2000} position="bottom-right" />
    </div>
  );
};

export default layout;
