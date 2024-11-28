'use client';

import React from 'react';
import BookmarkedTable from './bookmarkedTable';

export default function BookmarkedProducts() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-2 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          Bookmarked products
        </h2>
        <BookmarkedTable />
      </div>
    </div>
  );
}
