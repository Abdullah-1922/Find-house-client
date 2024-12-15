import { baseApi } from "../../baseApi";

const contactUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllContactMessage: build.query({
      query: () => ({
        url: "/contact-us",
        method: "GET",
      }),
      providesTags: ["ContactUs"],
    }),
    sendContactMessage: build.mutation({
      query: (data) => {
        return {
          url: `contact-us`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: ["ContactUs"]
    })
  }),
});
export const { useGetAllContactMessageQuery, useSendContactMessageMutation } = contactUsApi;