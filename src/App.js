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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
	const [theme, colorMode] = useMode("Light");
  const[isLoggedIn,setIsLoggedIn] = useState();
  
	const isSidebar = !!isLoggedIn;

	const url = "ws://localhost:8080";
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
		onOpen: () => console.log("WS connected"),
		onClose: () => console.log("WS disconnected"),
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
								<Route path="/" element={<Dashboard />} />
								<Route path="/namespaces" element={<Namespaces />} />
								<Route path="/topics" element={<Topics />} />
								<Route path="/users" element={<Users />} />
								<Route path="/form" element={<Form />} />
								<Route path="/logs" element={<Logs />} />
								<Route path="/about" element={<About />} />
								<Route path="/gridTopic" element={<EntityDataGridTopics sendJsonMessage={sendJsonMessage} lastJsonMessage={lastJsonMessage} readyState={readyState} />} />
								<Route path="/gridClient" element={<EntityDataGridClients />} />
								<Route path="/createNamespace" element={<CreateNamespace />} />
								<Route path="/createTopic" element={<CreateTopic />} />
							</Route>
							<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} isSidebar={false} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
