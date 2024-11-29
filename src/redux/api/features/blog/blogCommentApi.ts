import { baseApi } from '../../baseApi';

const blogCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogComments: builder.query({
      query: (blogId) => ({
        url: `/blog-comment/${blogId}?sort=-createdAt`,
        method: 'GET',
      }),
      providesTags: (result, error, blogId) => [
        { type: 'SingleBlog', id: blogId },
      ],
    }),
    createBlogComment: builder.mutation({
      query: (commentData) => ({
        url: `/blog-comment`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { blogId }) => [
        'Blog',
        { type: 'SingleBlog', id: blogId },
      ],
    }),
    updateBlogComment: builder.mutation({
      query: ({ commentId, updatedData }) => ({
        url: `/blog-comment/${commentId}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { blogId }) => [
        { type: 'SingleBlog', id: blogId },
      ],
    }),
    deleteBlogComment: builder.mutation({
      query: (commentId) => ({
        url: `/blog-comment/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { blogId }) => [
        { type: 'SingleBlog', id: blogId },
      ],
    }),
  }),
});

export const {
  useGetBlogCommentsQuery,
  useCreateBlogCommentMutation,
  useUpdateBlogCommentMutation,
  useDeleteBlogCommentMutation,
} = blogCommentApi;
