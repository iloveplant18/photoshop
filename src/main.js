"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var react_1 = require("react");
var App_1 = require("@/App");
require("@/assets/css/index.css");
var rootElement = document.querySelector("#root");
if (!rootElement)
    throw new Error("root element not exists");
(0, client_1.createRoot)(rootElement).render(<react_1.StrictMode>
    <App_1.default />
  </react_1.StrictMode>);
