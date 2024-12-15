import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import { useUpdateUserRoleMutation } from "@/redux/api/features/users/userApi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Nodata from "@/components/ui/noData";
import { TAgentRequest } from "@/types";
import { useUpdateRequestAgentStatusMutation } from "@/redux/api/features/users/requestAgentApi";

interface UserTableProps {
  requests: TAgentRequest[];
  meta?: { totalPage: number };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function AgentRequestTable({
  requests,
  meta,
  currentPage,
  onPageChange,
}: UserTableProps) {
  const [updateRequestStatus, { isLoading }] =
    useUpdateRequestAgentStatusMutation();

  if (isLoading) return <Spinner className="h-[400px]" />;

  // handle update user role
  const handleUpdateUserRole = async (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    if (!id) return;

    const loadingToast = toast.loading("request updating...");
    try {
      console.log({ id, status });
      const res = await updateRequestStatus({ id, status }).unwrap();
      if (res.success) {
        toast.success("User Updated to agent successfully", {
          id: loadingToast,
        });
      }
      console.log(res);
    } catch (error: unknown) {
      console.log(error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update user role to agent";
      toast.error(message, { id: loadingToast });
    }
  };

  const totalPages = meta?.totalPage ?? 0;

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead colSpan={2}>User</TableHead>
            <TableHead>Apply Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request: TAgentRequest, index) => (
            <TableRow
              key={request._id}
              className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
            >
              <TableCell colSpan={2} className="py-5">
                <div className="flex items-start gap-4">
                  <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                    <Image
                      src={request.userId.image || "/default-avatar.png"}
                      alt={request.userId.firstName}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">{`${request.userId.firstName} ${request.userId.secondName}`}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request?.userId?.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                {format(new Date(request.createdAt), "dd MMM, yyyy")}
              </TableCell>
              <TableCell className="capitalize">
                {request.userId.role}
              </TableCell>
              <TableCell className="py-5">
                <div className="flex gap-3 items-center justify-end">
                  {request.status === "pending" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="outline">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateUserRole(request._id, "accepted")
                            }
                          >
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateUserRole(request._id, "rejected")
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-green-500">No action required</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {requests?.length === 0 ? <Nodata /> : ""}

      {totalPages > 1 && (
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
