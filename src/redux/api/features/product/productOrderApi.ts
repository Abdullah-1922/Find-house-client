import { baseApi } from '../../baseApi';

const productOrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
      query: (query) => ({
        url: `/payments?${query}`,
        method: 'GET',
      }),
      providesTags: ['Payments'],
    }),
    getOrdersByPaymentGateway: build.query({
      query: (query) => ({
        url: `/payments/product-payments/${query}`,
        method: 'GET',
      }),
      providesTags: ['Payments'],
    }),
    updatePaymentStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/payments/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Payments'],
    }),
    casOnDeliveryStatusUpdate: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/payments/cash-on-delivery/${data.id}`,
          method: 'POST',
          body: data.data,
        };
      },
      invalidatesTags: ['Payments'],
    }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetOrdersByPaymentGatewayQuery,
  useCasOnDeliveryStatusUpdateMutation,
  useUpdatePaymentStatusMutation,
} = productOrderApi;
