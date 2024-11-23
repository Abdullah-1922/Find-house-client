import { baseApi } from '../../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query) => {
        return {
          url: query ? `/blog/?${query}` : '/blog',
          method: 'GET',
        };
      },
      providesTags: ['Blog'],
    }),
    getSingleBlog: builder.query({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, id) => [{ type: 'SingleBlog', id }],
    }),
    createBlog: builder.mutation({
      query: (body) => {
        return {
          url: '/blog',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/blog/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        'Blog',
        { type: 'SingleBlog', id },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => {
        return {
          url: `/blog/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        'Blog',
        { type: 'SingleBlog', id },
      ],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
