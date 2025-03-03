import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
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
    getGroups: builder.query<any[], void>({
      query: () => "/groups",
      transformResponse: (response: { success: boolean; message: string; data: any[] }) => response.data,
    }),

    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: newGroup,
      }),
    }),

    updateGroup: builder.mutation({
      query: ({ id, updatedGroup }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: updatedGroup,
      }),
    }),

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useGetGroupsQuery, 
  useCreateGroupMutation, 
  useUpdateGroupMutation, 
  useDeleteGroupMutation 
} = groupsApi;
