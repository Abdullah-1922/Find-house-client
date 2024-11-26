import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function FloorPlan({ image }: { image: string }) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Floor Plan
          <div className="h-1 w-12 bg-gray-800 mt-1" />
        </h2>
        <div className="space-y-6">
          {/* Property Details Section */}
          <Image
            src={image}
            alt="floorImage"
            width={1200}
            height={1200}
            className="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
