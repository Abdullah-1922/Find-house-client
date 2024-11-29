"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RequestInquiry from "../agencies/RequestInquiry";
import ResentProperties from "../agencies/ResentProperties";
import FeaturedProperties from "../agencies/FeatureProperties";
import { useGetRoleBasedUserQuery } from "@/redux/api/features/users/userApi";
import { TUser } from "@/types";
import Spinner from "@/components/ui/spinner";
import Nodata from "@/components/ui/noData";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";

const ITEMS_PER_PAGE = 6;

export default function AllAgents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);

  const {
    data: agentData,
    isFetching,
    error,
  } = useGetRoleBasedUserQuery(
    `agent?limit=${ITEMS_PER_PAGE}&page=${currentPage}`
  );

  // handle pagination
  const meta = agentData?.meta;
  const totalPages = meta?.totalPage || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Selected Page:", page);
  };

  const agents = agentData?.data || ([] as TUser[]);

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-4">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-4">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Listings</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">All Agents</h1>
      </div>

      <div className="flex gap-2 md:p-5 w-full">
        <div className="flex flex-col gap-2 md:p-5 w-full">
          {/* Filters */}
          <div className="mb-6 flex flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              {agentData?.total || 0} Search results
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">SORT BY:</span>
                <Select defaultValue="alphabet">
                  <SelectTrigger className="w-[180px] focus:outline-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabet">Alphabet</SelectItem>
                    <SelectItem value="listings">Listings</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isGridView ? "default" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(true)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={!isGridView ? "default" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Agency Grid */}
          {isFetching ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">Failed to fetch agents.</p>
          ) : agents.length === 0 ? (
            <Nodata />
          ) : (
            <div
              className={`mb-8 grid gap-6 ${
                isGridView ? "md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {agents.map((agent: TUser) => (
                <Card
                  key={agent._id}
                  className={`${
                    isGridView ? "flex flex-col" : "flex flex-row"
                  }`}
                >
                  <CardHeader className="relative">
                    <Badge className="absolute left-4 top-4 py-2 px-3 rounded bg-gray-800 hover:bg-gray-900">
                      {agent.property.length} Listings
                    </Badge>
                    <div className="flex justify-center">
                      <Image
                        src={agent.image || "/default-avatar.png"}
                        alt={agent.firstName}
                        width={200}
                        height={200}
                        className="h-56 w-full object-contain"
                      />
                    </div>
                  </CardHeader>
                  <div
                    className={`${
                      isGridView ? "flex flex-col" : "flex flex-col mt-5"
                    } w-full`}
                  >
                    <CardContent className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        {agent.firstName} {agent.secondName}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>Mobile: {agent.phone}</p>
                        <p>Email: {agent.email}</p>
                      </div>
                      <hr />
                    </CardContent>
                    <CardFooter className="flex items-center justify-between gap-2">
                      <Button size="sm" variant="link">
                        View My Listing
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <DynamicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {/* Sidebar Forms */}
        <div className="flex flex-col gap-2 md:p-5 w-[50%]">
          <RequestInquiry />
          <ResentProperties />
          <FeaturedProperties />
        </div>
      </div>
    </div>
  );
}
