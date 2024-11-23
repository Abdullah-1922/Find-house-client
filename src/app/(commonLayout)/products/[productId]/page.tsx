import React from 'react';
import ProductDetails from '../../_components/module/productDetails';

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  return (
    <div>
      <ProductDetails productId={productId} />
    </div>
  );
}
