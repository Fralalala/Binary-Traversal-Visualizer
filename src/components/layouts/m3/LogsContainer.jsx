import React from "react";

const LogsContainer = () => {
  return (
    <div className="logsContainer">
      <h4>Legend</h4> <br />
      <div className="items">
        <div className="legendItem">
          <span className="dot visited"></span>
          <p>Visited Node</p>
        </div>
        
        <div className="legendItem">
          <span className="dot printed"></span>
          <p>Printed Node</p>
        </div>
        
        <div className="legendItem">
          <span className="dot node"></span>
          <p>Node Itself</p>
        </div>
        
        <div className="legendItem">
          <span className="dot traverser"></span>
          <p>Node Traverser</p>
        </div>
        
        <div className="legendItem">
          <span className="dot newNode"></span>
          <p>New Node</p>
        </div>
      </div>
    </div>
  );
};

export default LogsContainer;
