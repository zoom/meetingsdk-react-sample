import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

window.React = React;
window.ReactDOM = ReactDOM;
console.log("React Version", React.version);
console.log("ReactDOM Version", ReactDOM.version);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
