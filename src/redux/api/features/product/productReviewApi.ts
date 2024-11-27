import { TProductReview } from '@/types';
import { baseApi } from '../../baseApi';

const productReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductReviews: builder.query({
      query: (productId) => {
        return {
          url: `/product-review/${productId}?sort=-createdAt`,
          method: 'GET',
        };
      },
      providesTags: ['ProductReview'],
    }),

    getProductReview: builder.query({
      query: (id) => {
        return {
          url: `/product-review/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['ProductReview'],
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
      invalidatesTags: ['ProductReview'],
    }),
    deleteProductReview: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product-review/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['ProductReview'],
    }),
  }),
});

export const {
  useGetAllProductReviewsQuery,
  useGetProductReviewQuery,
  useCreateProductReviewMutation,
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation,
} = productReviewApi;
