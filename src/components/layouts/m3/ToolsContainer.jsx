import React,{useContext} from "react";
import Scroller from "./Scroller";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import VisualizerContext from '../../../context/visualizer/visualizerContext'

const ToolsContainer = () => {

  const visualizerContext = useContext(VisualizerContext)

  const {setNodeTree} = visualizerContext

  return (
    <div className="toolsContainer">
      <Scroller />
      <div className="toolBtns">
        <IconButton  >
          <PlayCircleFilledIcon style={{ fontSize: 50 }} />
        </IconButton>
        <IconButton onClick={setNodeTree} >
          <RotateLeftIcon style={{ fontSize: 50 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ToolsContainer;
