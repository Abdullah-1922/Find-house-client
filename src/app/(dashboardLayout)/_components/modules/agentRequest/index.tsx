"use client";

import React, { useState } from "react";
import { Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Spinner from "@/components/ui/spinner";
import { useGetAllAgentRequestQuery } from "@/redux/api/features/users/requestAgentApi";
import AgentRequestTable from "./agentRequestTable";

export default function AllUsers() {
  const [currentPage, setCurrentPage] = useState({
    user: 1,
    agent: 1,
    admin: 1,
  });
  const limit = 5;

  const { data: pendingData, isFetching: isUserFetching } =
    useGetAllAgentRequestQuery(
      `status=pending&limit=${limit}&page=${currentPage.user}`
    );
  const { data: rejectedData, isFetching: isAgentFetching } =
    useGetAllAgentRequestQuery(
      `status=rejected&limit=${limit}&page=${currentPage.agent}`
    );

  const handlePageChange = (
    role: "Pending Request" | "Rejected Request",
    page: number
  ) => {
    setCurrentPage((prev) => ({ ...prev, [role]: page }));
  };

  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-2 my-4 mr-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Agent Request
        </h2>
        <Tabs defaultValue="Pending Request" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Pending Request">Pending Request</TabsTrigger>
            <TabsTrigger value="Rejected Request">Rejected Request</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="Pending Request">
            {isUserFetching ? (
              <Spinner className="h-[400px]" />
            ) : (
              <AgentRequestTable
                requests={pendingData?.data || []}
                meta={pendingData?.meta}
                currentPage={currentPage.user}
                onPageChange={(page) =>
                  handlePageChange("Pending Request", page)
                }
              />
            )}
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents">
            {isAgentFetching ? (
              <Spinner className="h-[400px]" />
            ) : (
              <AgentRequestTable
                requests={rejectedData?.data || []}
                meta={rejectedData?.meta}
                currentPage={currentPage.agent}
                onPageChange={(page) =>
                  handlePageChange("Rejected Request", page)
                }
              />
            )}
          </TabsContent>

          {/* Admins Tab */}
        </Tabs>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
