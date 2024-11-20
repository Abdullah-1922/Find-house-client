import React from 'react';
import Property from '../../_components/module/propertyDetails';

export default function PropertyDetails({
  params,
}: {
  params: { propertyId: string };
}) {
  console.log(params);
  return <Property />;
}
