import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";

const API_URL = "http://localhost:3000";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      const { token: userToken } = (getState() as RootState).auth;
      if (token || userToken) {
        headers.set("Authorization", token);
      }
      headers.set("Accept", "application/vnd.billsplitter.com; version=1");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<
      { id: number; first_name: string; last_name: string; phone: string; email: string; full_name: string },
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<
      { message: string; user: { id: number; first_name: string; last_name: string; phone: string; email: string } },
      { userId: number; full_name: string; phone: string; email: string }
    >({
      query: ({ userId, ...body }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserMutation } = userApi;
export default userApi;
