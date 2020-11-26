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

  let isAnimating = false;

  const setup = (p5, canvasParentRef) => {
    if (window.innerWidth < 1450) {
      p5.createCanvas(window.innerWidth - 58, 762).parent(canvasParentRef);
    } else {
      p5.createCanvas(window.innerWidth * 0.75, 762).parent(canvasParentRef);
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
  };

  //I havent found a way to connect use a p5.redraw() on a different jsx to this jsx
  const mp = async (p5) => {
    console.log(animation);
    console.log("______________________");
    console.log(isAnimating);

    if (rootNode !== null  && !isAnimating) {
      console.log("reseting");
      await resetIsVisited(rootNode);
      p5.redraw();
    }

    if (animation && !isAnimating) {
        isAnimating = true;
        //Animation will start
        await setTraversal(visualizer, p5, rootNode, null);
        setAnimation(false);
        isAnimating = false;

    } else {
    }


    // if (gntBtn === true) {

    //   if (rootNode !== null && rootNode.isVisited === true && !animation) {
    // console.log("reseting");
    // await resetIsVisited(rootNode);
    //     console.log(rootNode)
    //     setAnimation(false)
    //     p5.redraw();
    //     await setAnimation(initialAnimation)
    //   }

    //   if (animation ) {
    //     await setAnimation(false)
    //     console.log(animation)
    //     await setTraversal(visualizer, p5, rootNode, null);
    //     await setAnimation(false);
    //   } else {
    //     // p5.redraw();
    //     gntBtnClicked(false); // turns to false, supposedly. this just inverts, not anymore
    //   }
    // }

    // if (rootNode !== null && rootNode.isVisited === true && !myAnimation) {
    //   console.log("reseting");
    //   // console.log(animation);
    //   resetIsVisited(rootNode);
    //   p5.redraw();
    // }
  };

  const windowResized = (p5) => {
    if (window.innerWidth < 1450) {
      p5.resizeCanvas(window.innerWidth - 58, 762);
    } else {
      p5.resizeCanvas(window.innerWidth * 0.75, 762);
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
        keyPressed={(p5) => {
          if (p5.keyCode == "13") {
            p5.redraw();
          }
        }}
      />
    </div>
  );
};

export default NodeContainer;
