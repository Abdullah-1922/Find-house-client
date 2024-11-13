'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  CreditCard,
  Dock,
  FileText,
  Heart,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Plus,
  User2,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard/user', icon: LayoutDashboard },
  { title: 'Profile', href: '/profile', icon: User2 },
  { title: 'My Properties', href: '/properties', icon: Building2 },
  { title: 'Favorited Properties', href: '/favorites', icon: Heart },
  { title: 'Add Property', href: '/properties/new', icon: Plus },
  { title: 'Payments', href: '/payments', icon: CreditCard },
  { title: 'Invoices', href: '/invoices', icon: FileText },
  { title: 'Change Password', href: '/change-password', icon: KeyRound },
];

// Updated Dashboard Sidebar Component
export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      <div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-5 w-[140px] lg:hidden flex items-center px-3 py-2 mt-[97px] text-white rounded-md bg-[#24324A] border-none"
        >
          <Dock />
          <p>{isOpen ? 'Close' : 'Open'} Sidebar</p>
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen || !isMobile ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-20 h-full w-64 bg-[#1e2837] text-white lg:block"
      >
        <div className="flex flex-col items-center p-4 bg-[#24324A]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="https://code-theme.com/html/findhouses/images/logo-blue.svg"
              alt="logo"
              width={120}
              height={120}
            />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 border-b border-white/10 mt-5">
          <div className="h-16 w-16 rounded-full border-4 border-green-400 overflow-hidden">
            <img
              src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
              alt="Mary Smith"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center font-medium">Mary Smith</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`flex items-center gap-4 p-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white ${
                pathname === item.href ? 'bg-white/10 text-white' : ''
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
          <button
            onClick={() => console.log('Logging out...')}
            className="flex items-center gap-4 p-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </nav>
      </motion.div>
    </>
  );
}
