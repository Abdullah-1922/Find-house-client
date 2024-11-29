"use client";

import React from "react";
import DashboardStats from "../dashboardStats";
import MessagesList from "../messagesList";
import Reviews from "../reviews";
import { useUser } from "@/hooks/user.hook";
import Spinner from "@/components/ui/spinner";

export default function UserDashboard() {
  const { user } = useUser();
  if (!user) return <Spinner />;
  return (
    <div className="space-y-10">
      <DashboardStats user={user} role={"user"} />
      {/* <ListingsTable user={user} role={"user"} /> */}
      <MessagesList  user={user} role={"user"}/>
      <Reviews user={user} role={"user"} />
    </div>
  );
}
