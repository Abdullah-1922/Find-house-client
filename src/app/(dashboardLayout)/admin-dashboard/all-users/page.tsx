import React from 'react';
import UserTable from './userTable';
import { Toaster } from 'sonner';

export default function AllUsersPage() {
  return (
    <div>
      <div className="space-y-6 bg-white rounded-md border p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
          All Users
        </h2>
        <UserTable />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
