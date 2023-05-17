import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetNamespaceQuery } from "../state/api";
import { tokens } from "../theme";
import Header from "./Header";
import EntityDataGridClients from "./EntityDataGridClient";
import {
  Redirect,
  Route,
  Switch,
  Router,
  useRoutes,
  useNavigate,
  Link,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

const EntityDataGridRooms = () => {
  const theme = useTheme();
  const location = useLocation();
  console.log(location.state.namespace);
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespaceQuery(location.state.namespace);
  const navigate = useNavigate();

  const columns = [
    {
      field: "roomName",
      renderCell: (params) => {
        return (
          <Link
            to={"/gridClient"}
            state={{
              namespace: location.state.namespace,
              roomName: params.value,
            }}
          >
            {params.value}
          </Link>
        );
      },
      headerName: "Room Name",
      flex: 1,
      editable: "true",
    },
    {
      field: "amountClients",
      headerName: "Nº Clients",
      flex: 1,
    },
  ];

  const navigateToCreateRoom = () => {
    navigate("/createRoom");
  };


  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.id}
        rows={
          data
            ? data.rooms.map((entry) => ({
                id: entry._id,
                roomName: entry.roomName,
                amountClients: entry.clients.length,
              }))
            : []
        }
        columns={columns}
      />
      <Box>
      <Link
          to={"/createRoom"}
          state={{
            namespace: location.state.namespace,
          }}
          sx={{
            m: "2rem 0",
            p: "1rem",
            ml: "1rem",
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            "&:hover": { backgroundColor: colors.primary[800] },
          }}
        >
          Add New Room
        </Link>
      </Box>
    </Box>
  );
};

export default EntityDataGridRooms;
