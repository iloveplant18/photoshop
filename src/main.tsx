import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/App";
import "@/assets/css/index.css";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("root element not exists");
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
