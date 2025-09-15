import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../Features/Auth/AuthSlice"
import { userApi } from "../Features/Apis/userApi";
import { authApi } from "../Features/Apis/AuthApi";
import { meetingApi } from "../Features/Apis/meetingApis";
import { attendeesApi } from "../Features/Apis/AttendeesApi";
import { topicApi } from "../Features/Apis/Topics.Api";
import { signatureApi } from "../Features/Apis/SignaturesApi";


// Create Persist Configuration for auth Slice

 const authPersistConfiguration ={
    key: 'auth',
    storage,
    whitelist: ['user','token','isAuthenticated','role']
 }
//  Create A persistent Reducer for the AUTH
const persistedAuthReducer =persistReducer(authPersistConfiguration,authReducer)


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [meetingApi.reducerPath] : meetingApi.reducer,
        [attendeesApi.reducerPath] : attendeesApi.reducer,
        [topicApi.reducerPath]: topicApi.reducer,
        [signatureApi.reducerPath]: signatureApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat( userApi.middleware, authApi.middleware, meetingApi.middleware,attendeesApi.middleware, topicApi.middleware ,signatureApi.middleware)
})

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch