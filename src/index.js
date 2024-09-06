import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Chart from "./components/TVChartContainer";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
