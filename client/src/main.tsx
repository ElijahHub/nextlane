import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthContextProvider } from "./context/auth.context";
import { DarkModeContextProvider } from "./context/darkMode.context";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>
);
