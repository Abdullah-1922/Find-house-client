'use client';

import React from 'react';
import DashboardStats from '../dashboardStats';
import ListingsTable from '../listingTable';
import MessagesList from '../messagesList';
import Reviews from '../reviews';
import { PersonalInformationForm } from '../personalInformationForm';

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <DashboardStats />
      <ListingsTable />
      <MessagesList />
      <Reviews />
      <PersonalInformationForm />
    </div>
  );
}
