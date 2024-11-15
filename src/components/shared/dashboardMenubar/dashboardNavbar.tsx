'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NavItem {
  title: string;
  href: string;
  submenu?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    submenu: [
      { title: 'All Listings', href: '/listing/all' },
      { title: 'Featured', href: '/listing/featured' },
      { title: 'Recent', href: '/listing/recent' },
    ],
  },
  {
    title: 'Listing',
    href: '/listing',
    submenu: [
      { title: 'All Listings', href: '/listing/all' },
      { title: 'Featured', href: '/listing/featured' },
      { title: 'Recent', href: '/listing/recent' },
    ],
  },
  {
    title: 'Property',
    href: '/property',
    submenu: [
      { title: 'For Sale', href: '/property/sale' },
      { title: 'For Rent', href: '/property/rent' },
      { title: 'New Projects', href: '/property/new' },
    ],
  },
  {
    title: 'Pages',
    href: '/pages',
    submenu: [
      { title: 'About Us', href: '/about' },
      { title: 'Contact', href: '/contact' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export default function DashboardNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(title);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredItem(null), 300);
  };

  return (
    <header className="fixed top-0 z-20 border-b bg-gray-800 right-0 left-0 md:left-64">
      <nav className="flex items-center gap-4 justify-between py-[13px] px-2 md:px-5 text-white w-full">
        {/* Mobile menu button */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="border-none"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </Button>
            </motion.div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-2">
            {navigation.map((item) => (
              <div
                key={item.title}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                {item.submenu ? (
                  <DropdownMenu open={hoveredItem === item.title}>
                    <DropdownMenuTrigger className="border-none" asChild>
                      <Button
                        className={cn(
                          'flex items-center gap-1 text-white border-none bg-transparent hover:bg-transparent'
                        )}
                      >
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.submenu.map((subitem) => (
                        <DropdownMenuItem key={subitem.title} asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={subitem.href}>{subitem.title}</Link>
                          </motion.div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    asChild
                    className="text-white border-none bg-transparent hover:bg-transparent"
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 top-16 z-50 w-full bg-background shadow-lg lg:hidden border-none">
            <div className="flex flex-col gap-4 -mt-1 bg-gray-800">
              {navigation.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className={cn('w-full justify-between text-white')}
                        >
                          {item.title}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                        {item.submenu.map((subitem) => (
                          <DropdownMenuItem key={subitem.title} asChild>
                            <Link href={subitem.href}>{subitem.title}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button className="w-full justify-start text-white" asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User profile dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar flex justify-center items-center w-36 bg-gray-50/50 hover:bg-gray-200/60"
          >
            <div className="w-10 rounded-full">
              <Image
                width={1000}
                height={1000}
                alt="user profile image"
                src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
              />
            </div>
            <h3 tabIndex={0} role="button" className="text-sm">
              Hi, Mary <i className="fas fa-caret-right text-gray-500"></i>
            </h3>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
          >
            <li>
              <Link href={'#'} className="justify-between text-gray-900">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link className="text-gray-900" href={'#'}>
                Settings
              </Link>
            </li>
            <li>
              <Link className="text-gray-900" href={'#'}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
