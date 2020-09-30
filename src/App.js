import React from "react";
import Home from "./components/pages/Home";
import Navbar from "./components/layouts/Navbar";

import VisualizerState from "./context/visualizer/VisualizerState";

import "./App.scss";

function App() {
  return (
    <VisualizerState>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </VisualizerState>
  );
}

export default App;
