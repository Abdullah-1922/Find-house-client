"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CheckCheck,
  CreditCard,
  Dock,
  FileText,
  Heart,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Plus,
  User2,
  CalendarCheck,
  BookmarkCheck,
  DollarSign,
  Mails,
  MailQuestion,
  Settings,
  Info,
  MessagesSquare,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/utils/logutUser";
import { useUser } from "@/hooks/user.hook";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

type Role = "user" | "agent" | "admin";

const commonNavItems: NavItem[] = [
  { title: "My Properties", href: "/my-properties", icon: Building2 },
  { title: "Favorite Properties", href: "/favorite-properties", icon: Heart },
  {
    title: "Bookmarked Products",
    href: "/bookmarked-products",
    icon: BookmarkCheck,
  },

  { title: "Payments", href: "/payment", icon: CreditCard },
  { title: "Invoices", href: "/product-invoice", icon: FileText },
  { title: "Schedules", href: "/schedules", icon: CalendarCheck },
  { title: "Managements", href: "/admin-dashboard/managements", icon: Info },
  { title: "Setting", href: "/setting", icon: Settings },
];

const roleBasedNavItems = {
  user: [
    { title: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
    { title: "Profile", href: "/profile", icon: User2 },
  ],
  agent: [
    { title: "Dashboard", href: "/agent-dashboard", icon: LayoutDashboard },
    { title: "Profile", href: "/profile", icon: User2 },
    { title: "Add Property", href: "/add-property", icon: Plus },
    { title: "Add Property Payment", href: "/add-payment", icon: Plus },
    {
      title: "All Property Payment",
      href: "/all-property-payment",
      icon: DollarSign,
    },
    {
      title: "Sold Properties",
      href: "/agent-dashboard/properties-sold",
      icon: CheckCheck,
    },
    {
      title: "Inquiries",
      href: "/inquiries",
      icon: MailQuestion,
    },
  ],
  admin: [
    { title: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { title: "Profile", href: "/profile", icon: User2 },
    { title: "Add Product", href: "/admin-dashboard/add-product", icon: Plus },
    { title: "Add Property", href: "/add-property", icon: Plus },
    { title: "Add Property Payment", href: "/add-payment", icon: Plus },
    {
      title: "All Property Payment",
      href: "/all-property-payment",
      icon: DollarSign,
    },
    {
      title: "All Properties",
      href: "/admin-dashboard/all-properties",
      icon: Building2,
    },
    {
      title: "All Products",
      href: "/admin-dashboard/all-products",
      icon: Dock,
    },
    { title: "All Users", href: "/admin-dashboard/all-users", icon: User2 },
    { title: "All Agent Request", href: "/admin-dashboard/agent-request", icon: User2 },
    {
      title: "All Orders",
      href: "/admin-dashboard/all-orders",
      icon: FileText,
    },
    {
      title: "Newsletters",
      href: "/admin-dashboard/newsletters",
      icon: Mails,
    },
    {
      title: "Contact Message",
      href: "/admin-dashboard/contact-messages",
      icon: MessagesSquare,
    },
    {
      title: "Inquiries",
      href: "/inquiries",
      icon: MailQuestion,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  // Access the user's role, ensuring that it is one of the defined roles
  const userRole: Role = user?.role as Role;

  // Determine navigation items based on user role
  const navItems = [
    ...(roleBasedNavItems[userRole] || []),
    ...commonNavItems, // Add common routes for all roles
  ];

  return (
    <>
      <div>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-5 w-[140px] lg:hidden flex items-center px-3 py-2 mt-[60px] text-white rounded-md bg-[#24324A] border-none"
        >
          <Dock />
          <p>{isOpen ? "Close" : "Open"} Sidebar</p>
        </Button>
      </div>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial="closed"
        animate={isOpen || !isMobile ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 z-20 h-full w-64 bg-[#1e2837] text-white lg:block"
      >
        <div className="flex flex-col items-center p-4 bg-[#24324A] -mt-2 md:my-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="https://code-theme.com/html/findhouses/images/logo-blue.svg"
              alt="logo"
              width={120}
              height={120}
            />
          </Link>
        </div>
        <ScrollArea className="h-screen">
          <div className="flex flex-col items-center gap-2 p-4 border-b border-white/10">
            <div className="h-16 w-16 rounded-full border-4 border-green-400 overflow-hidden">
              <Image
                width={1000}
                height={1000}
                src={user?.image}
                alt="Mary Smith"
                className="object-cover w-full h-full "
              />
            </div>
            <div className="text-center font-medium">
              {user?.firstName || "Anonymous"} {user?.secondName}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 pb-32">
            {navItems.map((item: any) => (
              <Link
                href={item.href}
                key={item.href}
                className={`flex items-center gap-4 p-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white ${
                  pathname === item.href ? "bg-white/10 text-white" : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
            <button
              onClick={() => logoutUser()}
              className="flex items-center gap-4 p-2 rounded-md text-white/70 hover:bg-white/10 hover:text-white w-full"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </nav>
        </ScrollArea>
      </motion.div>
    </>
  );
}
