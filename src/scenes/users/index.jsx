import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersQuery } from "../../state/api";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// const User = ({ email, username }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   return (

//   );
// };

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetUsersQuery();
  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
  ];

  console.log("data", data);
//   debugger
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Users" />
      <Box mt="40px" height="75vh" sx={{
        "& .MuiDataGrid-root":{
          border:"none"
        },
        "& .MuiDataGrid-cell":{
          borderBottom: "none"
        },
        "& .MuiDataGrid-columnHeader":{
          borderBottom:"none"
        },
        "& .MuiDataGrid-footerContainer":{
          borderTop:"none"
        },
      }}>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
        rows={data ? [{id:data.email,email:data.email,username:data.username}]:[]} 
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Users;
