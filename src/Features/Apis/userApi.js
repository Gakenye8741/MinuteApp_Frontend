import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://minuteapp-backend.onrender.com/api/Users/' }),
    tagTypes: ['users', 'user'],
    endpoints: (builder) => ({
        // 🟢 Get all users
        getAllUsers: builder.query({
            query: () => 'AllUsers',
            providesTags: ['users'],
        }),
        // 🔍 Get user by ID
        getUserById: builder.query({
            query: (id) => `UserByid/${id}`,
            providesTags: ['user'],
        }),
        // 🟢 Create a new user
        createUser: builder.mutation({
            query: (userData) => ({
                url: 'CreateUser',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['users'],
        }),
        // 🔁 Update user by ID
        updateUser: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `UpdateUser/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['user', 'users'],
        }),
        // 🔄 Toggle user status (enable/disable)
        toggleUserStatus: builder.mutation({
            query: (id) => ({
                url: `ToggleStatus/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['user', 'users'],
        }),
    }),
});
// ✅ Export Hooks
export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useToggleUserStatusMutation, } = userApi;
