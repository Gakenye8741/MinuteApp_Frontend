import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://minuteapp-backend.onrender.com/api/' }),
  tagTypes: ['Topics'],
  endpoints: (builder) => ({
    // =======================
    // TOPICS
    // =======================
    getAllTopics: builder.query({
      query: () => `Topics/AllTopics`,
      providesTags: ['Topics'],
    }),
    getTopicsByMeetingId: builder.query({
      query: (meetingId: string) => `Topics/MeetingTopics/${meetingId}`,
      providesTags: ['Topics'],
    }),
    getTopicById: builder.query({
      query: (id: string) => `Topics/TopicById/${id}`,
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
  }),
});

// ✅ Export hooks
export const {
  useGetAllTopicsQuery,
  useGetTopicsByMeetingIdQuery,
  useGetTopicByIdQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApi;
