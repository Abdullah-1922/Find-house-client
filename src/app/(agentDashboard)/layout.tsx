import DashboardSidebar from '@/components/shared/dashboardMenubar';
import DashboardNavbar from '@/components/shared/dashboardMenubar/dashboardNavbar';
import React, { ReactNode } from 'react';

interface TLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: TLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for large screens */}
      <aside className="static w-64 h-full bg-white shadow-lg lg:shadow-none">
        <DashboardSidebar />
      </aside>

      {/* Content Area */}
      <main className="flex-1">
        <header className="static w-full">
          <DashboardNavbar />
        </header>

        <section className="mt-20 px-2 md:pr-6 overflow-y-auto overflow-x-hidden">
          {children}
        </section>
      </main>
    </div>
  );
}
