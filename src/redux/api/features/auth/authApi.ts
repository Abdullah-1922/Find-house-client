import { baseApi } from '../../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup by email
    signup: builder.mutation({
      query: (credentials) => {
        return {
          url: `/auth/signup/email`,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    // Login by email
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: `/auth/login/email`,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    // change password
    changePassword: builder.mutation({
      query: (credentials) => {
        return {
          url: `/auth/change-password`,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    // forgot password
    forgotPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: `/auth/forgot-password`,
          method: 'POST',
          body: credentials,
        };
      },
    }),
    // change password
    resetPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: `/auth/reset-password`,
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});
export const {
  useSignupMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = blogApi;
