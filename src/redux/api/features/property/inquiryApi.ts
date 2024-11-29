import { baseApi } from "../../baseApi";

const inquiryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createInquiry: build.mutation({
      query: (data) => ({
        url: "/inquiry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),
  })
});

export const { useCreateInquiryMutation } = inquiryApi;