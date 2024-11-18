import { baseApi } from '../../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => {
        console.log(userData);
        return {
          url: `/auth/signup/email`,
          method: 'POST',
          body: userData,
        };
      },
    }),
  }),
});
export const { useSignupMutation } = blogApi;
