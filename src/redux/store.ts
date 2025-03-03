import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import userReducer from "./slices/userslice.ts";
import groupsReducer from "./slices/groupsslice.ts";
import { authApi } from "../pages/auth/authApi.tsx";
import { usersApi } from "../pages/friends/usersApi.tsx";
import { userApi } from "../pages/profile/userApi.tsx"; // Ensure this API exists
import { groupsApi } from "../pages/groups/groupApi.tsx";
import { transactionsApi } from "../pages/transactions/transactinsApi.tsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    groups: groupsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer, // Added if needed
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      userApi.middleware, // Added if needed
      usersApi.middleware, 
      groupsApi.middleware, 
      transactionsApi.middleware

    ), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
