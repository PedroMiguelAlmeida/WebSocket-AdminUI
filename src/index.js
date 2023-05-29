import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {AuthProvider} from "react-auth-kit";
import globalReducer from "./state";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider
    authType={"cookie"}
    authName={"WS-MANAGER-AUTH"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);
