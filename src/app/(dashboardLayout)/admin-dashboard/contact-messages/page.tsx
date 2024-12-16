/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import { format } from "date-fns";
import Nodata from "@/components/ui/noData";
import { useGetAllContactMessageQuery } from "@/redux/api/features/contactUs/contactUsApi";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import { useState } from "react";

export default function Managements() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllContactMessageQuery(`limit=${10}&page=${currentPage}`)
    // handle pagination
    const meta = data?.meta;
    const totalPages = meta?.totalPage;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    if (isLoading) return <Spinner className="h-[600px]" />;
    if (data?.data.length === 0) {
        return <Nodata />;
    }

    return (
        <>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                        Contact Page Messages
                    </h2>
                </div>
                <div className="w-full">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead colSpan={2}>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.map((item: any) => (
                                <TableRow key={item._id}>
                                    <TableCell colSpan={2} className="py-5">
                                        <h3 className="font-medium mb-1 leading-none">
                                            {`${item.firstName} ${item.lastName}`}
                                        </h3>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="py-5">
                                        {item.message}
                                    </TableCell>
                                    <TableCell className="py-5 text-right">
                                        {/* {format(item?.createdAt, "dd MMM, yyyy")} */}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>
            </div>

            {data?.data?.length > 1 && (
                <DynamicPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}
