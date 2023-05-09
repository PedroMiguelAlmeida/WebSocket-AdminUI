import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRoomsQuery } from "../state/api";
import { tokens } from "../theme";
import Header from "./Header";

const EntityDataGridRooms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetRoomsQuery("namespaceDefault");
  const columns = [
    {
      field: "roomName",
      headerName: "Room Name",
      flex: 1,
    },
    {
      field: "amountClients",
      headerName: "Nº Clients",
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
                roomName: entry.roomName,
                amountClients: entry.clients.length,
              }))
            : []
        }
        columns={columns}
      />
    </Box>
  );
};

export default EntityDataGridRooms;
