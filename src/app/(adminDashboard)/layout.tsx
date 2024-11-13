import DashboardSidebar from '@/components/shared/dashboardMenubar';
import DashboardNavbar from '@/components/shared/dashboardMenubar/dashboardNavbar';
import React, { ReactNode } from 'react';

interface TLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: TLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar for large screens */}
      <aside className="fixed lg:static w-full lg:w-64 h-full bg-white shadow-lg lg:shadow-none">
        <DashboardSidebar />
      </aside>

      {/* Content Area */}
      <main className="flex-1">
        <header className="fixed lg:static w-full">
          <DashboardNavbar />
        </header>

        <section className="mt-16 lg:pt-4 px-2 overflow-y-auto z-50">
          {children}
        </section>
      </main>
    </div>
  );
}
