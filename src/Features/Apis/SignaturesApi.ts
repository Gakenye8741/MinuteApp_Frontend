// src/redux/services/signatureApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signatureApi = createApi({
  reducerPath: "signatureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://minuteapp-backend.onrender.com/api/signatures",
  }),
  tagTypes: ["Signatures"],
  endpoints: (builder) => ({
    getAllSignatures: builder.query<any[], number | void>({
      query: (meetingId) =>
        meetingId ? `/AllSignatures?meetingId=${meetingId}` : `/AllSignatures`,
      providesTags: ["Signatures"],
    }),

    getSignaturesByMeetingId: builder.query<any[], number>({
      query: (meetingId) => `/MeetingSignatures/${meetingId}`,
      providesTags: ["Signatures"],
    }),

    getSignatureById: builder.query<any, number>({
      query: (id) => `/SignatureById/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Signatures", id }],
    }),

    addSignature: builder.mutation<
      any,
      { meetingId: number; userId: number; signedBy: string; role: "Secretary General" | "Chairman" }
    >({
      query: (body) => ({
        url: `/AddSignature`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Signatures"],
    }),

    updateSignature: builder.mutation<
      any,
      { id: number; updates: Partial<{ userId: number; signedBy: string; role: "Secretary General" | "Chairman" }> }
    >({
      query: ({ id, updates }) => ({
        url: `/UpdateSignature/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Signatures"],
    }),

    deleteSignature: builder.mutation<any, number>({
      query: (id) => ({
        url: `/DeleteSignature/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Signatures"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllSignaturesQuery,
  useGetSignaturesByMeetingIdQuery,
  useGetSignatureByIdQuery,
  useAddSignatureMutation,
  useUpdateSignatureMutation,
  useDeleteSignatureMutation,
} = signatureApi;
