import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    }
});
export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
