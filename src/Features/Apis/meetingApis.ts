import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const meetingApi = createApi({
  reducerPath: 'meetingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://minuteapp-backend.onrender.com/api/' }),
  tagTypes: ['Meetings', 'Attendees', 'Topics', 'Signatures'],
  endpoints: (builder) => ({
    // =======================
    // MEETINGS
    // =======================
    getAllMeetings: builder.query({
      query: () => 'Meetings/AllMeetings',
      providesTags: ['Meetings'],
    }),
    getMeetingById: builder.query({
      query: (id: string) => `Meetings/MeetingById/${id}`,
      providesTags: ['Meetings'],
    }),
    createMeeting: builder.mutation({
      query: (meeting) => ({
        url: 'Meetings/CreateMeeting',
        method: 'POST',
        body: meeting,
      }),
      invalidatesTags: ['Meetings'],
    }),
    updateMeeting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `Meetings/UpdateMeeting/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Meetings'],
    }),
    deleteMeeting: builder.mutation({
      query: (id: string) => ({
        url: `Meetings/DeleteMeeting/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Meetings'],
    }),

    // =======================
    // ATTENDEES
    // =======================
    getAttendeesByMeetingId: builder.query({
      query: (meetingId: string) => `Attendees/AttendeesByMeetingId/${meetingId}`,
      providesTags: ['Attendees'],
    }),
    addAttendee: builder.mutation({
      query: (attendee) => ({
        url: 'Attendees/AddAttendee',
        method: 'POST',
        body: attendee,
      }),
      invalidatesTags: ['Attendees'],
    }),
    updateAttendee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `Attendees/UpdateAttendee/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Attendees'],
    }),
    updateAttendeeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `Attendees/UpdateAttendeeStatus/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Attendees'],
    }),
    deleteAttendee: builder.mutation({
      query: (id: string) => ({
        url: `Attendees/DeleteAttendee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attendees'],
    }),

    // =======================
    // TOPICS
    // =======================
    getTopicsByMeetingId: builder.query({
      query: (meetingId: string) => `Topics/TopicsByMeetingId/${meetingId}`,
      providesTags: ['Topics'],
    }),
    addTopic: builder.mutation({
      query: (topic) => ({
        url: 'Topics/AddTopic',
        method: 'POST',
        body: topic,
      }),
      invalidatesTags: ['Topics'],
    }),
    updateTopic: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `Topics/UpdateTopic/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Topics'],
    }),
    deleteTopic: builder.mutation({
      query: (id: string) => ({
        url: `Topics/DeleteTopic/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Topics'],
    }),

    // =======================
    // SIGNATURES
    // =======================
    getSignaturesByMeetingId: builder.query({
      query: (meetingId: string) => `Signatures/SignaturesByMeetingId/${meetingId}`,
      providesTags: ['Signatures'],
    }),
    addSignature: builder.mutation({
      query: (signature) => ({
        url: 'Signatures/AddSignature',
        method: 'POST',
        body: signature,
      }),
      invalidatesTags: ['Signatures'],
    }),
    deleteSignature: builder.mutation({
      query: (id: string) => ({
        url: `Signatures/DeleteSignature/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Signatures'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetAllMeetingsQuery,
  useGetMeetingByIdQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,

  useGetAttendeesByMeetingIdQuery,
  useAddAttendeeMutation,
  useUpdateAttendeeMutation,
  useUpdateAttendeeStatusMutation,
  useDeleteAttendeeMutation,

  useGetTopicsByMeetingIdQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,

  useGetSignaturesByMeetingIdQuery,
  useAddSignatureMutation,
  useDeleteSignatureMutation,
} = meetingApi;
