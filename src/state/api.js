import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Namespaces","Namespace","Rooms", "Room", "Users"],
  endpoints: (build) => ({
    getNamespaces: build.query({
      query: () => `Namespaces/`,
      provideTags: ["Namespaces"],
    }),
    getNamespace: build.query({
      query: (namespace) => `Namespaces/${namespace}`,
      provideTags: ["Namespaces"],
    }),
    getRoom: build.query({
      query: (namespace, roomName) => `Namespaces/${namespace}/rooms/${roomName}`,
      providesTags: ["Namespace","Room"],
    }),
    getUsers: build.query({
      query: () => "users",
      provideTags: ["Users"],
    }),
  }),
});

export const {useGetNamespacesQuery,useGetNamespaceQuery,useGetRoomQuery, useGetUsersQuery } = api;
