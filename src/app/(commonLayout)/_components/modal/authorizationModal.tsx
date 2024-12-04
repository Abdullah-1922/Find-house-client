"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function AuthorizationModal({
  buttonText,
}: {
  buttonText: string | React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gray-800 hover:bg-gray-900 w-full text-white hover:text-white"
          variant="outline"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Our Platform</DialogTitle>
          <DialogDescription>
            Join our community to access exclusive features and content. Choose
            an option below to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="outline"
            className="border-gray-700 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              router.push("/signup");
              setOpen(false);
            }}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
