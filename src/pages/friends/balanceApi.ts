import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:3000";

export const balanceApi = createApi({
  reducerPath: 'balanceApi',
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
  endpoints: (builder) => ({
    getBalance: builder.query<{ balance: number }, number>({
      query: (userId) => `/expense_splits/${userId}`,
      transformResponse: (response: { success: boolean; message: string; data: number }) => ({
        balance: response.data, // Map `data` to `balance`
      }),
    }),
  }),
});

export const { useGetBalanceQuery } = balanceApi;
