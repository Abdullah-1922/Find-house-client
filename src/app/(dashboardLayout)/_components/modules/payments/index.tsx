"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useUser } from "@/hooks/user.hook";
import {
  useCreateCashOnDeliveryPaymentMutation,
  useCreateOnlinePaymentMutation,
  useGetMyFavoriteProductsQuery,
} from "@/redux/api/features/product/productApi";
import { TProduct } from "@/types";
import PaymentHistory from "./paymentHistory";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 digits"),
  city: z
    .string({ required_error: "City is required" })
    .min(2, "City must be at least 2 characters"),
  state: z
    .string({ required_error: "State is required" })
    .min(2, "State must be at least 2 characters"),
  country: z
    .string({ required_error: "Country is required" })
    .min(2, "Country must be at least 2 characters"),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address must be at least 5 characters"),
  zip: z.string({ required_error: "Zip code is required" }),
});

const paymentGateway = {
  CashOnDelivery: "Cash On Delivery",
  OnlinePayment: "Online Payment",
} as const;

export default function Payments() {
  const [method, setMethod] = React.useState<string>("amarpay");
  const { user } = useUser();

  console.log(method);

  const { data } = useGetMyFavoriteProductsQuery(user?._id);
  const addToCardData = data?.data as TProduct[];

  const [createOnlinePaymentFn, { isLoading: isOnlinePaymentLoading }] =
    useCreateOnlinePaymentMutation();
  const [
    createCashOnDeliveryPaymentFn,
    { isLoading: isCashOnDeliveryPaymentLoading },
  ] = useCreateCashOnDeliveryPaymentMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const totalAmount = addToCardData?.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const tax = totalAmount * 0.05; // Assuming 5% tax
  const totalCost = totalAmount + tax;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      customerId: user._id,
      products: [...addToCardData?.map((item) => item?._id)],
      currency: "BDT",
      amount: totalCost,
      gatewayName:
        method === "cashOnDelivery"
          ? paymentGateway.CashOnDelivery
          : paymentGateway.OnlinePayment,
      status: method === "cashOnDelivery" ? "Pending" : "Paid",
      ...values,
    };

    console.log(formData);
    const loadingToast = toast.loading("Processing payment...");

    try {
      let res;
      if (method === "cashOnDelivery") {
        res = await createCashOnDeliveryPaymentFn(formData).unwrap();
      } else {
        res = await createOnlinePaymentFn(formData).unwrap();
      }

      if (res.success) {
        if (method === "amarpay" && res?.data?.paymentResponse?.payment_url) {
          window.location.href = res.data.paymentResponse.payment_url;
        } else {
          toast.success("Order placed successfully", { id: loadingToast });
        }
      } else {
        toast.error("Payment processing failed", { id: loadingToast });
      }
    } catch (error) {
      toast.error("An error occurred while processing the payment", {
        id: loadingToast,
      });
    }
  }

  return (
    <div className="space-y-6 m-2 my-4 mr-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <svg
                className=" h-5 w-5 text-red-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" width="18" x="3" y="3" />
                <path d="M21 9H3" />
              </svg>
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 h-full"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your ZIP code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full bg-gray-800 hover:bg-gray-900"
                  size="lg"
                  type="submit"
                  disabled={
                    isOnlinePaymentLoading || isCashOnDeliveryPaymentLoading
                  }
                >
                  {isOnlinePaymentLoading || isCashOnDeliveryPaymentLoading
                    ? "Processing..."
                    : "Place Order"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <svg
                  className=" h-5 w-5 text-red-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="18" rx="2" width="18" x="3" y="3" />
                  <path d="M3 9h18" />
                </svg>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue={method} className="grid gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() => setMethod("amarpay")}
                      value="amarpay"
                      id="amarpay"
                    />
                    <Label>Amarpay</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() => setMethod("cashOnDelivery")}
                      value="cashOnDelivery"
                      id="cashOnDelivery"
                    />
                    <Label>Cash on Delivery</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <svg
                  className=" h-5 w-5 text-red-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <path d="M7 7h.01" />
                </svg>
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Products</h4>
                  <Table>
                    <TableBody>
                      {addToCardData?.map((product: TProduct) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right">
                            ৳ {product.price.toFixed(2) || 0}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h4 className="font-medium">Pricing Details</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Subtotal</TableCell>
                        <TableCell className="text-right">
                          ৳ {totalAmount?.toFixed(2) || 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax (5%)</TableCell>
                        <TableCell className="text-right">
                          ৳ {tax?.toFixed(2) || 0}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Total Cost
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ৳ {totalCost?.toFixed(2) || 0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentHistory />
    </div>
  );
}
