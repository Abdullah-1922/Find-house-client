'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInformationFormProps {
  onSubmit: (formData: FormData) => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    about: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget)); // Pass formData to parent
  };

  return (
    <div className="space-y-6 bg-white rounded-md border p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Personal Information
      </h2>
      <form onSubmit={handleSubmit} className="border rounded-md p-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email">Email Address</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Ex: example@domain.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Ex: +1-800-7700-00"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="address">Address</label>
            <Textarea
              id="address"
              name="address"
              placeholder="Write your address here"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1gap-4 mb-10">
          <div>
            <label htmlFor="about">About Yourself</label>
            <Textarea
              id="about"
              name="about"
              placeholder="Write about yourself"
              value={formData.about}
              onChange={handleChange}
            />
          </div>
        </div>
        <p className="text-start text-green-500 mt-5">Update Password</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="newPassword">New Password</label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Write new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <Input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Write same password again"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
