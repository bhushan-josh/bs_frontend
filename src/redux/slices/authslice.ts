import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//type lihi sperate
interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

// Service lihi
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
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
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        if (response.success && response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        return response;
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
export default authApi.reducer; // Export reducer for store
