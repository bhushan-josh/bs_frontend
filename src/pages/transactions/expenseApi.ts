import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:3000";

export const expenseApi = createApi({
  reducerPath: 'api', // Single reducer path for the combined API
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      headers.set("Accept", "application/vnd.billsplitter.com; version=1");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Expenses","Balance"], // Define a tag type for settlements
  endpoints: (builder) => ({
    // Endpoint from transactionsApi
    getExpenses: builder.query<any[], void>({
      query: () => "/expense_splits",
      transformResponse: (response: { success: boolean; message: string; data: any[] }) => response.data,
      providesTags: ["Expenses"], // Associate this query with the tag
    }),

    createExpenseSplit: builder.mutation({
      query: (expenseData) => ({
        url: "/expense_splits",
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: ["Expenses"], // Invalidate the "Settlements" tag after this mutation
    }),

    getBalance: builder.query<{ balance: number }, number>({
      query: (userId) => `/expense_splits/${userId}`,
      transformResponse: (response: { success: boolean; message: string; data: number }) => ({
        balance: response.data, // Map `data` to `balance`
      }),
      providesTags: ["Balance"], // Invalidate the "Settlements" tag after this mutation
    }),

    // Endpoint from expenseApi
    createExpense: builder.mutation({
      query: (expenseData) => ({
        url: '/expenses',
        method: 'POST',
        body: expenseData,
      }),
      invalidatesTags: ["Expenses", "Balance"], // Invalidate the "Settlements" tag after this mutation
    }),
    
  }),
});

// Export hooks for the remaining endpoints
export const {
  useGetExpensesQuery,
  useCreateExpenseSplitMutation,
  useCreateExpenseMutation,
  useGetBalanceQuery
} = expenseApi;
