import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import { authApi } from "../pages/auth/authapi.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
