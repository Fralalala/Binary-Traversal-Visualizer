import React, { useReducer, useRef } from "react";
import VisualizerReducer from "./visualizerReducer";
import VisualizerContext from "./visualizerContext";
import { GENERATE_NODE_TREE, SET_SPACING, GNT_BTN_CLICKED } from "../types";
import Sketch from "react-p5";

import Node from "../../Node";

const VisualizerState = (props) => {
  const initialState = {
    rootNode: new Node(100),
    maxHeight: 5,
    spacing: 1,
    tempArray: [1, 2, 3],
    gntBtn: false,
  };

  let dependentSpacing = 18;
  let fixedVertical = 125 ;
  const radius = 60;
  const rootRad = 100

  const [state, dispatch] = useReducer(VisualizerReducer, initialState);

  const generateNodeTree = (node, height = 1) => {
    if (height === state.maxHeight) {
      return new Node(5);
    }

    node.left = generateNodeTree(new Node(111), (height += 1));
    node.right = generateNodeTree(new Node(222), height);

    return height === 1 ? new Node(888) : node;
  };

  const gntBtnClicked = () => {
    dispatch({
      type: GNT_BTN_CLICKED,
      payload: !state.gntBtn,
    });
  };

  const setNodeTree = (p5) => {
    let myNode = new Node(666);

    const newNode = generateNodeTree(myNode);

    dispatch({
      type: GENERATE_NODE_TREE,
      payload: newNode,
    });

    console.log(state.rootNode);
  };

  const setSpacing = () => {
    let temp = 1;

    for (let x = 1; x < state.maxHeight; x++) {
      temp *= 2;
    }

    dispatch({
      type: SET_SPACING,
      payload: temp,
    });
  };

  const inorderTraversal = (node) => {
    if (node.left !== null) {
      inorderTraversal(node.left);
    }

    console.log(node.value);

    if (node.right !== null) {
      inorderTraversal(node.right);
    }
  };

  const preorderTraversal = (
    node,
    p5,
    isRight,
    currHeight = 1,
    lnw = 0,
    lnh = 0
  ) => {
    p5.textAlign(p5.CENTER, p5.CENTER)
    if (currHeight === 1) {
      lnw = p5.width / 2;
      lnh = 50;

      p5.fill(255, 204, 0);
      p5.circle(lnw, lnh, rootRad);

      p5.fill(p5.color(255, 255, 255));
      p5.textSize(30);
      p5.text(node.value, lnw, lnh);
    } else {
      lnw += isRight
        ? dependentSpacing * setNodeSpacing(currHeight)
        : -dependentSpacing * setNodeSpacing(currHeight);

      // console.log(currHeight);
      p5.fill(255, 204, 0);
      p5.circle(lnw, (lnh += fixedVertical), radius);

      
      p5.fill(p5.color(255, 255, 255));
      p5.textSize(30);
      p5.text(node.value, lnw, lnh );
    }

    if (node.left !== null) {
      preorderTraversal(node.left, p5, false, (currHeight += 1), lnw, lnh);
    }

    if (node.right !== null) {
      preorderTraversal(node.right, p5, true, currHeight, lnw, lnh);
    }
  };

  const setNodeSpacing = (currHeight) => {
    currHeight -= 2;

    if (currHeight < 0) return null; //this should be unreachable

    let maxHeightValue = 1 << (state.maxHeight - 1);

    for (let x = 0; x < currHeight; x++) {
      maxHeightValue /= 2;
    }

    return maxHeightValue; //this is the multiplier for the node spacing
  };

  return (
    <VisualizerContext.Provider
      value={{
        rootNode: state.rootNode,
        spacing: state.spacing,
        tempArray: state.tempArray,
        gntBtn: state.gntBtn,
        setNodeTree,
        setSpacing,
        inorderTraversal,
        setNodeSpacing,
        preorderTraversal,
        gntBtnClicked,
      }}
    >
      {props.children}
    </VisualizerContext.Provider>
  );
};

export default VisualizerState;
