import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EntityDataGrid from "../../components/EntityDataGridNamespaces";
import EntityDataGridNamespaces from "../../components/EntityDataGridNamespaces";
import EntityDataGridRooms from "../../components/EntityDataGridRooms";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dashboard" />
      <Box>
      <EntityDataGridNamespaces />
      </Box>

      {/* <EntityDataGridRooms/> */}
    </Box>
  );
};

export default Dashboard;
