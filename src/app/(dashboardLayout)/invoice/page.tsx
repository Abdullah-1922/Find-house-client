import React from 'react';
import Container from '@/components/ui/container';
import dynamic from 'next/dynamic';
const Invoice = dynamic(() => import('../_components/modules/invoice'), {
  ssr: false,
});

export default function InvoicePage() {
  const demoData = {
    invoiceNumber: '550',
    dueDate: '4 Jan, 2020',
    clientName: 'Carls Johns',
    clientCompany: 'Acme Inc',
    clientAddress: 'Est St, 77 - Central Park, NYC',
    clientPostalCode: '6781 45P',
    vatNumber: '1425782',
    vatId: '10253642',
    paymentType: 'Root',
    payerName: 'John Doe',
    description: 'Standard Plan',
    price: 40.0,
    vatPercentage: 10,
    discountPercentage: 10,
  };
  return (
    <Container>
      {demoData ? <Invoice {...demoData} /> : <div>No Invoice Data</div>}
    </Container>
  );
}
