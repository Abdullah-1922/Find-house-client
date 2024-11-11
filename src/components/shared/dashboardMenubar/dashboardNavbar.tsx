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

interface NavItem {
  title: string;
  href: string;
  submenu?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  { title: 'Home', href: '/' },
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

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredItem(title);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300); // Delay to allow moving to submenu
  };

  return (
    <header className="fixed top-0 z-50 border-b bg-[#24324A] right-0 left-0  md:left-64">
      <nav className="flex items-center gap-4 justify-between py-[11px] px-2 md:px-5 text-white  w-full">
        {/* Mobile menu button */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          'flex items-center gap-1 font-medium text-white',
                          item.title === 'Pages' &&
                            'hover:bg-white hover:text-black'
                        )}
                      >
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.submenu.map((subitem) => (
                        <DropdownMenuItem key={subitem.title} asChild>
                          <Link href={subitem.href}>{subitem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" asChild className="text-white">
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
            <div className="flex flex-col gap-4 -mt-1 bg-[#24324A]">
              {navigation.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-between text-white',
                            item.title === 'Pages' &&
                              'hover:text-white hover:bg-white'
                          )}
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
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white"
                      asChild
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User profile */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">
            Hi, Mary!
          </span>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
