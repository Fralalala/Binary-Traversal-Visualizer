import React, { useContext } from "react";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import Sketch from "react-p5";

const NodeContainer = () => {
  const visualizerContext = useContext(VisualizerContext);
  const { rootNode, preorderTraversal, gntBtn, gntBtnClicked } = visualizerContext;

  // let y = 0;
  // let direction = "^";

  

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1275,945).parent(canvasParentRef);
  console.log('setup')
    p5.background(0); // serts bg to black so set this before instantiating
    p5.noLoop()
  };



  const draw = (p5) => {
    p5.background(0); // serts bg to black so set this before instantiating
    p5.fill(255, 204, 0);

    console.log("NodeContainer Draw Func Log")

    preorderTraversal(rootNode, p5, null);
  };

  //I havent found a way to connect use a p5.redraw() on a different jsx to this jsx
  const mp = (p5) => {

    console.log(gntBtn)

    if(gntBtn === true) {

      p5.redraw()

      gntBtnClicked() // turns to false, supposedly
    }
  } 

  return (
    <div className="nodeContainer">
      {/* {tempArray.map((value) => (

      ))} */}
      <Sketch setup={setup} draw={draw} mouseClicked={mp}  />
    </div>
  );
};

export default NodeContainer;
