"use client";
import { Toaster } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import OrderTable from "../../_components/modules/allOrders/orderTable";

export default function AllOrders() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Orders
        </h2>
        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="online">Online Payment</TabsTrigger>
            <TabsTrigger value="cashon">Cash On Delivery</TabsTrigger>
          </TabsList>

          {/* cash on delivery Tab */}
          <TabsContent value="cashon" className="pt-8">
            <OrderTable gatewayName="Cash On Delivery" />
          </TabsContent>
          <TabsContent value="online" className="pt-8">
            <OrderTable gatewayName="Online Payment" />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
