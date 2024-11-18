import { baseApi } from '../../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});
export const { useGetMeQuery } = blogApi;
