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
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
