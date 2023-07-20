import { ColorModeContext, useMode } from "./theme";
import { useState, useEffect, useCallback, useRef } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Namespaces from "./scenes/namespaces";
import Topics from "./scenes/topics";
import Users from "./scenes/users";
import Form from "./scenes/form";
import Logs from "./scenes/logs";
import About from "./scenes/about";
import Login from "./scenes/login";
import EntityDataGridTopics from "./components/EntityDataGridTopics";
import { useMemo } from "react";
import EntityDataGridClients from "./components/EntityDataGridClient";
import CreateNamespace from "./components/CreateNamespace";
import CreateTopic from "./components/CreateTopic";
import PrivateRoutes from "./utils/PrivateRoutes";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useGetNamespacesQuery, useGetTopicsQuery, useGetNamespaceQuery } from "./state/api";

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

function App() {
	const [theme, colorMode] = useMode("Light");
	const [isLoggedIn, setIsLoggedIn] = useState();
	const { data, isLoading } = useGetNamespacesQuery();
	const [topicData, setTopicData] = useState([]);
	const [namespaceData, setNamespaceData] = useState([]);
	const [user,setUser] = useState()

	// debugger
	// if (data && data.length!=namespaceData.length) {
	if (data && namespaceData.length == 0) {
		setNamespaceData(data);
	}
	const [isNewData, setNewData] = useState(false);

	const isSidebar = !!isLoggedIn;

	const url = "ws://localhost:3001";
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
		onOpen: () => console.log("WS connected"),
		onClose: () => console.log("WS disconnected"),
		onMessage: (e) => console.log("WS message received:", e),
	});

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar isSidebar={isSidebar} />
					<main className="content">
						<Topbar setIsSidebar={isSidebar} />
						<Routes>
							<Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
								<Route path="/" element={<Dashboard setNamespaceData={setNamespaceData} data={namespaceData} isLoading={isLoading} isNewData={isNewData} />} />
								<Route path="/namespaces" element={<Namespaces />} />
								<Route path="/topics" element={<Topics />} />
								<Route path="/users" element={<Users />} />
								<Route path="/form" element={<Form />} />
								<Route path="/logs" element={<Logs />} />
								<Route path="/about" element={<About />} />
								<Route path="/gridTopic" element={<EntityDataGridTopics topicData={topicData} setTopicData={setTopicData} sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} readyState={readyState} isNewData={isNewData} />} />
								<Route path="/gridClient" element={<EntityDataGridClients sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} readyState={readyState} />} />
								<Route path="/createNamespace" element={<CreateNamespace data={namespaceData} setNewData={setNewData} setNamespaceData={setNamespaceData} namespacesData={namespaceData} user={user} />} />
								<Route path="/createTopic" element={<CreateTopic setTopicData={setTopicData} topicData={topicData} user={user}/>} />
							</Route>
							<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} isSidebar={false} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
