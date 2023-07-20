import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetNamespacesQuery, useGetTopicsQuery } from "../state/api";
import { tokens } from "../theme";
//import EntityDataGridTopics from "./EntityDataGridTopics";
import { Redirect, Route, Switch, Router, useRoutes, useNavigate, Link } from "react-router-dom";
import UpdateNamespace from "./UpdateNamespace";

const EntityDataGridNamespaces = ({ data, isLoading, isNewData, setNamespaceData }) => {
	const [active, setActive] = useState("namespaceComponent");
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const [arrNamespaces, setArrNamespaces] = useState([]);

	// const fetchNamespace = async () => {
	// 	const fetchData = await fetch(`http://localhost:3001/api/namespaces`, {
	// 		method: "GET",
	// 		credentials: "same-origin",
	// 		withCredentials: true,
	// 		credentials: "include",
	// 	}).json()
	// 	return fetchData
	// };

	// useEffect( () => {
	// 	data =  fetchNamespace()
	// 	debugger
	//   }, [isNewData]);

	const columns = [
		{
			field: "namespace",
			renderCell: (params) => {
				return (
					<Link style={{ textDecorationLine: "none", textDecorationColor: "currentColor" }} to={"/gridTopic"} state={{ namespace: params.value }}>
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
		await fetch(`http://localhost:3001/api/namespaces/${namespace}`, {
			method: "DELETE",
			credentials: "same-origin",
			withCredentials: true,
			credentials: "include",
		});
	};

	const handleDelete = async (arrNamespaces) => {
		for (let i = 0; i < arrNamespaces.length; i++) {
			console.log(` Handle Delete Topic ${{ arrNamespaces }}`);
			await deleteNamespace(arrNamespaces[i].toString());
			setNamespaceData(data.filter((d) => d.namespace !== arrNamespaces[i].toString()));
		}
	};

	return (
		<Box display="grid" gap="25px" mt="40px" height="75vh">
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
					setArrNamespaces([...arrNamespaces, row]);
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
					type="button"
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
