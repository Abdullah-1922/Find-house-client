import { baseApi } from '../../baseApi';

const requestAgentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getAllAgentRequest: builder.query({
      query: (query) => {
        return {
          url: query ? `/users/request-agent/?${query}` : '/users/request-agent',
          method: 'GET',
        };
      },
      providesTags: ['RequestAgent'],
    }),
    applyForAgent: builder.mutation({
      query: (body) => {
        return {
          url: `/users/request-agent`,
          method: 'POST',
            body,
        };
      },
      invalidatesTags: ['RequestAgent'],
    }),
    updateRequestAgentStatus: builder.mutation({
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

} = requestAgentApi;
