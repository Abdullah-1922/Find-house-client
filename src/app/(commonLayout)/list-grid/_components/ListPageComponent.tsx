"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Grid, LayoutGrid } from "lucide-react";

import { TProperty } from "@/types";
import GridViewCard from "@/components/shared/card/GridViewCard";
import { ListViewCard } from "@/components/shared/card/ListViewCard";

export default function Component() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Top Selling");

  const properties: TProperty[] = [
    {
      id: 1,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: true,
      agent: {
        name: "Lisa Jhonson",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-1.jpg",
    },
    {
      id: 2,
      title: "Real House Luxury Villa",
      price: 8000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Rent",
      featured: false,
      agent: {
        name: "Karl Smith",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
    {
      id: 3,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: false,
      agent: {
        name: "katy Teddy",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
    {
      id: 3,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: false,
      agent: {
        name: "katy Teddy",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
    {
      id: 3,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: false,
      agent: {
        name: "katy Teddy",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
    {
      id: 3,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: false,
      agent: {
        name: "katy Teddy",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
    {
      id: 3,
      title: "Real House Luxury Villa",
      price: 9000,
      location: "Est St, 77 - Central Park South, NYC",
      bedrooms: 6,
      bathrooms: 3,
      area: 720,
      garages: 2,
      status: "For Sale",
      featured: false,
      agent: {
        name: "katy Teddy",
        image: "/placeholder.svg?height=40&width=40",
      },
      postedTime: "2 months ago",
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
    },
  ];

  return (
    <div className=" mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">9 Search results</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">SORTBY:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("Top Selling")}>
                  Top Selling
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Most Viewed")}>
                  Most Viewed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Price(low to high)")}
                >
                  Price(low to high)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Price(high to low)")}
                >
                  Price(high to low)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-6 
            ${
              viewMode === "grid"
                ? "md:grid-cols-2 xl:grid-cols-3"
                : "md:grid-cols-1"
            }
        `}
      >
        {properties.map((property) =>
          viewMode === "grid" ? (
            <GridViewCard key={property.id} property={property} />
          ) : (
            <ListViewCard key={property.id} property={property} />
          )
        )}
      </div>
    </div>
  );
}
