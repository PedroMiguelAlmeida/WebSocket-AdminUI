import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetNamespaceQuery } from "../state/api";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "./Header";
import EntityDataGridClients from "./EntityDataGridClient";
import { Redirect, Route, Switch, Router, useRoutes, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { DataArray } from "@mui/icons-material";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getRowIdFromRowModel } from "@mui/x-data-grid/internals";

const EntityDataGridTopics = ({ setTopicData, sendJsonMessage, lastJsonMessage, readyState, isNewData, topicData }) => {
	const theme = useTheme();
	const location = useLocation();
	const colors = tokens(theme.palette.mode);
	const { data, isLoading } = useGetNamespaceQuery(location.state.namespace);
	const navigate = useNavigate();
	const [arrTopics, setArrTopics] = useState([]);
	const [messageHistory, setMessageHistory] = useState([]);
	const [modal, setModal] = useState(false);
	const [modalMessage, setModalMessage] = useState();
	const isNonMobile = useMediaQuery("(min-width:600px)");

	if (data && (topicData.namespace !== location.state.namespace || topicData.length == 0)) {
		setTopicData(data);
	}

	useEffect(() => {
		if (lastJsonMessage !== null) {
			lastJsonMessage.id = uuidv4();
			setMessageHistory((prev) => {
				const alreadyExists = !!prev.filter((msg) => msg.payload.msgDate === lastJsonMessage.payload.msgDate).length;
				if (!alreadyExists) {
					return [...prev, lastJsonMessage];
				} else {
					return prev;
				}
			});
			console.log(lastJsonMessage);
			console.log(messageHistory);
		}
	}, [lastJsonMessage, setMessageHistory]);

	const broadCastSchema = yup.object().shape({
		message: yup.string(),
	});
	const defaultValuesBroadcast = {
		message: "",
	};

	const columns = [
		{
			field: "topicName",
			renderCell: (params) => {
				return (
					<Link
						style={{
							textDecorationLine: "none",
							textDecorationColor: "currentColor",
						}}
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
			flex: 1,
			headerName: "Topic Name",
			editable: "true",
		},
		{
			field: "amountClients",
			headerName: "Nº Clients",
			flex: 1,
		},
	];

	const columnsConnClient = [
		{
			field: "client",
			headerName: "Connected Client",
			flex: 1,
		},
	];

	const columnsWebsocket = [
		{
			field: "msgDate",
			flex: 1,
			headerName: "Date",
		},
		{
			field: "username",
			headerName: "Username",
			flex: 1,
		},
		{
			field: "type",
			headerName: "Event",
			flex: 1,
		},
		{
			field: "message",
			renderCell: (params) => {
				return (
					<Button type="button" onClick={toggleModal}>
						View Message
					</Button>
				);
			},
			headerName: "Message",
			flex: 1,
		},
	];

	const deleteTopic = async (topic) => {
		console.log(`Delete Topic ${topic}`);
		await fetch(`http://localhost:3001/api/namespaces/${location.state.namespace}/topics/${topic}`, {
			method: "DELETE",
			credentials: "same-origin",
			withCredentials: true,
			credentials: "include",
		});
	};

	const handleDelete = async (arrTopics) => {
		console.log(arrTopics);
		for (let i = 0; i < arrTopics.length; i++) {
			console.log(` Handle Delete Topic ${{ arrTopics }}`);
			await deleteTopic(arrTopics[i].toString());
			let namespace = topicData;
			//const filter = topicData.topics.filter((d)=>d.topicName!==arrTopics[i].toString())
			const topicIndex = namespace.topics.findIndex((topic) => topic.topicName === arrTopics[i].toString());
			if (topicIndex > -1) namespace.topics.splice(topicIndex, 1);
			// namespace.topics = filter
			console.log("FILTER", namespace);
			setTopicData(namespace);
		}
	};

	const handleRefresh = async(topicData) =>{
		setTopicData({...topicData,topics: topicData.topics});
	} 

	const toggleModal = async (modalMessage) => {
		console.log("Toggle modal", modalMessage);
		setModal(!modal);
	};

	const broadcast = async (values, onSubmitProps) => {
		const broadcastResponse = await fetch(`http://localhost:3001/api/namespaces/${location.state.namespace}/broadcast`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
			credentials: "same-origin",
			withCredentials: true,
			credentials: "include",
		});
		const broadcastSent = await broadcastResponse.json();
		onSubmitProps.resetForm();
	};

	const handleBroadcastSubmit = async (values, onSubmitProps) => {
		await broadcast(values, onSubmitProps);
	};

	return (
		<Box mt="40px" height="75vh" sx={{ display: "grid", gap: "1", gridTemplateColumns: "repeat(2,1fr)" }}>
			<DataGrid
				loading={isLoading || !topicData}
				getRowId={(row) => row.topicName}
				rows={
					topicData && topicData.topics
						? topicData.topics.map((entry) => ({
								id: entry._id,
								topicName: entry.topicName,
								amountClients: entry.clients.length,
						  }))
						: []
				}
				checkboxSelection
				disableSelectionOnClick
				columns={columns}
				onRowSelectionModelChange={(row) => {
					arrTopics.pop(row);
					console.log(row);
					setArrTopics([...arrTopics, row]);
					console.log(arrTopics);
				}}
			/>
			{/* CLIENTES DO NAMESPACE */}
			<Box>
				<DataGrid
					loading={isLoading || !topicData}
					getRowId={(row) => row.id}
					rows={
						topicData && topicData.clients
							? topicData.clients.map((entry) => ({
									id: entry._id,
									client: entry.username,
							  }))
							: []
					}
					disableSelectionOnClick
					columns={columnsConnClient}
				/>
			</Box>

			<Box
				sx={{
					display: "inline-grid",
					gap: "1",
					gridTemplateColumns: "repeat(2,1fr)",
				}}
				
			>
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
								mt: "0.05rem",
								ml: "1rem",
								p: "1rem",
								backgroundColor: colors.primary[400],
								color: colors.grey[100],
								"&:hover": { backgroundColor: colors.primary[800] },
							}}
						>
							Add New Topic
						</Button>
					</Link>
					<Button
						type="button"
						onClick={() => handleDelete(arrTopics)}
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

					<Button
						type="button"
						onClick={() => handleRefresh(topicData)}
						sx={{
							m: "2rem 0",
							p: "1rem",
							ml: "1rem",
							backgroundColor: colors.primary[400],
							color: colors.grey[100],
							"&:hover": { backgroundColor: colors.primary[800] },
						}}
					>
						Refresh Clients
					</Button>
				</Box>
				<Formik onSubmit={handleBroadcastSubmit} initialValues={defaultValuesBroadcast} validationSchema={broadCastSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Box
								display="grid"
								gap="25px"
								gridTemplateColumns="repeat(2,minmax(0,1fr))"
								sx={{
									"& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
								}}
							>
								<TextField
									label="Message"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.message}
									name="message"
									sx={{
										"& label": {
											left: "1rem",
											top: "1rem",
										},
										mt: "1rem",
										p: "1rem",
										gridColumn: "span 2",
									}}
								/>
							</Box>
							<Box>
								<Button
									type="submit"
									sx={{
										mt: "0.05rem",
										ml: "1rem",
										p: "1rem",
										backgroundColor: colors.primary[400],
										color: colors.grey[100],
										"&:hover": { backgroundColor: colors.primary[800] },
									}}
								>
									Broadcast
								</Button>
							</Box>
						</form>
					)}
				</Formik>
				<Modal open={modal} onClose={toggleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 400,
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							p: 4,
						}}
					>
						<Header title="Message" />
						{modalMessage}
					</Box>
				</Modal>
			</Box>
			<Box>
				<DataGrid
					loading={isLoading || !messageHistory}
					getRowId={(row) => row.id}
					rows={
						messageHistory
							? messageHistory.map((entry) => ({
									id: entry.id,
									msgDate: entry.payload.msgDate,
									username: entry.payload.username,
									type: entry.type,
									message: JSON.stringify(entry.payload.msg),
							  }))
							: []
					}
					columns={columnsWebsocket}
					onRowSelectionModelChange={(row) => {
						// console.log(messageHistory.filter(msg=>msg.id===row[0])[0])
						setModalMessage(JSON.stringify(messageHistory.filter((msg) => msg.id === row[0])[0].payload.msg));
						// console.log("Message history",messageHistory)
						// console.log("Message history msg",JSON.stringify(messageHistory[0].payload.msg))
						console.log("Message History msg", modalMessage);
					}}
				/>
			</Box>
		</Box>
	);
};

export default EntityDataGridTopics;
