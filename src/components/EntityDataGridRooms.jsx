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

const EntityDataGridRooms = () => {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetNamespaceQuery(location.state.namespace);
  const navigate = useNavigate();
  const [arrRooms, setArrRooms] = useState([]);



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

  const deleteRoom = async (room) => {
    console.log(`Delete Room ${room}`)
    await fetch(
      `http://localhost:8080/api/namespaces/${location.state.namespace}/rooms/${room}`,
      {
        method: "DELETE",
      }
    );
  };

  const handleDelete = async (arrRooms) => {
    console.log(arrRooms)
    for (let i = 0; i < arrRooms.length; i++) {
      console.log(` Handle Delete Room ${{arrRooms}}`)
      await deleteRoom(arrRooms[i].toString());
    }
  };

  return (
    <Box mt="40px" height="75vh">
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.roomName}
        rows={
          data
            ? data.rooms.map((entry) => ({
                id: entry._id,
                roomName: entry.roomName,
                amountClients: entry.clients.length,
              }))
            : []
        }
        checkboxSelection
        disableSelectionOnClick
        columns={columns}
        onRowSelectionModelChange={ (row) => { 
          arrRooms.pop(row)
          console.log(row)
          setArrRooms([...arrRooms,row])
          console.log(arrRooms)
        }}
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
          <Button
            type="button"
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              "&:hover": { backgroundColor: colors.primary[800] },
            }}
          >
            Add New Room
          </Button>
        </Link>

        <Button
          onClick={()=> handleDelete(arrRooms)}
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

export default EntityDataGridRooms;
