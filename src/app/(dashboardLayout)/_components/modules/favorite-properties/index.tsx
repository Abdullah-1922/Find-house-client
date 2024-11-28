import React from 'react';
import FavoritesTable from './favoritesTable';

export default function Favorite() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          Favorite properties
        </h2>
        <FavoritesTable />
      </div>
    </div>
  );
}
