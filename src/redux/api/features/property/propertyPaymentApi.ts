import { baseApi } from "../../baseApi";

const propertyPaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all property payments
        getAllPropertyPayments: builder.query({
            query: (query) => ({
                url: query ? `/property-payment?${query}` : "/property-payment",
                method: "GET",
            }),
            providesTags: [{ type: "PropertyPayment", id: "LIST" }],
        }),

        // Fetch a single property payment by ID
        getSinglePropertyPayment: builder.query({
            query: (paymentId: string) => ({
                url: `/property-payment/${paymentId}`,
                method: "GET",
            }),
            providesTags: (result, error, paymentId) => [
                { type: "PropertyPayment", id: paymentId },
            ],
        }),

        // Create a new property payment
        createPropertyPayment: builder.mutation({
            query: (body) => ({
                url: "/property-payment",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "PropertyPayment", id: "LIST" }],
        }),

        // Update a property payment by ID
        updatePropertyPayment: builder.mutation({
            query: ({ paymentId, body }) => ({
                url: `/property-payment/${paymentId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { paymentId }) => [
                { type: "PropertyPayment", id: paymentId },
            ],
        }),

        // Delete a property payment by ID
        deletePropertyPayment: builder.mutation({
            query: (paymentId: string) => ({
                url: `/property-payment/${paymentId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, paymentId) => [
                { type: "PropertyPayment", id: paymentId },
                { type: "PropertyPayment", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllPropertyPaymentsQuery,
    useGetSinglePropertyPaymentQuery,
    useCreatePropertyPaymentMutation,
    useUpdatePropertyPaymentMutation,
    useDeletePropertyPaymentMutation,
} = propertyPaymentApi;