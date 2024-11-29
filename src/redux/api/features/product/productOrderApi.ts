import { baseApi } from "../../baseApi";

const productOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
      query: (query) => ({
        url: `/payments?${query}`,
        method: 'GET',
      }),
      providesTags: ["Payments"]
    }),
    updatePaymentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/payments/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ["Payments"]
    }),
  })
})

export const { useGetAllOrderQuery, useUpdatePaymentStatusMutation } = productOrderApi;