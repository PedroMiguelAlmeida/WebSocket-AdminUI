import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetNamespacesQuery, useGetRoomsQuery } from "../state/api";
import { tokens } from "../theme";
import EntityDataGridRooms from "./EntityDataGridRooms";
import {
  Redirect,
  Route,
  Switch,
  Router,
  useRoutes,
  useNavigate,
  Link,
} from "react-router-dom";

const EntityDataGridNamespaces = () => {
  const [active, setActive] = useState("namespaceComponent");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespacesQuery();
  const navigate = useNavigate();

  const columns = [
    {
      field: "namespace",
      renderCell: (params) => {
        return (
          <Link to={"/gridRoom"} state={{ namespace: params.value }}>
            {params.value}
          </Link>
        );
      },
      headerName: "Namespace",
      flex: 1,
    },
    {
      field: "roomsCount",
      headerName: "Nº Rooms",
      flex: 1,
    },
    {
      field: "clientsCount",
      headerName: "Nº Clients",
      flex: 1,
    },
  ];
  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.id}
        onRowClick={() => {
          console.log("BANANAS");
        }}
        rows={
          data
            ? data.map((entry) => ({
                id: entry._id,
                namespace: entry.namespace,
                roomsCount: entry.roomsCount,
                clientsCount: entry.clientsCount,
              }))
            : []
        }
        columns={columns}
      />
    </Box>
  );
};

export default EntityDataGridNamespaces;
