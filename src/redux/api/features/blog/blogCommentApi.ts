import { baseApi } from '../../baseApi';

const blogCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogComments: builder.query({
      query: (blogId) => {
        return {
          url: `/blog-comment/${blogId}`,
          method: 'GET',
        };
      },

      providesTags: (result, error, id) => [{ type: 'SingleBlog', id }],
    }),
    createBlogComment: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/blog-comment`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        'Blog',
        { type: 'SingleBlog', id },
      ],
    }),
  }),
});

export const { useGetBlogCommentsQuery, useCreateBlogCommentMutation } =
  blogCommentApi;
