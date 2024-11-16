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

export default function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-[50px] w-40 space-x-2 rounded-full hover:border bg-gray-50/10 hover:bg-gray-200/10"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
              alt="User profile image"
            />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal text-gray-400">Hi, Mary</span>
          <ChevronRight className="ml-auto h-4 w-4 text-gray-50" />
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
