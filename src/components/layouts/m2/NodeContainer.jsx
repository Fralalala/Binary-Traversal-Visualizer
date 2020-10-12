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
    animation,
    setAnimation,
    setTraversal,
    resetIsVisited,
    visualizer,
    cancel,
    setBaseHeight,
    setBaseWidth,
    changeValues,
  } = visualizerContext;


  let tempBool = false;

  const setup = (p5, canvasParentRef) => {
    if (window.innerWidth < 1450) {
      p5.createCanvas(window.innerWidth - 58, 762).parent(
        canvasParentRef
      );
    } else {
      p5.createCanvas(
        window.innerWidth * 0.75,762
      ).parent(canvasParentRef);
    }
    p5.background(0); // serts bg to black so set this before instantiating
    p5.noLoop();

    setBaseHeight(981);
    setBaseWidth(1440);
  };

  const draw = (p5) => {
    if (!animation) {
      p5.background(185); // serts bg to black so set this before instantiating
      p5.fill(255, 204, 0);

      if (rootNode !== null) {
        visualizeNodes(rootNode, p5, null);
      }
    }
    // else {
    //   console.log("asdasdasd");
    //   p5.fill("red");
    //   p5.circle(initx + cox, inity + coy, 60);
    // }
  };

  //I havent found a way to connect use a p5.redraw() on a different jsx to this jsx
  const mp = async (p5) => {
    if (gntBtn === true) {
      if (animation && !tempBool) {
        tempBool = true;
        console.log(visualizer);
        await setTraversal(visualizer, p5, rootNode, null);
        setAnimation(false);
        tempBool = false;
      } else {
        p5.redraw();
        gntBtnClicked(); // turns to false, supposedly. this just inverts
      }
    }
    if (
      rootNode !== null &&
      rootNode.isVisited === true &&
      !animation &&
      cancel
    ) {
      console.log("reseting");
      console.log(animation);
      resetIsVisited(rootNode);
    }
  };

  const windowResized = (p5) => {
    if (window.innerWidth < 1450) {
      p5.resizeCanvas(window.innerWidth - 58,762);
    } else {
      p5.resizeCanvas(window.innerWidth * 0.75,762);
    }
    changeValues();
    p5.redraw();
  };

  return (
    <div className="nodeContainer">
      <Sketch
        setup={setup}
        draw={draw}
        mouseClicked={mp}
        windowResized={windowResized}
      />
    </div>
  );
};

export default NodeContainer;
