import { TProductReview } from '@/types';
import { baseApi } from '../../baseApi';

const productReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductReviews: builder.query({
      query: (productId) => {
        return {
          url: `/product-review/${productId}`,
          method: 'GET',
        };
      },
      providesTags: ['ProductReview'],
    }),

    getSingleProductReview: builder.query({
      query: (id) => {
        return {
          url: `/product-review/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, id) => [
        { type: 'SingleProductReview', id },
      ],
    }),
    createProductReview: builder.mutation({
      query: (data) => {
        return {
          url: '/product-review',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['ProductReview'],
    }),
    updateProductReview: builder.mutation({
      query: (data) => {
        return {
          url: `/product-review/${data?.id}`,
          method: 'PATCH',
          body: data?.data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        'ProductReview',
        { type: 'SingleProductReview', id },
      ],
    }),
    deleteProductReview: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product-review/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        'ProductReview',
        { type: 'SingleProductReview', id },
      ],
    }),
  }),
});

export const {
  useGetAllProductReviewsQuery,
  useGetSingleProductReviewQuery,
  useCreateProductReviewMutation,
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation,
} = productReviewApi;
