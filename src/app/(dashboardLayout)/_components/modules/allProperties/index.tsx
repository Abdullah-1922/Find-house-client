import React from 'react';
import PropertiesTable from './propertiesTable';

export default function Properties() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          My properties
        </h2>
        <PropertiesTable />
      </div>
    </div>
  );
}
