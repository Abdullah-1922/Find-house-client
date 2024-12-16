/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete, Eye } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllInquiriesQuery,
  useGetInquiriesByAgentQuery,
  useGetInquiriesByUserQuery,
} from "@/redux/api/features/inquiry/inquiryApi";
import { divIcon } from "leaflet";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
  };
  receiver: {
    name: string;
  };
  content: string;
  timestamp: string;
}

export default function MessagesList({
  user,
  role,
}: {
  user: any;
  role: "user" | "agent" | "admin";
}) {
  return (
    <div>
      {role === "admin" ? (
        <AdminMessagesList user={user} />
      ) : (
        <AgentMessagesList user={user} />
      )}
    </div>
  );
}

export function AdminMessagesList({ user }: { user: any }) {
  const { data } = useGetAllInquiriesQuery("limit=5&page=1");
  const inquiryData = data?.data;
  const messages: Message[] = inquiryData?.map((data: any, index: number) => {
    const senderName = data.fullName;
    const initials = senderName
      .split(" ")
      .map((name: string) => name[0])
      .join("");
    const avatar = data.user.image;

    const formattedTimestamp = new Date(data.createdAt).toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return {
      id: (index + 1).toString(),
      sender: {
        name: senderName,
        avatar: avatar,
        initials: initials,
      },
      receiver: {
        name: data.agent.firstName,
      },
      content: data.message,
      timestamp: formattedTimestamp,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Message</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg border p-4"
          >
            <div className="flex flex-col md:flex-row items-start gap-2">
              <Avatar className="size-16">
                <AvatarImage
                  src={message.sender.avatar}
                  alt={message.sender.name}
                />
                <AvatarFallback>{message.sender.initials}</AvatarFallback>
              </Avatar>
              <div className="flex items-start gap-4">
                <div className="grid flex-1 items-center gap-1">
                  <div className="flex flex-col">
                    <div className="font-semibold">
                      {message.sender.name} to {message.receiver.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {message.timestamp}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foregrounds">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
export function AgentMessagesList({ user }: { user: any }) {
  console.log(user);
  const { data } = useGetInquiriesByAgentQuery({
    agentId: user._id,
    query: "limit=5&page=1",
  });
  const inquiryData = data?.data;

  const messages: Message[] = inquiryData?.map((data: any, index: number) => {
    const senderName = data.fullName;
    const initials = senderName
      .split(" ")
      .map((name: string) => name[0])
      .join("");
    const avatar = data.user.image;

    const formattedTimestamp = new Date(data.createdAt).toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return {
      id: (index + 1).toString(),
      sender: {
        name: senderName,
        avatar: avatar,
        initials: initials,
      },
      receiver: {
        name: data.agent.firstName,
      },
      content: data.message,
      timestamp: formattedTimestamp,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Message</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {inquiryData?.length === 0 && <div>No message</div>}
        {inquiryData?.length !== 0 &&
          messages?.map((message) => (
            <div
              key={message.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex flex-col md:flex-row items-start gap-2">
                <Avatar className="size-16">
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-start gap-4">
                  <div className="grid flex-1 items-center gap-1">
                    <div className="flex flex-col">
                      <div className="font-semibold">
                        {message.sender.name} to {message.receiver.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {message.timestamp}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foregrounds">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
export function UserMessagesList({ user }: { user: any }) {
  const { data } = useGetInquiriesByUserQuery({
    userId: user._id,
    query: "limit=5&page=1",
  });
  const inquiryData = data?.data?.result;

  const messages: Message[] = inquiryData?.map((data: any, index: number) => {
    const senderName = data.fullName;
    const initials = senderName
      .split(" ")
      .map((name: string) => name[0])
      .join("");
    const avatar = data.user.image;

    const formattedTimestamp = new Date(data.createdAt).toLocaleString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return {
      id: (index + 1).toString(),
      sender: {
        name: senderName,
        avatar: avatar,
        initials: initials,
      },
      receiver: {
        name: data.agent.firstName,
      },
      content: data.message,
      timestamp: formattedTimestamp,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Message</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {inquiryData?.length === 0 && <div>No message</div>}
        {inquiryData?.length !== 0 &&
          messages?.map((message) => (
            <div
              key={message.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex flex-col md:flex-row items-start gap-2">
                <Avatar className="size-16">
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-start gap-4">
                  <div className="grid flex-1 items-center gap-1">
                    <div className="flex flex-col">
                      <div className="font-semibold">
                        {message.sender.name} to {message.receiver.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {message.timestamp}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foregrounds">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
