import React from "react";
import ReactDOM from "react-dom/client"; // Import the new createRoot API
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Chart from "./components/TVChartContainer";

// Create root and use the new render method
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
