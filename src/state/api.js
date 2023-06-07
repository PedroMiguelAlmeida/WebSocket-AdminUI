import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Namespaces","Namespace","Topics", "Topic", "Users"],
  endpoints: (build) => ({
    getNamespaces: build.query({
      query: () => `Namespaces/`,
      provideTags: ["Namespaces"],
    }),
    getNamespace: build.query({
      query: (namespace) => `namespaces/${namespace}`,
      provideTags: ["Namespaces"],
    }),
    getTopic: build.query({
      query: (namespace, topicName) => `namespaces/${namespace}/topics/${topicName}`,
      providesTags: ["Namespace","Topic"],
    }),
    getUsers: build.query({
      query: () => "users",
      provideTags: ["Users"],
    }),
  }),
});

export const {useGetNamespacesQuery,useGetNamespaceQuery,useGetTopicQuery, useGetUsersQuery } = api;
