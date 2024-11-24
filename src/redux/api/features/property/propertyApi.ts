import { baseApi } from "../../baseApi";

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
                console.log('body', body);
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
} = propertyApi;
