import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice.ts"; 
import userReducer from "./slices/userslice.ts";
import groupsReducer from "./slices/groupsslice.ts";
import { authApi } from "../pages/auth/authApi.tsx";
import { usersApi } from "../pages/friends/usersApi.tsx";
import { userApi } from "../pages/profile/userApi.tsx"; 
import { groupsApi } from "../pages/groups/groupApi.tsx";
import { transactionsApi } from "../pages/transactions/transactinsApi.tsx";
import { balanceApi } from "../pages/friends/balanceApi.ts";
import { settlementApi } from "../pages/create_transaction/settlementApi.ts";
import { expenseApi } from "../pages/create_transaction/expenseApi.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    groups: groupsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer, 
    [settlementApi.reducerPath]: settlementApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      userApi.middleware, 
      usersApi.middleware, 
      groupsApi.middleware, 
      transactionsApi.middleware,
      balanceApi.middleware,
      settlementApi.middleware,
      expenseApi.middleware
    ), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
