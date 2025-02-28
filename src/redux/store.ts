import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/authslice.ts";
// import usersReducer from "./slices/usersSlice";
// import groupsReducer from "./slices/groupsSlice";
// import transactionsReducer from "./slices/transactionsSlice";
// import expensesReducer from "./slices/expensesSlice";  
// import settlementsReducer from "./slices/settlementsSlice";

export const store = configureStore({
  // reducer: {
  //   // users: usersReducer,
  //   // groups: groupsReducer,
  //   // transactions: transactionsReducer,
  //   // expenses: expensesReducer,
  //   // settlements: settlementsReducer,
  // },

  reducer: {
    [authApi.reducerPath]: authApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add API middleware
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
