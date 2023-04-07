import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
