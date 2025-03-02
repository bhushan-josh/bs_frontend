import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import { authApi } from "../pages/auth/authApi.tsx";
import userApi from "../pages/profile/userApi.tsx";
import { usersApi } from "../pages/friends/usersApi.tsx";
import { groupsApi } from "../pages/groups/groupApi.tsx";
import { transactionsApi } from "../pages/transactions/transactinsApi.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, usersApi.middleware, groupsApi.middleware, transactionsApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
