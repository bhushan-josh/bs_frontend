import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:3000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
    loginUser: builder.mutation<{ success: boolean; data: { token: string } }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("token", data.data.token);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      queryFn: async () => {
        localStorage.removeItem("token");
        return { data: undefined };
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi; 
export default authApi; 
