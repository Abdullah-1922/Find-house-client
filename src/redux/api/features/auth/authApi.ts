import { baseApi } from '../../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup by email
    signup: builder.mutation({
      query: (userData) => {
        return {
          url: `/auth/signup/email`,
          method: 'POST',
          body: userData,
        };
      },
    }),
    // Login by email
    login: builder.mutation({
      query: (userData) => {
        return {
          url: `/auth/login/email`,
          method: 'POST',
          body: userData,
        };
      },
    }),
    // change password
    changePassword: builder.mutation({
      query: (userData) => {
        return {
          url: `/auth/change-password`,
          method: 'POST',
          body: userData,
        };
      },
    }),
  }),
});
export const {
  useSignupMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = blogApi;
