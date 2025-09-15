// src/redux/services/signatureApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const signatureApi = createApi({
    reducerPath: "signatureApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://minuteapp-backend.onrender.com/api/signatures",
    }),
    tagTypes: ["Signatures"],
    endpoints: (builder) => ({
        getAllSignatures: builder.query({
            query: (meetingId) => meetingId ? `/AllSignatures?meetingId=${meetingId}` : `/AllSignatures`,
            providesTags: ["Signatures"],
        }),
        getSignaturesByMeetingId: builder.query({
            query: (meetingId) => `/MeetingSignatures/${meetingId}`,
            providesTags: ["Signatures"],
        }),
        getSignatureById: builder.query({
            query: (id) => `/SignatureById/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Signatures", id }],
        }),
        addSignature: builder.mutation({
            query: (body) => ({
                url: `/AddSignature`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Signatures"],
        }),
        updateSignature: builder.mutation({
            query: ({ id, updates }) => ({
                url: `/UpdateSignature/${id}`,
                method: "PUT",
                body: updates,
            }),
            invalidatesTags: ["Signatures"],
        }),
        deleteSignature: builder.mutation({
            query: (id) => ({
                url: `/DeleteSignature/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Signatures"],
        }),
    }),
});
// Export hooks
export const { useGetAllSignaturesQuery, useGetSignaturesByMeetingIdQuery, useGetSignatureByIdQuery, useAddSignatureMutation, useUpdateSignatureMutation, useDeleteSignatureMutation, } = signatureApi;
