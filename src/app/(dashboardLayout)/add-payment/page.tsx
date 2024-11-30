/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreatePropertyPaymentMutation } from "@/redux/api/features/property/propertyPaymentApi";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/user.hook";

const paymentSchema = z.object({
  property: z.string().min(1, "Property ID is required"),
  category: z.enum(["sell", "rent"], {
    required_error: "Category is required",
  }),
  paymentDate: z.string().min(1, "Payment date is required"),
  extraInfo: z.string().optional(),
  totalPrice: z.string().optional(),
  monthlyRent: z.string().optional(),
  leaseDuration: z.string().optional(),
  paymentType: z.enum(["full", "installment"], {
    required_error: "Payment type is required",
  }),
  paymentStatus: z.enum(["pending", "completed", "failed"], {
    required_error: "Payment status is required",
  }),
  gatewayName: z.string().min(1, "Gateway name is required"),
  currency: z.string().min(1, "Currency is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function AddPaymentPage() {
  const [addPayment, { isLoading }] = useCreatePropertyPaymentMutation();
  const { user } = useUser();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      property: "",
      category: "sell",
      paymentDate: "",
      extraInfo: "",
      totalPrice: "",
      monthlyRent: "",
      leaseDuration: "",
      paymentType: "full",
      paymentStatus: "pending",
      gatewayName: "",
      currency: "USD",
    },
  });

  const category = form.watch("category");

  async function onSubmit(values: any) {
    const paymentData = {
      ...values,
      user: user?._id,
    };

    if (category === "sell") {
      delete paymentData.monthlyRent;
      delete paymentData.leaseDuration;
      paymentData.totalPrice = Number(paymentData.totalPrice);
    } else {
      delete paymentData.totalPrice;
      paymentData.monthlyRent = Number(paymentData.monthlyRent);
      paymentData.leaseDuration = Number(paymentData.leaseDuration);
    }

    const loadingToast = toast.loading("Adding payment...");
    console.log(paymentData);
    try {
      const res: any = await addPayment(paymentData);
      if (res?.data?.success) {
        toast.success("Payment added successfully", { id: loadingToast });
        form.reset();
      }

      // If error occurs
      if (res?.error) {
        toast.error(
          res?.error?.data?.message ||
            "Something went wrong. Please try again.",
          { id: loadingToast }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 m-4 mb-10"
      >
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold text-[#24324A] my-5">
              Payment details
            </h2>
            <div className="space-y-4">
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property ID</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter property ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sell">Sell</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                {category === "sell" && (
                  <FormField
                    control={form.control}
                    name="totalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter total price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {category === "rent" && (
                  <>
                    <FormField
                      control={form.control}
                      name="monthlyRent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Rent</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter monthly rent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="leaseDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Duration (months)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter lease duration"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full">Full</SelectItem>
                          <SelectItem value="installment">
                            Installment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gatewayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gateway Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter gateway name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Enter currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="BDT">BDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="extraInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extra Info</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={7}
                        placeholder="Enter any extra information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span>Adding...</span>
              <Loader className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            "Add Payment"
          )}
        </Button>
      </form>
        
    </Form>
  );
}
