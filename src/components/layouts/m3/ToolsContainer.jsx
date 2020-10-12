import React, { useContext } from "react";
// import Scroller from "./Scroller";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import VisualizerContext from "../../../context/visualizer/visualizerContext";
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const ToolsContainer = () => {
  const visualizerContext = useContext(VisualizerContext);

  const {
    gntBtnClicked,
    setNode,
    rootNode,
    addValue,
    setAddValue,
    deleteNode,
    delValue,
    setDelValue,
    setAnimation,
    setVisualizer,
    animation,
  } = visualizerContext;

  const options = [
    "Inorder Traversal",
    "Preorder Traversal",
    "Postorder Traversal",
  ];

  //code copied form  from material ui

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    console.log(index);
    await setSelectedIndex(index);
    console.log(selectedIndex);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="toolsContainer">
      {/* <div className="scrollerContainer">
        <Scroller />
      </div> */}
      <div className="toolBtns">
        <div className="dropdown">
          <div className={classes.root}>
            <List component="nav">
              <ListItem
                button
                aria-label="when device is locked"
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary="Choose a Traversal"
                  secondary={options[selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => {
                    handleMenuItemClick(event, index);
                    console.log(index);
                    setVisualizer(index);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <Tooltip title="Play Traversal">
          <Button
            variant="contained"
            onClick={() => {
              if(rootNode !== null ) {

                gntBtnClicked();

                setAnimation(true);
              } else {
                alert('Please add a node')
              }
            }}
          >
            <PlayCircleFilledIcon style={{ fontSize: 20 }} />
          </Button>
        </Tooltip>
        <Tooltip title="Reset Binary Tree">
          <Button
            variant="contained"
            onClick={ () => {
              console.log(animation);
              if (!animation) {
                // gntBtn();
                 deleteNode(rootNode.value);

                gntBtnClicked();
              } else {
                alert(
                  "cant reset binary tree during traversal, please wait for traversal to finish"
                );
              }
            }}
          >
            <RotateLeftIcon style={{ fontSize: 20 }} />
          </Button>
        </Tooltip>
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
            if (!animation) {
              setNode(rootNode, addValue);
              gntBtnClicked();
            } else {
              alert("animation is ongoing");
            }
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
            if (!animation) {
              deleteNode(delValue);
              gntBtnClicked();
            } else {
              alert("animation is ongoing");
            }
          }}
        >
          <DeleteIcon id="delIcon" />
        </Button>
      </div>
    </div>
  );
};

export default ToolsContainer;
