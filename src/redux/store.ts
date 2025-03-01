import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import { authApi } from "../pages/auth/authapi.tsx";
import userApi from "../pages/profile/api.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
