import { baseApi } from "../../baseApi";

const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNewsLetter: build.mutation({
      query: (data) => ({
        url: "/newsletter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsLetter"],
    }),
    getAllNewsLetter: build.query({
      query: () => ({
        url: "/newsletter",
        method: "GET",
      }),
      providesTags: ["NewsLetter"],
    })
  }),
});
export const { useCreateNewsLetterMutation, useGetAllNewsLetterQuery } = newsLetterApi;