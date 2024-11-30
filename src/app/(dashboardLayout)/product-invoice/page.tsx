import Container from "@/components/ui/container";
import React from "react";
import dynamic from "next/dynamic";

const Invoice = dynamic(() => import("../_components/modules/invoice"), {
  ssr: false,
});

export default function InvoicePAge() {
  return (
    <Container>
      <div className="my-4 mr-9">
        <Invoice />
      </div>
    </Container>
  );
}
