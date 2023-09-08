import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <RoutesConfig /> 
      </Router>
    </div>
  );
}

export default App;
