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
import Spinner from '@/components/ui/spinner';
import DynamicPagination from '@/components/shared/pagination/DynamicPagination';
import { useUpdateUserRoleMutation } from '@/redux/api/features/users/userApi';
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
import Nodata from '@/components/ui/noData';

interface UserTableProps {
  users: TUser[];
  meta?: { totalPage: number };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function UserTable({
  users,
  meta,
  currentPage,
  onPageChange,
}: UserTableProps) {
  const [updateRole, { isLoading }] = useUpdateUserRoleMutation();

  if (isLoading) return <Spinner className="h-[400px]" />;

  // handle update user role
  const handleUpdateUserRole = async (
    id: string,
    role: 'user' | 'agent' | 'admin'
  ) => {
    if (!id) return;

    const loadingToast = toast.loading('User role updating...');
    try {
      const res = await updateRole({ id, role }).unwrap();
      if (res.success) {
        toast.success('User role updated successfully', { id: loadingToast });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update user role', {
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
          {users?.map((user, index) => (
            <TableRow
              key={user._id}
              className={`${index % 2 === 0 ? 'bg-muted/50' : ''}`}
            >
              <TableCell colSpan={2} className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={user.image || '/default-avatar.png'}
                      alt={user.firstName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/fallback-image.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">{`${user.firstName} ${user.secondName}`}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                {format(new Date(user.createdAt), 'dd MMM, yyyy')}
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Update Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleUpdateUserRole(user._id, 'user')}
                        >
                          Make User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateUserRole(user._id, 'agent')
                          }
                        >
                          Make Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateUserRole(user._id, 'admin')
                          }
                        >
                          Make Admin
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Delete />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users?.length === 0 ? <Nodata /> : ''}

      {meta?.totalPage! > 1 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={meta?.totalPage!}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
