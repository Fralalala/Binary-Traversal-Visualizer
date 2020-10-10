import React, { useContext } from "react";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import Sketch from "react-p5";

const NodeContainer = () => {
  const visualizerContext = useContext(VisualizerContext);
  const {
    rootNode,
    visualizeNodes,
    gntBtn,
    gntBtnClicked,
    inorderAnimation,
    setInorderAnimation,
    setInorderVisual,
    resetIsVisited,
    cox,
    coy,
  } = visualizerContext;

  let initx = 0;
  let inity = 0;
  
  let tempBool = false;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1281, 733).parent(canvasParentRef);
    p5.background(0); // serts bg to black so set this before instantiating
    p5.noLoop();

    initx = p5.width / 2 - 30;
    inity = 50;
  };

  const draw = (p5) => {
    if (!inorderAnimation) {
      p5.background(185); // serts bg to black so set this before instantiating
      p5.fill(255, 204, 0);

      if (rootNode !== null) {
        visualizeNodes(rootNode, p5, null);
      }
      console.log("zzxczxczxczxc");
    } else {
      // moving animation
      // p5.background(185);

      // if (rootNode !== null) {
      //   visualizeNodes(rootNode, p5, null);
      //   console.log(rootNode);
      // }
      console.log("asdasdasd");
      p5.fill("red");
      p5.circle(initx + cox, inity + coy, 60);
    }
  };


  //I havent found a way to connect use a p5.redraw() on a different jsx to this jsx
  const mp = (p5) => {
    if (rootNode !== null && rootNode.isVisited === true && !inorderAnimation) {
      console.log("reseting");
      resetIsVisited(rootNode);
    }

    if (gntBtn === true) {
      if (inorderAnimation && !tempBool) {
        tempBool = true
        setInorderVisual(p5, rootNode, null);
        setInorderAnimation(false);
        tempBool = false
      } else {
        p5.redraw();
        gntBtnClicked(); // turns to false, supposedly. this just inverts
      }
    }
  };

  return (
    <div className="nodeContainer">
      <Sketch setup={setup} draw={draw} mouseClicked={mp} />
    </div>
  );
};

export default NodeContainer;
