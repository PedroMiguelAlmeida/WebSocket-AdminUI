import React from "react";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EntityDataGrid from "../../components/EntityDataGridNamespaces";
import EntityDataGridNamespaces from "../../components/EntityDataGridNamespaces";
//import EntityDataGridTopics from "../../components/EntityDataGridTopics";

const Dashboard = ({data,isLoading,isNewData,setNamespaceData}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box m="1.5rem 2.5rem">
			<Header title="Dashboard" />
			<Box>
				<EntityDataGridNamespaces setNamespaceData={setNamespaceData} data={data} isLoading={isLoading} isNewData={isNewData} />
			</Box>
		</Box>
	);
};

export default Dashboard;
