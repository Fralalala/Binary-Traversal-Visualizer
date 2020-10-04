import React, { useContext } from "react";
import Scroller from "./Scroller";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import Sketch from "react-p5";

const ToolsContainer = () => {
  const visualizerContext = useContext(VisualizerContext);

  const { setNodeTree , gntBtnClicked } = visualizerContext;

  const gntBtn = () => {
    setNodeTree()
    gntBtnClicked()
  }

  return (
    <div className="toolsContainer">
      <Scroller />
      <div className="toolBtns">
        <IconButton>
          <PlayCircleFilledIcon style={{ fontSize: 50 }} />
        </IconButton>
        <IconButton onClick={gntBtn} >
          <RotateLeftIcon style={{ fontSize: 50 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ToolsContainer;
