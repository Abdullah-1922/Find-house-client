'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { ShieldCheck } from 'lucide-react';
import { TProductPayment } from '@/types';

const InvoiceCard = ({
  productPaymentDetails,
}: {
  productPaymentDetails: TProductPayment;
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [buttonText, setButtonText] = useState('Print this invoice');

  const {
    customerId,
    products,
    name,
    email,
    phone,
    city,
    state,
    country,
    address,
    zip,
    transactionId,
    status,
    gatewayName,
    currency,
    amount,
    createdAt,
  } = productPaymentDetails;

  const handlePrint = () => {
    if (invoiceRef.current) {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `Invoice_${transactionId}.pdf`,
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

  const formattedDate = new Date(createdAt).toLocaleDateString();

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
              <p className="text-gray-800 text-sm font-semibold">{name}</p>
              <p className="text-gray-700 text-sm">{address}</p>
              <p className="text-gray-700 text-sm">
                {city}, {state}, {country}, {zip}
              </p>
              <p className="text-gray-700 text-sm">{email}</p>
              <p className="text-gray-700 text-sm">{phone}</p>
            </div>
            <div className="text-right">
              <h2 className="text-gray-900 font-semibold">
                Invoice #{transactionId}
              </h2>
              <p className="text-gray-700 text-sm">Date: {formattedDate}</p>
              <p className="text-gray-700 text-sm">Status: {status}</p>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-gray-900 font-semibold">Payment Details</h2>
              <p className="text-gray-700 text-sm">Gateway: {gatewayName}</p>
              <p className="text-gray-700 text-sm">Currency: {currency}</p>
              <p className="text-gray-700 text-sm">
                Total Amount: {amount.toFixed(2)} {currency}
              </p>
            </div>
          </div>
          <table className="w-full text-gray-700 text-sm mb-8 border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 md:px-4">DESCRIPTION</th>
                <th className="text-left py-2 px-2 md:px-4">CATEGORY</th>
                <th className="text-left py-2 px-2 md:px-4">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200">
                  <td className="py-2 px-2 md:px-4">{product.description}</td>
                  <td className="py-2 px-2 md:px-4">{product.category}</td>
                  <td className="py-2 px-2 md:px-4">
                    ${product.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded-b-lg flex justify-between">
          <div>
            <p>Total Amount</p>
          </div>
          <div className="text-right">
            <p>${amount.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceCard;
