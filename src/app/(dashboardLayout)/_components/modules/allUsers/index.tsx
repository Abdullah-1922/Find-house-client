"use client";

import React, { useState } from "react";
import UserTable from "./userTable";
import { Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetRoleBasedUserQuery } from "@/redux/api/features/users/userApi";
import Spinner from "@/components/ui/spinner";

export default function AllUsers() {
  const [currentPage, setCurrentPage] = useState({
    user: 1,
    agent: 1,
    admin: 1,
  });
  const limit = 5;

  const { data: userData, isFetching: isUserFetching } =
    useGetRoleBasedUserQuery(`user?limit=${limit}&page=${currentPage.user}`);
  const { data: agentData, isFetching: isAgentFetching } =
    useGetRoleBasedUserQuery(`agent?limit=${limit}&page=${currentPage.agent}`);
  const { data: adminData, isFetching: isAdminFetching } =
    useGetRoleBasedUserQuery(`admin?limit=${limit}&page=${currentPage.admin}`);

  const handlePageChange = (role: "user" | "agent" | "admin", page: number) => {
    setCurrentPage((prev) => ({ ...prev, [role]: page }));
  };

  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-2 my-4 mr-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Users
        </h2>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            {isUserFetching ? (
              <Spinner className="h-[400px]" />
            ) : (
              <UserTable
                users={userData?.data || []}
                meta={userData?.meta}
                currentPage={currentPage.user}
                onPageChange={(page) => handlePageChange("user", page)}
              />
            )}
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents">
            {isAgentFetching ? (
              <Spinner className="h-[400px]" />
            ) : (
              <UserTable
                users={agentData?.data || []}
                meta={agentData?.meta}
                currentPage={currentPage.agent}
                onPageChange={(page) => handlePageChange("agent", page)}
              />
            )}
          </TabsContent>

          {/* Admins Tab */}
          <TabsContent value="admins">
            {isAdminFetching ? (
              <Spinner className="h-[400px]" />
            ) : (
              <UserTable
                users={adminData?.data || []}
                meta={adminData?.meta}
                currentPage={currentPage.admin}
                onPageChange={(page) => handlePageChange("admin", page)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
