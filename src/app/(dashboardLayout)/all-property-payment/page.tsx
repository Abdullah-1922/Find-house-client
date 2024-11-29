"use client"

import { useUser } from "@/hooks/user.hook";
import AdminPropertyPayment from "../_components/modules/allPropertyPayment/AdminAllPropertyPayment";
import Spinner from "@/components/ui/spinner";
import AgentPropertyPayment from "../_components/modules/allPropertyPayment/AgentAllPropertyPayment";

const Page = () => {
    const { user } = useUser();
    if (!user) return <Spinner />;

  return (
    <div>
      
  {
    user.role === "admin" ? <AdminPropertyPayment /> : <AgentPropertyPayment/>

  }

    </div>
  );
};

export default Page;


