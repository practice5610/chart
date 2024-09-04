import React from "react"; // Add this import
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Link to="/chart">Go to Chart</Link>
    </div>
  );
}

export default App;
