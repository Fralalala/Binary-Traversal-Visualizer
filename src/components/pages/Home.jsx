import React from "react";
import Logs from "../layouts/m3/LogsContainer";
import Node from "../layouts/m2/NodeContainer";
import Tools from "../layouts/m3/ToolsContainer";

const Home = () => {

  return (
    <div className="home-container" >
      <ul>
        <li className="m-2">
          <Node />
        </li> 
        <li className="m-3">
            <Tools />
            <Logs />
        </li>
      </ul>
    </div>
  );
};

export default Home;
