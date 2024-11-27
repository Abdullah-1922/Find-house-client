import { baseApi } from '../../baseApi';

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: (query) => {
        return {
          url: query ? `/property/?${query}` : "/property",
          method: "GET",
        };
      },
      providesTags: ["Property"],
    }),
    getSingleProperty: builder.query({
      query: (id) => {
        return {
          url: `/property/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "SingleProperty", id }],
    }),
    getPropertyComment: builder.query({
      query: ({ id, query }) => {
        return {
          url: `/comment/${id}/?${query}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "SingleProperty", id }],
    }),
    createProperty: builder.mutation({
      query: (body) => {
        return {
          url: "/property",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/property/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Property",
        { type: "SingleProperty", id },
      ],
    }),
    createPropertyComment: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/property-comment`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Property",
        { type: "SingleProperty", id },
      ],
    }),
    deleteProperty: builder.mutation({
      query: (id: string) => {
        return {
          url: `/property/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        "Property",
        { type: "SingleProperty", id },
      ],
    }),
    createSchedule: builder.mutation({
      query: (bodyData) => {
        return {
          url: `/schedule`,
          method: "POST",
          body: bodyData,
        };
      },
      invalidatesTags: ["Schedules"],
    }),
    getAllSChedules: builder.query({
      query: (query?: string) => {
        return {
          url: `/schedule?${query}`,
          method: "GET",
        };
      },
      providesTags: ["Schedules"],
    }),
    makeApprove: builder.mutation({
      query: ({ id, isApproved }) => {
        return {
          url: `/schedule/${id}/is-approved`,
          method: "PATCH",
          body: { isApproved },
        };
      },
      invalidatesTags: ["Schedules"],
    }),
    makeAccepted: builder.mutation({
      query: ({ id, isAccepted }) => {
        return {
          url: `/schedule/${id}/is-accepted`,
          method: "PATCH",
          body: { isAccepted },
        };
      },
      invalidatesTags: ["Schedules"],
    }),
    addFavoriteProperty: builder.mutation({
      query: (data) => {
        return {
          url: `/property/add-favorite`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'myFavoriteProperties', id: userId },
        'Property',
      ],
    }),
    removeFavoriteProperty: builder.mutation({
      query: (data) => {
        return {
          url: `/property/remove-favorite`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'myFavoriteProperties', id: userId },
        'Property',
      ],
    }),
    getMyFavoriteProperties: builder.query({
      query: (userId) => {
        return {
          url: `/property/my-favorite-properties/${userId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, userId) => [
        { type: 'myFavoriteProperties', id: userId },
      ],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetSinglePropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useCreatePropertyCommentMutation,
  useGetPropertyCommentQuery,
  useCreateScheduleMutation,
  useGetAllSChedulesQuery,
  useAddFavoritePropertyMutation,
  useGetMyFavoritePropertiesQuery,
  useRemoveFavoritePropertyMutation,
  useMakeApproveMutation,
  useMakeAcceptedMutation
} = propertyApi;
