import { baseApi } from '../../baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    getAllUsers: builder.query({
      query: (query) => {
        return {
          url: query ? `/users/?${query}` : '/users',
          method: 'GET',
        };
      },
      providesTags: ['Users'],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/users/update-role/${id}/${role}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data.id}`,
          method: 'PUT',
          body: data?.data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        'Users',
      ],
    }),
    getRoleBasedUser: builder.query({
      query: (query) => {
        return {
          url: query ? `/users/role-based-user/${query}` : '/users',
          method: 'GET',
        };
      },
      providesTags: ['Users'],
    }),
  }),
});
export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
  useGetRoleBasedUserQuery,
} = userApi;
