import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attendeesApi = createApi({
  reducerPath: 'attendeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://minuteapp-backend.onrender.com/api/' }),
  tagTypes: ['Attendees'],
  endpoints: (builder) => ({
    // =======================
    // ATTENDEES
    // =======================
    
    // Get all attendees (optional query: ?meetingId=1)
    getAllAttendees: builder.query({
      query: (meetingId?: string) => 
        meetingId ? `Attendees/AllAttendees?meetingId=${meetingId}` : 'Attendees/AllAttendees',
      providesTags: ['Attendees'],
    }),

    // Get single attendee by ID
    getAttendeeById: builder.query({
      query: (id: string) => `Attendees/AttendeeById/${id}`,
      providesTags: ['Attendees'],
    }),

    // Add a new attendee
    addAttendee: builder.mutation({
      query: (attendee) => ({
        url: 'Attendees/AddAttendee',
        method: 'POST',
        body: attendee,
      }),
      invalidatesTags: ['Attendees'],
    }),

    // Update an attendee by ID
    updateAttendee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `Attendees/UpdateAttendee/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Attendees'],
    }),

    // Update attendee status only
    updateAttendeeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `Attendees/UpdateAttendeeStatus/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Attendees'],
    }),

    // Delete an attendee by ID
    deleteAttendee: builder.mutation({
      query: (id: string) => ({
        url: `Attendees/DeleteAttendee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attendees'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetAllAttendeesQuery,
  useGetAttendeeByIdQuery,
  useAddAttendeeMutation,
  useUpdateAttendeeMutation,
  useUpdateAttendeeStatusMutation,
  useDeleteAttendeeMutation,
} = attendeesApi;
