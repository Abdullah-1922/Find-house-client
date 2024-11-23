'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/user.hook';

export default function UserProfileDropdown() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-[45px] w-40 space-x-2 rounded-full hover:border hover:bg-gray-50/50  bg-gray-50/40"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image} alt="User profile image" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <p
            className={`text-sm font-normal ${
              pathname === '/home-video' ? 'text-white' : 'text-black'
            }`}
          >
            Hi, {user?.firstName}
          </p>
          <ChevronRight
            className={`ml-auto h-4 w-4 ${
              pathname === '/home-video' ? 'text-white' : 'text-black'
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 mt-5" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#" className="flex justify-between">
            Profile
            <Badge variant="secondary" className="ml-2">
              New
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
