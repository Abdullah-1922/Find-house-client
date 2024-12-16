"use client";
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
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Nodata from "@/components/ui/noData";
import { useUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import {
  useGetAllInquiriesQuery,
  useUpdateInquiryMutation,
} from "@/redux/api/features/inquiry/inquiryApi";
import { TInquiry } from "@/types/inquiry";

interface Inquiry {
  id: string;
  candidate: string;
  candidateEmail: string;
  candidateImg: string;
  agent: string;
  dateAdded: string;
  status: string;
  statusText: string;
  message: string;
}

const Inquiries = () => {
  const { user } = useUser();
  const [updateStatus] = useUpdateInquiryMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  let queryString = `limit=${limit}&page=${currentPage}`;
  if (user?.role === "agent") {
    queryString += `&agent=${user?._id}&isApproved=${true}`;
  }

  const { data, isLoading } = useGetAllInquiriesQuery(queryString, {
    skip: user == undefined,
  });

  const inquiryData = data?.data;
  console.log("scheduleData", inquiryData);

  const inquiries = inquiryData?.map((inquiry: TInquiry) => ({
    id: inquiry._id,
    candidate: `${inquiry.user.firstName} ${inquiry.user.secondName}`,
    candidateEmail: inquiry.user.email,
    message: inquiry.message,
    candidateImg: inquiry.user.image,
    agent: `${inquiry.agent.firstName} ${inquiry.agent.secondName}`,
    status:
      inquiry.isApproved && !inquiry.isAccepted ? (
        <p className="px-2 py-1 rounded-md border border-yellow-500 text-yellow-500 inline-block text-sm">
          Approved
        </p>
      ) : inquiry.isAccepted ? (
        <p className="px-2 py-1 rounded-md border border-green-500 text-green-500 inline-block text-sm">
          Accepted
        </p>
      ) : (
        <p className="px-2 py-1 rounded-md border border-gray-400 text-gray-400 inline-block text-sm">
          Pending
        </p>
      ),
    statusText:
      inquiry.isApproved && !inquiry.isAccepted
        ? "approved"
        : inquiry.isAccepted
        ? "accepted"
        : "pending",
    dateAdded: inquiry.createdAt,
  }));

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = async (inquiryId: string) => {
    try {
      const res = await updateStatus({ inquiryId, body: { isApproved: true } });
      console.log("res", res);
      toast.success("Inquiry approved successfully");
    } catch {
      toast.error("Failed to approve inquiry");
    }
  };
  const handleAccept = async (inquiryId: string) => {
    try {
      const res = await updateStatus({ inquiryId, body: { isAccepted: true } });
      console.log("res", res);
      toast.success("Inquiry accepted successfully");
    } catch {
      toast.error("Failed to accept inquiry");
    }
  };

  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Inquiries
        </h2>
        <div className="w-full">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead colSpan={2}>Candidate</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries?.map((inquiry: Inquiry, index: number) => (
                <TableRow
                  key={inquiry.id}
                  className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
                >
                  <TableCell colSpan={2} className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                        <Image
                          src={inquiry.candidateImg}
                          alt={inquiry.candidate}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg";
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium leading-none">
                          {inquiry.candidate}
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">
                          {inquiry.candidateEmail}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    {format(inquiry.dateAdded, "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="py-5">{inquiry.message}</TableCell>

                  <TableCell className="py-5">{inquiry.status}</TableCell>
                  <TableCell className="py-5">
                    <div className="flex gap-3 items-center justify-end">
                      {user?.role === "admin" ? (
                        inquiry.statusText === "approved" ? null : (
                          <Button
                            onClick={() => handleApprove(inquiry.id)}
                            variant="outline"
                            className="text-yellow-600 hover:text-yellow-600"
                            size="sm"
                          >
                            Approve
                          </Button>
                        )
                      ) : inquiry.statusText === "accepted" ? null : (
                        <Button
                          onClick={() => handleAccept(inquiry.id)}
                          variant="outline"
                          className="text-green-600 hover:text-green-600"
                          size="sm"
                        >
                          Accept
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {inquiries?.length === 0 ? <Nodata /> : ""}
          {isLoading && <Spinner />}

          {totalPages > 1 && (
            <DynamicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
