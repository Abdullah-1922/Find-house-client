import { baseApi } from "../../baseApi";

const requestAgentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgentRequest: builder.query({
      query: (query) => {
        return {
          url: query ? `/users/request-agent?${query}` : "/users/request-agent",
          method: "GET",
        };
      },
      providesTags: ["RequestAgent"],
    }),
    applyForAgent: builder.mutation({
      query: (body) => {
        return {
          url: `/users/request-agent`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RequestAgent", "Users"],
    }),
    updateRequestAgentStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/users/request-agent`,
          method: "PUT",
          body: data?.data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        "Users",
        "RequestAgent",
      ],
    }),
    getUserAgentRequest: builder.query({
      query: (userId: string) => {
        return {
          url: `/users/request-agent/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["RequestAgent"],
    }),
  }),
});
export const {
  useGetAllAgentRequestQuery,
  useApplyForAgentMutation,
  useUpdateRequestAgentStatusMutation,
  useGetUserAgentRequestQuery,
} = requestAgentApi;
