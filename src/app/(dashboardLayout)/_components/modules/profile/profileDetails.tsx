"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { InquiryForm } from "./inwueryForm";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
import {
  useApplyForAgentMutation,
  useGetUserAgentRequestQuery,
} from "@/redux/api/features/users/requestAgentApi";

export default function ProfileDetail() {
  const { user } = useUser();
  const { data, isLoading } = useGetUserAgentRequestQuery(user?._id);
  const [applyForAgent] = useApplyForAgentMutation();
  console.log(user?._id);
  if (isLoading) return <Spinner />;
  console.log(data);
  if (!user) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="mb-4">Profile</CardTitle>
          <hr />
        </CardHeader>
        <CardContent className="flex gap-2 md:p-5 flex-col md:flex-row justify-between">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  const handleApplyForAgent = async () => {
    const body = {
      userId: user._id,
    };
    const res = await applyForAgent(body);
    console.log(res?.data);
  };

  const {
    firstName,
    secondName,
    image,
    role,
    auth: { email: authEmail },
  } = user;

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="mb-4">Profile</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="flex gap-2 md:p-5 flex-col md:flex-row justify-between">
        <div className="flex flex-col items-start w-full gap-2 md:p-5">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={image || "/default-avatar.png"}
                  alt={`${firstName} ${secondName}`}
                  className="object-cover"
                />
                <AvatarFallback>
                  {firstName?.[0] || ""}
                  {secondName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {firstName} {secondName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {role || "User"}
                </p>
              </div>
            </div>
            <Link href={"/setting"} className="-mt-7">
              <Button variant={"ghost"} className="text-gray-900">
                <Pencil />
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {user?.location}
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              <Phone className="mr-2 h-4 w-4" />
              {user?.phone}
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              {authEmail}
            </p>
          </div>
          <div>
            {user?.role === "user" && (
              <div className="flex flex-col mt-10 items-center justify-between w-full">
                {(!data?.data || data?.data?.status === "rejected") && (
                  <>
                    <p className="text-sm font-semibold mb-2 text-red-600">
                      {data?.data?.status === "rejected"
                        ? "Your request for agent has been rejected. Please try again."
                        : "You are not an agent yet. Please apply to be an agent."}
                    </p>
                    <Button
                      onClick={handleApplyForAgent}
                      type="submit"
                      className="w-full  bg-gray-800 hover:bg-gray-900"
                    >
                      {isLoading ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <span>Submitting...</span>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      ) : (
                        " Apply for be agent"
                      )}
                    </Button>
                  </>
                )}

                {data?.data?.status === "pending" && (
                  <p className="text-sm font-semibold mb-2 text-red-600">
                    Your request for agent is pending. Please wait for admin
                    approval.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {user?.role === "user" && <InquiryForm />}
      </CardContent>
    </Card>
  );
}
