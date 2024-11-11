import DashboardSidebar from '@/components/shared/dashboardMenubar';
import React, { ReactNode } from 'react';

interface TLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: TLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for all screen sizes */}
      <div className="lg:flex lg:w-64 fixed top-0 left-0 z-50 h-full bg-[#1e2837]">
        <DashboardSidebar />
      </div>

      {/* Content Area */}
      <div className="lg:ml-64 flex-1 md:px-4 py-6 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
