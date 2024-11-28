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
import { logoutUser } from '@/utils/logutUser';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tolltip';
import { useUser } from '@/hooks/user.hook';

export default function UserProfileDropdown() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-[45px] w-40 space-x-2 rounded-full border hover:border-gray-300 hover:bg-gray-50/50  bg-gray-50/40"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className="object-cover"
                    src={user?.image}
                    alt="User profile image"
                  />
                  <AvatarFallback>
                    {user?.firstName?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <p
                  className={`text-sm font-normal ${
                    pathname === '/home-video' ? 'text-white' : 'text-black'
                  }`}
                >
                  Hi, {user?.firstName?.slice(0, 4)}...
                </p>
                <ChevronRight
                  className={`ml-auto h-4 w-4 ${
                    pathname === '/home-video' ? 'text-white' : 'text-black'
                  }`}
                />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent className="bg-gray-800">
            <p>
              {user?.firstName} {user?.secondName}
            </p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-52 mt-5" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex justify-between">
              Profile
              <Badge variant="secondary" className="ml-2">
                New
              </Badge>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/setting">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link onClick={() => logoutUser()} href="#">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
