/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error('BASE_URL is not defined.');
}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Blog',
    'SingleBlog',
    'Property',
    'SingleProperty',
    'Product',
    'SingleProduct',
    'ProductReview',
    'SingleProductReview',
    'Users',
    'myFavoriteProperties',
    'MyFavoriteProduct',
  ],

  endpoints: () => ({}),
});
