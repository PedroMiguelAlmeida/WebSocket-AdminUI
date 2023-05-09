import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Rooms", "Room", "Users"],
  endpoints: (build) => ({
    getRooms: build.query({
      query: (namespace) => `Namespace/${namespace}`,
      provideTags: ["Rooms"],
    }),
    getRoom: build.query({
      query: (namespace, roomName) => `Namespace/${namespace}/room/${roomName}`,
      providesTags: ["Room"],
    }),
    getUsers: build.query({
      query: () => "users",
      provideTags: ["Users"],
    }),
  }),
});

export const { useGetRoomsQuery, useGetUsersQuery,useGetRoomQuery } = api;
