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
    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: query ? `/users/?${query}` : "/users",
          method: 'GET',
          providesTags: ["Users"],
        };
      },
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/users/update-role/${id}/${role}`,
          method: 'PATCH',
          invalidatesTags: ["Users"],
        };
      },
    }),
  }),
});
export const { useGetMeQuery, useGetAllUsersQuery, useUpdateUserRoleMutation } = blogApi;
