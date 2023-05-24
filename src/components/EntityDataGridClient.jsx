import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Redirect, Route, Switch, Router, useRoutes,useNavigate, Link  } from "react-router-dom";
import { useGetTopicQuery } from "../state/api";
import { useLocation } from "react-router-dom";


const EntityDataGridClients = () => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  console.log(location,"CLIENTES");
  console.log(location.state.namespace,"NAMESPACE DOS CLIENTES");
  console.log(location.state.topicName,"TOPIC DOS CLIENTES");
  const { data, isLoading } = useGetTopicQuery(location.state.namespace,location.state.topicName)
  if (data ? data:[]) {
    console.log(data)
  }
  const columns = [
    {
      field: "clientName",
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
            ? data.topic.clients.map((entry) => ({
                id: entry.clientName,
                clientName:entry,
              }))
            : []
        }
        columns={columns}
      />
    </Box>
  );
};

export default EntityDataGridClients;
