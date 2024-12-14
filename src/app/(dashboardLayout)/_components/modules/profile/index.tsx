"use client";

import React from "react";
import ProfileDetail from "./profileDetails";
import Properties from "../myProperties";
import { useUser } from "@/hooks/user.hook";

export default function Profile() {
  const { user } = useUser();
  console.log(user?.role);
  return (
    <div className="space-y-5 m-2 my-5 mr-6">
      <ProfileDetail />
      {(   user?.role == "admin" || user?.role == "agent") && <Properties />}
    </div>
  );
}
