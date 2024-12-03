import { baseApi } from "../../baseApi";

const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all inquiries
    getAllInquiries: builder.query({
      query: (query) => ({
        url: query ? `/inquiry?${query}` : "/inquiry",
        method: "GET",
      }),
      providesTags: [{ type: "Inquiry", id: "LIST" }],
    }),

    // Fetch inquiries by user ID
    getInquiriesByUser: builder.query({
      query: ({ userId, query }) => ({
        url: `/inquiry/user/${userId}?${query}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Inquiry", id: `USER_${userId}` },
      ],
    }),

    // Fetch inquiries by agent ID
    getInquiriesByAgent: builder.query({
      query: ({ agentId, query }) => ({
        url: `/inquiry/agent/${agentId}?${query}`,
        method: "GET",
      }),
      providesTags: (result, error, agentId) => [
        { type: "Inquiry", id: `AGENT_${agentId}` },
      ],
    }),

    // Fetch a single inquiry by ID
    getSingleInquiry: builder.query({
      query: (inquiryId: string) => ({
        url: `/inquiry/${inquiryId}`,
        method: "GET",
      }),
      providesTags: (result, error, inquiryId) => [
        { type: "Inquiry", id: inquiryId },
      ],
    }),

    // Create a new inquiry
    createInquiry: builder.mutation({
      query: (body) => ({
        url: "/inquiry",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Inquiry", id: "LIST" }],
    }),

    // Update an inquiry by ID
    updateInquiry: builder.mutation({
      query: ({ inquiryId, body }) => ({
        url: `/inquiry/${inquiryId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { inquiryId }) => [
        { type: "Inquiry", id: inquiryId },
      ],
    }),

    // Delete an inquiry by ID
    deleteInquiry: builder.mutation({
      query: (inquiryId: string) => ({
        url: `/inquiry/${inquiryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, inquiryId) => [
        { type: "Inquiry", id: inquiryId },
        { type: "Inquiry", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllInquiriesQuery,
  useGetInquiriesByUserQuery,
  useGetInquiriesByAgentQuery,
  useGetSingleInquiryQuery,
  useCreateInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = inquiryApi;
