import React, {useContext} from "react";
import Logs from "../layouts/m3/LogsContainer";
import Node from "../layouts/m2/NodeContainer";
import Stack from "../layouts/StackContainer";
import Tools from "../layouts/m3/ToolsContainer";
import VisualizerContext from "../../context/visualizer/visualizerContext"

const Home = () => {

  const visualizerContext = useContext(VisualizerContext)

  const {rootNode} = visualizerContext; 

  console.log(rootNode)

  return (
    <div className="home-container" >
      <ul>
        <li className="m-1">
          <Stack />
        </li>
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
