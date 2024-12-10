import { baseApi } from "../../baseApi";

const managementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateManagement: build.mutation({
      query: (data) => ({
        url: "/management",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Managements"],
    }),
    getAllManagements: build.query({
      query: () => ({
        url: "/management",
        method: "GET",
      }),
      providesTags: ["Managements"],
    })
  }),
});
export const { useUpdateManagementMutation, useGetAllManagementsQuery } = managementApi;