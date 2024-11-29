import { baseApi } from "../../baseApi";

const productOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
      query: (query) => ({
        url: `/payments?${query}`,
        method: 'GET',
      }),
      providesTags: ["Payments"]
    })
  })
})

export const { useGetAllOrderQuery } = productOrderApi;