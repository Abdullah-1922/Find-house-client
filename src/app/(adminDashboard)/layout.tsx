import DashboardSidebar from '@/components/shared/dashboardMenubar';
import DashboardNavbar from '@/components/shared/dashboardMenubar/dashboardNavbar';
import React, { ReactNode } from 'react';

interface TLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: TLayoutProps) {
  return (
    <div className="">
      {/* Sidebar for large screens */}
      <aside className="fixed lg:static w-full lg:w-64 h-full bg-white shadow-lg lg:shadow-none">
        <DashboardSidebar />
      </aside>

      {/* Content Area */}
      <main>
        <header>
          <DashboardNavbar />
        </header>

        <section className="mt-16 lg:pt-4 px-2 overflow-y-auto z-50">
          {children}
        </section>
      </main>
    </div>
  );
}
