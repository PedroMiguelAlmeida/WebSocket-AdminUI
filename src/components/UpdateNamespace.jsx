import React, { useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import {  DeleteOutline, Edit, Preview } from "@mui/icons-material";
import { tokens } from "../theme";

const UpdateNamespace = ({ params }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mt="40px" height="75vh">
      <Tooltip title="Edit">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => {}}>
          <DeleteOutline />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UpdateNamespace;
