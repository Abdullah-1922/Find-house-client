/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const token = Cookies.get('accessToken');

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5001/api/v2`,
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
    "Users",
  ],

  endpoints: () => ({}),
});
