import React, { useContext } from "react";
import Scroller from "./Scroller";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const ToolsContainer = () => {
  const visualizerContext = useContext(VisualizerContext);

  const {
    setNodeTree,
    gntBtnClicked,
    setNode,
    rootNode,
    addValue,
    setAddValue,
    deleteNode,
    delValue,
    setDelValue,
    maxHeight,
    visualizeInorderTraversal,
    setInorderAnimation,
  } = visualizerContext;

  const gntBtn = () => {
    setNodeTree(); //just sets up a node tree
    gntBtnClicked();
  };

  return (
    <div className="toolsContainer">
      <div className="scrollerContainer">
        <Scroller />
      </div>
      <div className="toolBtns">
        <Button
          variant="contained"
          onClick={() => {
            gntBtnClicked();
            setInorderAnimation(true);
          }}
        >
          <PlayCircleFilledIcon style={{ fontSize: 50 }} />
        </Button>
        <Button variant="contained" onClick={gntBtn}>
          <RotateLeftIcon style={{ fontSize: 50 }} />
        </Button>
      </div>
      <div className="addAndDelete">
        <div className="addFieldContainer textContainer child">
          <TextField
            id="standard-number"
            label="Add Number"
            type="number"
            value={addValue}
            onChange={(e) => {
              setAddValue(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          id="addBtn"
          className="child"
          onClick={() => {
            setNode(rootNode, addValue);
            gntBtnClicked();
          }}
        >
          <AddBoxIcon />
        </Button>

        <div className="addFieldContainer textContainer child">
          <TextField
            id="standard-number"
            label="Delete Number"
            type="number"
            value={delValue}
            onChange={(e) => {
              setDelValue(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          id="delBtn"
          className="child"
          onClick={() => {
            deleteNode(delValue);
            gntBtnClicked();
          }}
        >
          <DeleteIcon id="delIcon" />
        </Button>
      </div>
    </div>
  );
};

export default ToolsContainer;
