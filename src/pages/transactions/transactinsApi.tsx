import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
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
    getExpenses: builder.query<any[], void>({
      query: () => "/expenses",
      transformResponse: (response: { success: boolean; message: string; data: any[] }) => response.data,
    }),
    getSettlements: builder.query<any[], void>({
      query: () => "/settlements",
      transformResponse: (response: { success: boolean; message: string; data: any[] }) => response.data,
    }),
  }),
});

export const { useGetExpensesQuery, useGetSettlementsQuery } = transactionsApi;
