import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
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
import { RequireAuth } from "react-auth-kit";

function App() {
  const [theme, colorMode] = useMode("Light");
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  console.log("User:",user)
  console.log("Token:",token)
  const isSidebar = !!token

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={isSidebar} />
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} isSidebar={false} />
              {/* <Route element={<RequireAuth loginPath="/login"/>}> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/namespaces" element={<Namespaces />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/users" element={<Users />} />
                <Route path="/form" element={<Form />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/about" element={<About />} />
                <Route path="/gridTopic" element={<EntityDataGridTopics />} />
                <Route path="/gridClient" element={<EntityDataGridClients />} />
                <Route path="/createNamespace" element={<CreateNamespace />} />
                <Route path="/createTopic" element={<CreateTopic />} />
              {/* </Route> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
