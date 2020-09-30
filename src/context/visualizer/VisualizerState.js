import React, { useReducer } from "react";
import VisualizerReducer from "./visualizerReducer";
import VisualizerContext from "./visualizerContext";
import { GENERATE_NODE_TREE, SET_SPACING } from "../types";

import Node from "../../Node";

const VisualizerState = (props) => {
  const initialState = {
    rootNode: new Node(100),
    maxHeight: 3,
    spacing: 1
  };

  const [state, dispatch] = useReducer(VisualizerReducer, initialState);

  const generateNodeTree = (node, height = 1) => {
  
    if (height === state.maxHeight) {
      return new Node(5);
    }

    node.left = generateNodeTree(new Node(111), (height += 1));
    node.right = generateNodeTree(new Node(222), height);

    return height === 1 ? new Node(888) : node;
  };

  const setNodeTree = () => {
    let myNode = new Node(666);

    const newNode = generateNodeTree(myNode);

    dispatch({
      type: GENERATE_NODE_TREE,
      payload: newNode,
    });

  };

  const setSpacing = () => {
    let temp = 1;

    for(let x = 1; x < state.maxHeight ; x++) {
      temp*=2
    }

    dispatch({
      type: SET_SPACING,
      payload: temp
    })
  }

  return (
    <VisualizerContext.Provider
      value={{
        rootNode: state.rootNode,
        spacing: state.spacing,
        setNodeTree,
        setSpacing
      }}
    >
      {props.children}
    </VisualizerContext.Provider>
  );
};

export default VisualizerState;
