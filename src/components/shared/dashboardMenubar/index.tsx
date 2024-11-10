'use client';

import * as React from 'react';
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

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true); // Set to true initially

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Hamburger Icon for Mobile */}
      <button
        onClick={handleToggleSidebar}
        className="absolute left-4 z-50 block lg:hidden text-black focus:outline-none"
      >
        <Dock />
      </button>

      {/* Sidebar Overlay on Mobile */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 block lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={handleToggleSidebar}
      />

      {/* Sidebar */}
      <motion.div
        initial="open"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-50 h-full w-64 bg-[#1e2837] text-white lg:block xl:block md:static md:translate-x-0"
      >
        {/* Header */}
        <div className="border-none px-4 py-6 bg-[#24324A] flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-white"
          >
            <Image
              src="https://code-theme.com/html/findhouses/images/logo-blue.svg"
              alt="logo"
              width={150}
              height={150}
              className="w-full"
            />
          </Link>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-2 border-b border-white/10 px-4 pb-6 mt-5">
          <div className="h-16 w-16 rounded-full border-4 border-green-400 overflow-hidden">
            <img
              src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
              alt="Mary Smith"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center">
            <div className="font-medium">Mary Smith</div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white ${
                    pathname === item.href ? 'bg-white/10 text-white' : ''
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => console.log('Logging out...')}
                className="flex w-full items-center gap-4 rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
}
