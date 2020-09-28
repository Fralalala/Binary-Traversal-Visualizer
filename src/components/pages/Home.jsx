import React from "react";
import Logs from "../layouts/LogsContainer";
import Node from "../layouts/NodeContainer";
import Stack from "../layouts/StackContainer";
import Tools from "../layouts/ToolsContainer";

const Home = () => {
  return (
    <div className="home" >
      <ul>
        <li className="m-1">
          <Stack />
        </li>
        <li className="m-2">
          <Node />
        </li>
        <li className="m-3">
          <div>
            <Tools />
            <Logs />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
