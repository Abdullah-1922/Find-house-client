/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersQuery } from "@/redux/api/features/users/userApi";
import { TUser } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateInquiryMutation } from "@/redux/api/features/inquiry/inquiryApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useUser } from "@/hooks/user.hook";

const formSchema = z.object({
  agent: z
    .string({ required_error: "Agent is required" })
    .nonempty("Agent is required"),
  message: z
    .string({ required_error: "Message is required" })
    .nonempty("Message is required"),
});

export function InquiryForm() {
  const { user } = useUser();
  const { data, isFetching } = useGetAllUsersQuery("role=agent");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent: "",
      message: "",
    },
  });
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.user = user._id;
    values.email = user.email;
    values.phone = user.phone;
    values.fullName = user.firstName + " " + user.secondName;
    try {
      const res:any = await createInquiry(values);
      console.log("res", res);
      if (res?.data?.success) {
        form.reset();
        toast.success("Inquiry sent successfully");
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
      console.log("error", error);
    }
  };
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold">Request Inquiry</h3>
      <hr />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="agent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Agent</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isFetching ? (
                      <p className="text-gray-500 p-6">Loading...</p>
                    ) : (
                      data?.data.map((user: TUser) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.firstName} {user.secondName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900"
          >
            {isLoading ? (
              <div>
                <div className="flex items-center gap-2">
                  <span>Submitting...</span>{" "}
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                </div>
              </div>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
