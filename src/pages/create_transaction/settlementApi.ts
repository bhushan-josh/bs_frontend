import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000";

export const settlementApi = createApi({
  reducerPath: "settlementApi",
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
    settleBalance: builder.mutation<any, { payee_id: number }>({
      query: (payload) => ({
        url: "/settlements",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSettleBalanceMutation } = settlementApi;