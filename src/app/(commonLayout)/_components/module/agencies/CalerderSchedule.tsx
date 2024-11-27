"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateScheduleMutation } from "@/redux/api/features/property/propertyApi";
import { useUser } from "@/hooks/user.hook";
import SignInModal from "../../modal/signInModal";
import { toast } from "sonner";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function CalenderSchedule({
  agentId,
  propertyId,
}: {
  agentId: string;
  propertyId: string;
}) {
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [time, setTime] = useState("18:45");
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  const dayNum = date.getDate();
  const year = date.getFullYear();
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  const nextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const prevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };
  const handleCreateSchedule = async () => {
    const formData = {
      user: user?._id,
      agent: agentId,
      property: propertyId,
      date: date.toISOString(),
      time: time,
    };

    try {
      await createSchedule(formData).unwrap();
      toast.success("Schedule created successfully");
    } catch (error) {
      toast.error("Failed to create schedule");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2 text-gray-800">
          <CalendarIcon className="h-5 w-5 text-gray-800" />
          <CardTitle> Schedule a Tour</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="relative mb-4 bg-gray-800 p-4 text-white">
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="text-white hover:opacity-75"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-2xl font-bold">{month}</div>
              <button
                onClick={nextMonth}
                className="text-white hover:opacity-75"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <div className="text-5xl font-bold">{dayNum}</div>
              <div className="text-lg">{day}</div>
              <div className="text-sm">{year}</div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                type="date"
                defaultValue={`${year}-${String(date.getMonth() + 1).padStart(
                  2,
                  "0"
                )}-${String(dayNum).padStart(2, "0")}`}
                className="w-full"
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
            <div>
              <Input
                onChange={(e) => setTime(e.target.value)}
                type="time"
                defaultValue="18:45"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label className="mb-2 block">Adult</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdults(Math.max(0, adults - 1))}
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Minus className="h-4 w-4 text-gray-800" />
              </Button>
              <span className="w-12 text-center">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdults(adults + 1)}
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Children</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </Button>
              <span className="w-12 text-center">{children}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChildren(children + 1)}
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
        {user ? (
          <Button
            onClick={handleCreateSchedule}
            className="w-full bg-gray-800 hover:bg-gray-900"
          >
            {isLoading ? (
              <p className="flex items-center gap-2">
                <Loader className="animate-spin" />
                <span>Submitting...</span>
              </p>
            ) : (
              "Submit Request"
            )}
          </Button>
        ) : (
          <SignInModal>
            <Button className="w-full bg-gray-800 hover:bg-gray-900">
              Submit Request
            </Button>
          </SignInModal>
        )}
      </CardContent>
    </Card>
  );
}
