"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Loader } from "lucide-react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useUser } from "@/hooks/user.hook";
import { useCreateInquiryMutation } from "@/redux/api/features/property/inquiryApi";

interface AgentInformationProps {
  agent: {
    _id: string;
    name: string;
    title: string;
    address: string;
    phone: string;
    email: string | undefined;
    image: string;
  };
}
const formSchema = z.object({
  fullName: z.string({ required_error: "Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(11, { message: "Phone number must be at least 11 digits" }),
  message: z.string({ required_error: "Message is required" }),
});

export default function AgentInformation({ agent }: AgentInformationProps) {
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.user = user?._id;
    values.agent = agent._id;
    try {
      const res = await createInquiry(values);
      console.log("res", res);
      if (res?.data?.success) {
        form.setValue("fullName", "");
        form.setValue("email", "");
        form.setValue("phone", "");
        form.setValue("message", "");
        toast.success("Inquiry sent successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
      console.log("error", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-gray-800"'>Agent information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Profile */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold capitalize">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.title}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-800" />
            <span>{agent.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-800" />
            <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-800" />
            <span>{agent.email}</span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div>
          <h3 className="font-semibold mb-4">Request Inquiry</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          className="min-h-[100px] border-input/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
      </CardContent>
    </Card>
  );
}
