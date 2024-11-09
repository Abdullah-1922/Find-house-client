import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[#F5F7FB]">{children}</div>;
};

export default layout;
