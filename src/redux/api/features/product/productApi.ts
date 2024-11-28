import { TProduct } from '@/types';
import { baseApi } from '../../baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => {
        const queryString = query
          ? `/?${new URLSearchParams(query).toString()}`
          : '';

        return {
          url: `/product${queryString}`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        return result
          ? [
            { type: 'Product', id: 'LIST' },
            ...result.data.map((product: TProduct) => ({
              type: 'Product',
              id: product._id,
            })),
          ]
          : [{ type: 'Product', id: 'LIST' }];
      },
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, id) => [{ type: 'SingleProduct', id }],
    }),
    createProduct: builder.mutation({
      query: (body) => {
        return {
          url: '/product',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/product/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        'Product',
        { type: 'SingleProduct', id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        'Product',
        { type: 'SingleProduct', id },
      ],
    }),
    addFavoriteProducts: builder.mutation({
      query: (data) => {
        return {
          url: `/product/add-favorite`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'MyFavoriteProduct', id },
        'Product',
      ],
    }),
    removeFavoriteProducts: builder.mutation({
      query: (data) => {
        return {
          url: `/product/remove-favorite`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'MyFavoriteProduct', id },
        'Product',
      ],
    }),
    getMyFavoriteProducts: builder.query({
      query: (userId) => {
        return {
          url: `/product/add-bookmark-product/${userId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, userId) => [
        { type: 'MyFavoriteProduct', id: userId },
      ],
    }),
    createPayment: builder.mutation({
      query: (bodyData) => {
        return {
          url: `/payments`,
          method: 'POST',
          body: bodyData,
        };
      },
      invalidatesTags: (result, error, userId) => [
        { type: 'Payments', id: userId },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddFavoriteProductsMutation,
  useRemoveFavoriteProductsMutation,
  useGetMyFavoriteProductsQuery,
  useCreatePaymentMutation
} = productApi;
