'use client';

import { useEffect, useState } from 'react';
import { useGetMeQuery } from '@/redux/api/features/users/user';
import { DecodedJWT } from '@/types';
import { decodeJWT } from '@/utils/verifyToken';
import Cookies from 'js-cookie';

export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Decode token and extract user ID
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = decodeJWT(token) as DecodedJWT;
      if (decoded?._id) {
        setUserId(decoded._id);
      }
    }
  }, []);

  // Fetch user data
  const {
    data: user,
    isLoading,
    error,
  } = useGetMeQuery(userId!, {
    skip: !userId,
  });

  return { user, isLoading, error };
};
