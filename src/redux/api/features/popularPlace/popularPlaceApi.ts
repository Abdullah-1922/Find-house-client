import { TPopularPlace } from "@/types";
import { baseApi } from "../../baseApi";

const popularPlaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPopularPlaces: builder.query({
      query: (query) => {
        const queryString = query
          ? `/?${new URLSearchParams(query).toString()}`
          : "";

        return {
          url: `/popular-places${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result
          ? [
              { type: "PopularPlace", id: "LIST" },
              ...result.data.map((place: TPopularPlace) => ({
                type: "PopularPlace",
                id: place._id,
              })),
            ]
          : [{ type: "PopularPlace", id: "LIST" }];
      },
    }),

    getPopularPlaceById: builder.query({
      query: (id) => {
        return {
          url: `/popular-places/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "PopularPlace", id }],
    }),

    createPopularPlace: builder.mutation({
      query: (body) => {
        return {
          url: "/popular-places",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["PopularPlace"],
    }),

    updatePopularPlace: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/popular-places/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "PopularPlace",
        { type: "PopularPlace", id },
      ],
    }),

    deletePopularPlace: builder.mutation({
      query: (id: string) => {
        return {
          url: `/popular-places/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        "PopularPlace",
        { type: "PopularPlace", id },
      ],
    }),
  }),
});

export const {
  useGetAllPopularPlacesQuery,
  useGetPopularPlaceByIdQuery,
  useCreatePopularPlaceMutation,
  useUpdatePopularPlaceMutation,
  useDeletePopularPlaceMutation,
} = popularPlaceApi;
