'use client';
import Image from 'next/image';
import { Delete } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useState } from 'react';
import Spinner from '@/components/ui/spinner';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from '@/redux/api/features/users/userApi';
import { TUser } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  role: number;
  registrationDate: string;
}

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isFetching } = useGetAllUsersQuery(
    `limit=${limit}&page=${currentPage}`
  );

  const [updateRole, { isLoading }] = useUpdateUserRoleMutation();

  if (isFetching || isLoading) return <Spinner className="h-[400px]" />;

  const users = data?.data?.map((user: TUser) => ({
    id: user._id,
    name: `${user.firstName} ${user.secondName}`,
    image: user.image,
    email: user.email,
    role: user.role,
    registrationDate: user.createdAt,
  }));

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;
  console.log('meta', meta);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Selected Page:', page);
  };

  // handle update user role
  const handleUpdateUserRole = async (
    id: string,
    role: 'user' | 'agent' | 'admin'
  ) => {
    const res = await updateRole({ id, role });
    console.log('res', res);
    const loadingToast = toast.loading('User role updating...');
    if (res?.data?.success) {
      toast.success('User role updated Successfully', {
        id: loadingToast,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(res?.error?.data.message || 'Failed to  updated user role', {
        id: loadingToast,
      });
    }
  };
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>User</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: User, index: number) => (
            <TableRow
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
            >
              <TableCell colSpan={2} className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">{user.name}</h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                {format(user.registrationDate, 'dd MMM, yyyy')}
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2">
                      <DropdownMenuLabel>Update Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateUserRole(user.id.toString(), 'user')
                          }
                          className="cursor-pointer"
                        >
                          Make User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateUserRole(user.id.toString(), 'agent')
                          }
                          className="cursor-pointer"
                        >
                          Make Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateUserRole(user.id.toString(), 'admin')
                          }
                          className="cursor-pointer"
                        >
                          Make Admin
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    size="sm"
                  >
                    <Delete />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
