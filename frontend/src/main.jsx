import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";
import { SupervisorProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SupervisorProvider>
        <App />
      </SupervisorProvider>
    </AuthProvider>
  </BrowserRouter>
);
