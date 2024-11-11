'use client';

import React from 'react';
import DashboardStats from './dashboardStats';
import ListingsTable from './listingTable';
import MessagesList from './messagesList';
import Reviews from './reviews';
import PersonalInformationForm from './personalInformationForm';

export default function UserDashboard() {
  const handleFormSubmit = (formData: FormData) => {
    console.log('Form submitted with data:', formData);
    // Process the form data here, such as sending it to an API
  };

  return (
    <div className="space-y-10">
      <DashboardStats />
      <ListingsTable />
      <MessagesList />
      <Reviews />
      <PersonalInformationForm onSubmit={handleFormSubmit} />
    </div>
  );
}
