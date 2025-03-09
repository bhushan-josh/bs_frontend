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
  tagTypes: ["Group"],
  endpoints: (builder) => ({
    getGroups: builder.query<any[], void>({
      query: () => "/groups",
      transformResponse: (response: { success: boolean; message: string; data: any[] }) => response.data,
      providesTags: ["Group"],
    }),

    getGroup: builder.query<any, number>({
      query: (groupId) => `/groups/${groupId}`,
      transformResponse: (response: { success: boolean; message: string; data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: "Group", id }],
    }),

    createGroup: builder.mutation<any, { name: string; description?: string }>({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: newGroup,
      }),
      invalidatesTags: ["Group"],
    }),

    updateGroup: builder.mutation<any, { id: number; updatedGroup: any }>({
      query: ({ id, updatedGroup }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: updatedGroup,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Group", id }],
    }),

    deleteGroup: builder.mutation<void, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery, 
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;