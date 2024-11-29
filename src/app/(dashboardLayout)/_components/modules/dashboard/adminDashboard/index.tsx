"use client";

import React from "react";
import DashboardStats from "../dashboardStats";
import ListingsTable from "../listingTable";
import MessagesList from "../messagesList";
import Reviews from "../reviews";

import { useUser } from "@/hooks/user.hook";
import Spinner from "@/components/ui/spinner";

export default function AdminDashboard() {
  const { user } = useUser();
  if (!user) return <Spinner/>;
  return (
    <div className="space-y-10">
      <DashboardStats user={user} role={"admin"}/>
      <ListingsTable  user={user} role={"admin"}  />
      <MessagesList  user={user} role={"admin"} />
      <Reviews  user={user} role={"user"}/>
    
    </div>
  );
}
