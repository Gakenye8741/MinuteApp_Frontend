import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://minuteapp-backend.onrender.com/api/auth/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    // 🔐 Login
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // 🟢 Register
    registerUser: builder.mutation({
      query: (userData: {
        username: string;
        fullName: string;
        email: string;
        password: string;
        role: "Secretary General" | "Chairman";
      }) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

// ✅ Export hooks
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApi;
