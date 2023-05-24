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
import { current } from "@reduxjs/toolkit";

const EntityDataGridTopics = () => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespaceQuery(location.state.namespace);
  const navigate = useNavigate();
  const [arrTopics, setArrTopics] = useState([]);



  const columns = [
    {
      field: "topicName",
      renderCell: (params) => {
        return (
          <Link
            to={"/gridClient"}
            state={{
              namespace: location.state.namespace,
              topicName: params.value,
            }}
          >
            {params.value}
          </Link>
        );
      },
      headerName: "Topic Name",
      flex: 1,
      editable: "true",
    },
    {
      field: "amountClients",
      headerName: "Nº Clients",
      flex: 1,
    },
  ];

  const deleteTopic = async (topic) => {
    console.log(`Delete Topic ${topic}`)
    await fetch(
      `http://localhost:8080/api/namespaces/${location.state.namespace}/topics/${topic}`,
      {
        method: "DELETE",
      }
    );
  };

  const handleDelete = async (arrTopics) => {
    console.log(arrTopics)
    for (let i = 0; i < arrTopics.length; i++) {
      console.log(` Handle Delete Topic ${{arrTopics}}`)
      await deleteTopic(arrTopics[i].toString());
    }
  };

  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.topicName}
        rows={
          data
            ? data.topics.map((entry) => ({
                id: entry._id,
                topicName: entry.topicName,
                amountClients: entry.clients.length,
              }))
            : []
        }
        checkboxSelection
        disableSelectionOnClick
        columns={columns}
        onRowSelectionModelChange={ (row) => { 
          arrTopics.pop(row)
          console.log(row)
          setArrTopics([...arrTopics,row])
          console.log(arrTopics)
        }}
      />
      <Box>
        <Link
          to={"/createTopic"}
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
          <Button
            type="button"
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              "&:hover": { backgroundColor: colors.primary[800] },
            }}
          >
            Add New Topic
          </Button>
        </Link>

        <Button
          onClick={()=> handleDelete(arrTopics)}
          sx={{
            m: "2rem 0",
            p: "1rem",
            ml: "1rem",
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            "&:hover": { backgroundColor: colors.primary[800] },
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default EntityDataGridTopics;
