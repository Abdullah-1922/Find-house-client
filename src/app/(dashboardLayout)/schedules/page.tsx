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
import {
  useGetAllSChedulesQuery,
  useMakeAcceptedMutation,
  useMakeApproveMutation,
} from "@/redux/api/features/property/propertyApi";
import { TProperty, TSchedule } from "@/types";
import { format, parse } from "date-fns";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Nodata from "@/components/ui/noData";
import { useUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import Link from "next/link";

interface Schedule {
  id: string;
  candidate: string;
  candidateEmail: string;
  candidateImg: string;
  agent: string;
  date: string;
  property: TProperty;
  time: string;
  dateAdded: string;
  status: string;
  statusText: string;
  isAccepted: boolean;
  isApproved: boolean;
}

const SchedulePage = () => {
  const { user } = useUser();
  const [makeApprove] = useMakeApproveMutation();
  const [makeAccepted] = useMakeAcceptedMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  let queryString = `limit=${limit}&page=${currentPage}`;
  if (user?.role === "agent") {
    queryString += `&agent=${user?._id}&isApproved=true`;
  }
  if (user?.role === "user") {
    queryString += `&user=${user?._id}`;
  }
  console.log(queryString);
  const { data, isLoading } = useGetAllSChedulesQuery(queryString, {
    skip: user == undefined,
  });

  const scheduleData = data?.data;
  console.log(scheduleData);

  const schedules = scheduleData?.map((schedule: TSchedule) => ({
    id: schedule._id,
    candidate: `${schedule.user.firstName} ${schedule.user.secondName}`,
    candidateEmail: schedule.user.email,
    candidateImg: schedule.user.image,
    agent: `${schedule.agent.firstName} ${schedule.agent.secondName}`,
    property: schedule.property,
    status:
      schedule.isApproved && !schedule.isAccepted ? (
        <p className="px-2 py-1 rounded-md border border-yellow-500 text-yellow-500 inline-block text-sm">
          Approved
        </p>
      ) : schedule.isAccepted ? (
        <p className="px-2 py-1 rounded-md border border-green-500 text-green-500 inline-block text-sm">
          Accepted
        </p>
      ) : (
        <p className="px-2 py-1 rounded-md border border-gray-400 text-gray-400 inline-block text-sm">
          Pending
        </p>
      ),
    statusText:
      schedule.isApproved && !schedule.isAccepted
        ? "approved"
        : schedule.isAccepted
        ? "accepted"
        : "pending",
    date: schedule.date,
    time: parse(schedule.time, "HH:mm", new Date()),
    dateAdded: schedule.createdAt,
  }));

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await makeApprove({ id, isApproved: true });
      console.log("res", res);
      toast.success("Schedule approved successfully");
    } catch {
      toast.error("Failed to approve schedule");
    }
  };
  const handleAccept = async (id: string) => {
    try {
      const res = await makeAccepted({ id, isAccepted: true });
      console.log("res", res);
      toast.success("Schedule accepted successfully");
    } catch {
      toast.error("Failed to accept schedule");
    }
  };

  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Schedules
        </h2>
        <div className="w-full">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead colSpan={2}>Candidate</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules?.map((schedule: Schedule, index: number) => (
                <TableRow
                  key={schedule.id}
                  className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
                >
                  <TableCell colSpan={2} className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                        <Image
                          src={schedule.candidateImg}
                          alt={schedule.candidate}
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
                          {schedule.candidate}
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">
                          {schedule.candidateEmail}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <Link
                      className=" hover:underline"
                      href={`/all-properties/${schedule?.property?._id}`}
                    >
                      {schedule?.property?.title.toString().slice(0, 20)}...
                    </Link>
                  </TableCell>
                  <TableCell className="py-5">
                    {format(schedule.dateAdded, "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="py-5">
                    {format(schedule.date, "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell className="py-5">{schedule.status}</TableCell>
                  <TableCell className="py-5">
                    {format(schedule.time, "hh:mm a")}
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex gap-3 items-center justify-end">
                      {user?.role === "admin" ? (
                        schedule.statusText === "approved" ||
                        schedule.statusText === "accepted" ? null : (
                          <Button
                            onClick={() => handleApprove(schedule.id)}
                            variant="outline"
                            className={`text-yellow-600 hover:text-yellow-600 ${
                              schedule?.isAccepted === true ? "hidden" : "block"
                            }`}
                            size="sm"
                          >
                            Approve
                          </Button>
                        )
                      ) : schedule.statusText === "accepted" ? null : (
                        <Button
                          onClick={() => handleAccept(schedule.id)}
                          variant="outline"
                          className={`text-green-600 hover:text-green-600 ${
                            user?.role === "user" ||
                            schedule?.isAccepted == true
                              ? "hidden"
                              : "block"
                          }`}
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
          {schedules?.length === 0 ? <Nodata /> : ""}
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

export default SchedulePage;
