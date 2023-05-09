import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {useSelector} from "react-redux";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Namespaces from "./scenes/namespaces";
import Rooms from "./scenes/rooms";
import Users from "./scenes/users";
import Form from "./scenes/form";
import Logs from "./scenes/logs";
import About from "./scenes/about";
import EntityDataGridRooms from "./components/EntityDataGridRooms";
import { useMemo } from "react";
import EntityDataGridClients from "./components/EntityDataGridClient";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/namespaces" element={<Namespaces />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/users" element={<Users />} />
              <Route path="/form" element={<Form />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/about" element={<About />} />
              <Route path="/gridRoom" element={<EntityDataGridRooms />} />
              <Route path="/gridClient" element={<EntityDataGridClients/>} />
            </Routes>
          </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
