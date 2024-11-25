'use client';

import React from 'react';
import ProfileDetail from './profileDetails';
import Properties from '../myProperties';
import { useUser } from '@/hooks/user.hook';

export default function Profile() {
  const { user } = useUser();
  return (
    <div className="space-y-5">
      <ProfileDetail />
      {user?.role === 'admin' || 'agent' ? <Properties /> : ''}
    </div>
  );
}
