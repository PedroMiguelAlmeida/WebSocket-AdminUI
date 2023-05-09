import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRoomsQuery } from "../state/api";
import { tokens } from "../theme";
import EntityDataGridRooms from "./EntityDataGridRooms";
import { Redirect, Route, Switch, Router, useRoutes,useNavigate, Link  } from "react-router-dom";
import { useGetRoomQuery } from "../state/api";


const EntityDataGridClients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetRoomsQuery("namespaceDefault")

  const columns = [
    {
      field: "clients",
      headerName: "Client Name",
      flex: 1,
    },
  ];
  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.id}
        rows={
          data
            ? data.map((entry) => ({
                id: entry._id,
                clients:entry.clients ,
              }))
            : []
        }
        columns={columns}
      />
    </Box>
  );
};

export default EntityDataGridClients;
