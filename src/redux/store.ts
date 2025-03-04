import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import userReducer from "./slices/userslice.ts";
import groupsReducer from "./slices/groupsslice.ts";
import { authApi } from "../pages/auth/authApi.tsx";
import { usersApi } from "../pages/friends/usersApi.tsx";
import { groupsApi } from "../pages/groups/groupApi.tsx";
import { settlementApi } from "../pages/transactions/settlementApi.ts";
import { expenseApi } from "../pages/transactions/expenseApi.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    groups: groupsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [settlementApi.reducerPath]: settlementApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      usersApi.middleware, 
      groupsApi.middleware, 
      settlementApi.middleware,
      expenseApi.middleware
    ), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
