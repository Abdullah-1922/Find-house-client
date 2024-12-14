import { baseApi } from "../../baseApi";

const managementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllManagements: build.query({
      query: () => ({
        url: "/management",
        method: "GET",
      }),
      providesTags: ["Managements"],
    }),
    updateManagements: build.mutation({
      query: ({ id, data }) => {
        const body = { aboutPage: { ...data } }
        return {
          url: `/management/${id}`,
          method: "PATCH",
          body
        }
      },
      invalidatesTags: ["Managements"]
    })
  }),
});
export const { useGetAllManagementsQuery, useUpdateManagementsMutation } = managementApi;