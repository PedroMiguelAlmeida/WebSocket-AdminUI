import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetNamespacesQuery, useGetTopicsQuery } from "../state/api";
import { tokens } from "../theme";
import EntityDataGridTopics from "./EntityDataGridTopics";
import {
  Redirect,
  Route,
  Switch,
  Router,
  useRoutes,
  useNavigate,
  Link,
} from "react-router-dom";
import UpdateNamespace from "./UpdateNamespace";

const EntityDataGridNamespaces = () => {
  const [active, setActive] = useState("namespaceComponent");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespacesQuery();
  const navigate = useNavigate();
  const [arrNamespaces, setArrNamespaces] = useState([]);

  const columns = [
    {
      field: "namespace",
      renderCell: (params) => {
        return (
          <Link to={"/gridTopic"} state={{ namespace: params.value }}>
            {params.value}
          </Link>
        );
      },
      headerName: "Namespace",
      flex: 1,
    },
    {
      field: "topicsCount",
      headerName: "Nº Topics",
      flex: 1,
    },
    {
      field: "clientsCount",
      headerName: "Nº Clients",
      flex: 1,
    },
  ];


  const deleteNamespace = async (namespace) => {
    console.log(namespace);
    await fetch(`http://localhost:8080/api/namespaces/${namespace}`, {
      method: "DELETE",
    });
  };

  const handleDelete = async (arrNamespaces) => {
    console.log(arrNamespaces);
    for (let i = 0; i < arrNamespaces.length; i++) {
      console.log(` Handle Delete Topic ${{ arrNamespaces }}`);
      await deleteNamespace(arrNamespaces[i].toString());
    }
  };

  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.namespace}
        rows={
          data
            ? data.map((entry) => ({
                id: entry._id,
                namespace: entry.namespace,
                topicsCount: entry.topicsCount,
                clientsCount: entry.clientsCount,
              }))
            : []
        }
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(row) => {
          arrNamespaces.pop(row);
          console.log(row);
          setArrNamespaces([...arrNamespaces, row]);
          console.log(arrNamespaces);
        }}
      />


      <Box>
        <Link
          to={"/createNamespace"}
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
            Add New Namespace
          </Button>
        </Link>

        <Button
          onClick={() => handleDelete(arrNamespaces)}
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

export default EntityDataGridNamespaces;
