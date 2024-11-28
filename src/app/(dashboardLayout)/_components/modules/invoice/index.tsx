'use client';

// components/Invoice.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { ShieldCheck } from 'lucide-react';

interface InvoiceProps {
  invoiceNumber: string;
  dueDate: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  clientPostalCode: string;
  vatNumber: string;
  vatId: string;
  paymentType: string;
  payerName: string;
  description: string;
  price: number;
  vatPercentage: number;
  discountPercentage: number;
}

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  dueDate,
  clientName,
  clientCompany,
  clientAddress,
  clientPostalCode,
  vatNumber,
  vatId,
  paymentType,
  payerName,
  description,
  price,
  vatPercentage,
  discountPercentage,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [buttonText, setButtonText] = useState('Print this invoice');

  const vatAmount = price * (vatPercentage / 100);
  const subTotal = price + vatAmount;
  const discountAmount = subTotal * (discountPercentage / 100);
  const grandTotal = subTotal - discountAmount;

  const handlePrint = () => {
    if (invoiceRef.current) {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `Invoice_${invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf()
        .from(invoiceRef.current)
        .set(opt)
        .save()
        .then(() => {
          setButtonText('Printed ✔️');
        });
    }
  };

  return (
    <div className="mx-auto w-full bg-gray-50 h-full" ref={invoiceRef}>
      <Card className="bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <ShieldCheck className="w-16 h-16 text-gray-900" />
            <Button
              className="bg-gray-800 hover:bg-gray-900 text-white h-10 px-4 rounded"
              onClick={handlePrint}
            >
              {buttonText}
            </Button>
          </div>
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-gray-900 font-semibold">Invoice To</h2>
              <p className="text-gray-800 text-sm font-semibold">
                {clientName}
              </p>
              <p className="text-gray-700 text-sm">{clientCompany}</p>
              <p className="text-gray-700 text-sm">{clientAddress}</p>
              <p className="text-gray-700 text-sm">{clientPostalCode}</p>
            </div>
            <div className="text-right">
              <h2 className="text-gray-900 font-semibold">
                Invoice #{invoiceNumber}
              </h2>
              <p className="text-gray-700 text-sm">Due to: {dueDate}</p>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-gray-900 font-semibold">Payment Details</h2>
              <p className="text-gray-700 text-sm">VAT: {vatNumber}</p>
              <p className="text-gray-700 text-sm">VAT ID: {vatId}</p>
              <p className="text-gray-700 text-sm">
                Payment Type: {paymentType}
              </p>
              <p className="text-gray-700 text-sm">Name: {payerName}</p>
            </div>
          </div>
          <table className="w-full text-gray-700 text-sm mb-8 border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 md:px-4">DESCRIPTION</th>
                <th className="text-left py-2 px-2 md:px-4">PRICE</th>
                <th className="text-left py-2 px-2 md:px-4">
                  VAT ({vatPercentage}%)
                </th>
                <th className="text-left py-2 px-2 md:px-4">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-2 md:px-4">{description}</td>
                <td className="py-2 px-2 md:px-4">${price.toFixed(2)}</td>
                <td className="py-2 px-2 md:px-4">${vatAmount.toFixed(2)}</td>
                <td className="py-2 px-2 md:px-4">${subTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-b-lg flex justify-between">
          <div>
            <p>Sub-Total</p>
            <p>Discount</p>
            <p className="font-semibold">Grand Total</p>
          </div>
          <div className="text-right">
            <p>${subTotal.toFixed(2)}</p>
            <p>{discountPercentage}%</p>
            <p className="font-semibold">${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
