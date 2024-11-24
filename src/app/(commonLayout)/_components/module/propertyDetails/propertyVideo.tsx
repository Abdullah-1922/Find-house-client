"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Image from "next/image";

interface PropertyVideoProps {
  title?: string;
  thumbnail?: string;
  videoUrl?: string;
}

export default function PropertyVideo({
  title = "Property Video",
  thumbnail = "https://code-theme.com/html/findhouses/images/single-property/s-3.jpg",
  videoUrl = "https://example.com/video.mp4",
}: PropertyVideoProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
            <div className="h-1 w-12 bg-gray-800 mt-1" />
          </h2>

          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt="Property video thumbnail"
              fill
              className="object-cover"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-destructive ml-1" />
              </div>
            </button>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="aspect-video mt-2">
                <video controls className="w-full h-full" autoPlay>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
