/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Heart,
  ListStart,
  MessageCircle,
  NewspaperIcon,
  ShoppingCart,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetAllStatsQuery } from "@/redux/api/features/stats/statsApi";
import { TUser } from "@/types";
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardStats({
  role,
  user,
}: {
  role: "admin" | "agent" | "user";
  user: TUser;
}) {
  const { data } = useGetAllStatsQuery({ role, userId: user?._id });
  type TAdminStats = {
    totalActiveProperties: number;
    totalBlogComments: number;
    totalBlogs: number; //done
    totalFavoriteProperties: number; //done
    totalMessages: number; //done
    totalNonActiveProperties: number;
    totalPayments: number;
    totalProducts: number; //done
    totalProperties: number; //done
    totalRentProperties: number;
    totalReviews: number; //done
    totalSellProperties: number; //done
    totalUsers: number; //done
  };
  type TUserStats = {
    totalFavoriteProperties: number;
    totalBlogAdded: number;
    totalBlogComments: number;
    totalPropertyComments: number;
  };
  type TAgentStats = {
    totalProperties: number;
    totalFavoriteProperties: number;
    totalBlogAdded: number;
    totalBlogComments: number;
    totalPropertyComments: number;
  };

  const resData: TAdminStats | TUserStats = data?.data;
  let stats: any = [];

  if (role === "admin") {
    stats = [
      {
        icon: <ListStart className="h-6 w-6 text-white" />,
        label: "Published Property",
        value: (resData as TAdminStats)?.totalProperties.toString() || "...",
        className: "bg-emerald-500",
      },
      {
        icon: <Star className="h-6 w-6 text-white" />,
        label: "Total Reviews",
        value: (resData as TAdminStats)?.totalReviews.toString() || "...",
        className: "bg-orange-500",
      },
      {
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        label: "Messages",
        value: (resData as TAdminStats)?.totalMessages.toString() || "...",
        className: "bg-blue-500",
      },
      {
        icon: <Heart className="h-6 w-6 text-white" />,
        label: "Times Bookmarked",
        value:
          (resData as TAdminStats)?.totalFavoriteProperties.toString() || "...",
        className: "bg-pink-500",
      },
      {
        icon: <NewspaperIcon className="h-6 w-6 text-white" />,
        label: "Published Blogs",
        value: (resData as TAdminStats)?.totalBlogs.toString() || "...",
        className: "bg-pink-500",
      },
      {
        icon: <Users className="h-6 w-6 text-white" />,
        label: "Total Users",
        value: (resData as TAdminStats)?.totalUsers.toString() || "...",
        className: " bg-blue-500",
      },
      {
        icon: <ShoppingCart className="h-6 w-6 text-white" />,
        label: "Total Products",
        value: (resData as TAdminStats)?.totalProducts.toString() || "...",
        className: "bg-orange-500",
      },
      {
        icon: <Wallet className="h-6 w-6 text-white" />,
        label: "Total Payments completed",
        value: (resData as TAdminStats)?.totalPayments.toString() || "...",
        className: "bg-emerald-500 ",
      },
    ];
  }
  if (role === "user") {
    stats = [
      {
        icon: <Heart className="h-6 w-6 text-white" />,
        label: "Times Bookmarked",
        value:
          (resData as TUserStats)?.totalFavoriteProperties.toString() || "...",
        className: "bg-pink-500",
      },

      {
        icon: <NewspaperIcon className="h-6 w-6 text-white" />,
        label: "Blogs Added",
        value: (resData as TUserStats)?.totalBlogAdded.toString() || "...",
        className: "bg-pink-500",
      },
      {
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        label: "Total Blog Comments",
        value: (resData as TUserStats)?.totalBlogComments?.toString() || "...",
        className: "bg-blue-500",
      },
      {
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        label: "Total Property Comments",
        value:
          (resData as TUserStats)?.totalPropertyComments?.toString() || "...",
        className: "bg-blue-500",
      },
    ];
  }
  if (role === "agent") {
    stats = [
      {
        icon: <ListStart className="h-6 w-6 text-white" />,
        label: "Published Property",
        value: (resData as TAgentStats)?.totalProperties.toString() || "...",
        className: "bg-emerald-500",
      },
      {
        icon: <Star className="h-6 w-6 text-white" />,
        label: "Total Reviews",
        value:
          (resData as TAgentStats)?.totalFavoriteProperties.toString() || "...",
        className: "bg-orange-500",
      },
      {
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        label: "Total Blog Comments",
        value: (resData as TAgentStats)?.totalBlogComments.toString() || "...",
        className: "bg-blue-500",
      },
      {
        icon: <MessageCircle className="h-6 w-6 text-white" />,
        label: "Total Property Comments",
        value:
          (resData as TAgentStats)?.totalPropertyComments.toString() || "...",
        className: " bg-pink-500",
      },
      {
        icon: <Heart className="h-6 w-6 text-white" />,
        label: "Times Bookmarked",
        value:
          (resData as TAdminStats)?.totalFavoriteProperties.toString() || "...",
        className: "bg-emerald-500",
      },
    ];
  }

  return (
    <div className="space-y-6 bg-white rounded-md border p-2 md:p-5">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
        Manage Dashboard
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat: any) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            className={stat.className}
          />
        ))}
      </div>
    </div>
  );
}
