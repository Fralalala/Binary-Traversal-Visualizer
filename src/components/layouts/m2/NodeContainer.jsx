import React, { useContext } from "react";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import Sketch from "react-p5";

const NodeContainer = () => {
  const visualizerContext = useContext(VisualizerContext);
  const {
    rootNode,
    preorderTraversal,
    gntBtn,
    gntBtnClicked,
  } = visualizerContext;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1281, 733).parent(canvasParentRef);
    p5.background(0); // serts bg to black so set this before instantiating
    p5.noLoop();
  };

  const draw = (p5) => {
    p5.background(0); // serts bg to black so set this before instantiating
    p5.fill(255, 204, 0);

    if (rootNode !== null) preorderTraversal(rootNode, p5, null);
  };

  //I havent found a way to connect use a p5.redraw() on a different jsx to this jsx
  const mp = (p5) => {
    if (gntBtn === true) {
      p5.redraw();
      gntBtnClicked(); // turns to false, supposedly. this just inverts
    }

    // console.log(rootNode)
  };

  return (
    <div className="nodeContainer">
      <Sketch setup={setup} draw={draw} mouseClicked={mp} />
    </div>
  );
};

export default NodeContainer;
