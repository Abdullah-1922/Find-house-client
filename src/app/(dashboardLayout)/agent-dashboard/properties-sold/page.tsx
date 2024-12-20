import React from "react";
import PropertiesTable from "../../_components/modules/myProperties/propertiesTable";

export default function Properties() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 my-4 ml-2 mr-7">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          Sold properties
        </h2>
        <PropertiesTable />
      </div>
    </div>
  );
}
