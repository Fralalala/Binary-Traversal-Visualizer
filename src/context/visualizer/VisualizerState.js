import React, { useReducer } from "react";
import VisualizerReducer from "./visualizerReducer";
import VisualizerContext from "./visualizerContext";
import {
  GENERATE_NODE_TREE,
  GNT_BTN_CLICKED,
  SET_KH,
  SET_ROOT_NODE,
  SET_ADD_VALUE,
  SET_MAX_HEIGHT,
  SET_DEL_VALUE,
  SET_ANIMATION,
  SET_COX,
  SET_COY,
  SET_VISUALIZER,
  SET_CANCEL,
  SET_BASE_HEIGHT,
  SET_BASE_WIDTH,
} from "../types";

import Node from "../../Node";

const VisualizerState = (props) => {
  const initialState = {
    rootNode: null,
    maxHeight: null, //5
    spacing: 1,
    tempVal: 0,
    gntBtn: false,
    kh: 1,
    addValue: 0,
    delValue: 0,
    coy: 0,
    cox: 0,
    animation: false,
    cancel: true,
    visualizer: 0,
    baseHeight: 0,
    baseWidth: 0,
  };
  //#region
  let dependentSpacing = 15;
  let fixedVertical = 125;
  let radius = 50;
  let rootRad = 80;
  let textSize = 25;
  let tempVal = 0;
  //#endregion
  const [state, dispatch] = useReducer(VisualizerReducer, initialState);

  const changeValues = () => {

    let wid = Math.min((window.innerWidth + (.25 * state.baseWidth)), state.baseWidth)
    let hei = Math.min((window.innerHeight + (.25 * state.baseHeight)), state.baseHeight)
    if (state.baseWidth < window.innerWidth) {
      setBaseWidth(window.innerWidth);
    }
    if (state.baseHeight < window.innerHeight) {
      setBaseHeight(window.innerHeight);
    }
    dependentSpacing = (window.innerWidth / state.baseWidth) * 15;
    fixedVertical = (hei / state.baseHeight) * 125;
    radius = (wid / state.baseWidth) * 50;
    textSize = (wid / state.baseWidth) * 25;
    rootRad = (wid / state.baseWidth) * 85;
  };

  const generateNodeTree = (node, height = 1) => {
    if (height === state.maxHeight) {
      return new Node(5);
    }

    node.left = generateNodeTree(new Node(111), (height += 1));
    node.right = generateNodeTree(new Node(222), height);

    return height === 1 ? new Node(888) : node;
  };

  const gntBtnClicked = (bool) => {
    console.log('this happened')
    dispatch({
      type: GNT_BTN_CLICKED,
      payload: bool,
    });
  };

  const setNodeTree = async (p5) => {
    let myNode = new Node(666);

    const newNode = generateNodeTree(myNode);

    dispatch({
      type: GENERATE_NODE_TREE,
      payload: newNode,
    });
  };

  const checkHeight = (node, height) => {
    console.log(node.value);
    if (node.left === null && node.right === null) {
      console.log(height);
      if (height > tempVal) {
        tempVal = height;
      }
    } else {
      if (node.left !== null) {
        checkHeight(node.left, height + 1);
      }
      if (node.right !== null) {
        checkHeight(node.right, height + 1);
      }
    }
  };

  //WIL : when using state values for comparison in a recursion and those state values need to be changed  , do not
  //use dispatch, instead of using state, use a variable outside of state and use it for comparison. Because dispatch
  // is slow, usinga dispatch on a state, then using dispatch again for the next recursion would "nullify" the first dispatch.
  //thus making it seem like the first dispatch never happened. Only use dispatch as the final modification on the state
  const setHeightOnDelete = (node) => {
    tempVal = 0;
    checkHeight(node, 1);

    dispatch({
      type: SET_MAX_HEIGHT,
      payload: tempVal,
    });
  };

  //Deleting Nodes Traversal
  const inorderTraversal = (node, value, height) => {
    if (parseFloat(value) > parseFloat(node.value)) {
      //Go right
      if (node.right !== null) {
        if (parseFloat(node.right.value) === parseFloat(value)) {
          node.right = null;
          console.log("setting height");
          console.log(state.rootNode);
          setHeightOnDelete(state.rootNode);
        } else {
          inorderTraversal(node.right, value, height + 1);
        }
      } else {
        alert('Node to be Deleted not found')
        return null;
      }
    } else {
      //Go left
      if (node.left !== null) {
        if (parseFloat(value) === parseFloat(node.left.value)) {
          console.log("setting height on left");

          node.left = null;
          setHeightOnDelete(state.rootNode);
        } else {
          inorderTraversal(node.left, value, height + 1);
        }
      } else {
        alert('Node to be Deleted not found')
        return null;
      }
    }
  };

  const deleteNode = (value) => {
    if (parseFloat(state.rootNode.value) === parseFloat(value)) {
      dispatch({
        type: SET_ROOT_NODE,
        payload: null,
      });
    } else {
      let height = 2;
      inorderTraversal(state.rootNode, value, height);
    }
  };

  //Setting the visual nodes
  const visualizeNodes = (
    node,
    p5,
    isRight,
    currHeight = 1,
    lnw = 0,
    lnh = 0,
    lastNode = null
  ) => {
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(textSize);

    if (currHeight === 1) {
      lnw = p5.width / 2;
      lnh = 50;

      node.x = lnw;
      node.y = lnh;

      if (state.inorderAnimation) {
        setVisitedNodeColor(node);
        node.isVisited = true;
      } else {
        p5.fill("#fca652");
      }
      p5.circle(lnw, lnh, rootRad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, lnw, lnh);
    } else {
      let v0 = p5.createVector(lnw, lnh); //initial vector

      p5.line(
        v0.x,
        v0.y,
        (v0.x += isRight
          ? dependentSpacing * setNodeSpacing(currHeight)
          : -dependentSpacing * setNodeSpacing(currHeight)),
        (v0.y += fixedVertical)
      );

      let rad = currHeight === 2 ? rootRad : radius;
      p5.fill(255, 204, 0);
      p5.circle(lnw, lnh, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(lastNode.value, lnw, lnh);

      lnw += isRight
        ? dependentSpacing * setNodeSpacing(currHeight)
        : -dependentSpacing * setNodeSpacing(currHeight);

      lnh += fixedVertical;

      node.x = lnw;
      node.y = lnh;

      setNewNodeColor(p5, node);
      p5.circle(lnw, lnh, radius);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, lnw, lnh);
    }

    if (node.left !== null) {
      visualizeNodes(node.left, p5, false, currHeight + 1, lnw, lnh, node);
    }

    if (node.right !== null) {
      visualizeNodes(node.right, p5, true, currHeight + 1, lnw, lnh, node);
    }
  };

  const rateOfChange = (node, targetNode) => {
    let l = 0;
    let w = 0;

    l = node.x;
    w = targetNode.y;

    l *= l;
    w *= w;

    let td = Math.sqrt(l + w);

    let speed = td / 24;

    let tempx = targetNode.x - node.x;
    let tempy = targetNode.y - node.y;

    if (tempx > tempy) {
      tempx /= tempx;
      tempy /= tempx;
    } else {
      tempx /= tempy;
      tempy /= tempy;
    }

    tempx *= speed;
    tempy *= speed;

    dispatch({
      type: SET_COX,
      payload: tempx,
    });
    dispatch({
      type: SET_COY,
      payload: tempy,
    });
  };

  const visualizeInorderTraversal = async (p5, node, lastNode) => {
    let rad = node.value === state.rootNode.value ? rootRad : radius;
    p5.textSize(textSize);

    await sleep(750).then(() => {
      if (lastNode !== null) {
        p5.fill(lastNode.color);
        rad = lastNode.value === state.rootNode.value ? rootRad : radius;
        p5.circle(lastNode.x, lastNode.y, rad);
        p5.fill(p5.color(255, 255, 255));
        p5.text(lastNode.value, lastNode.x, lastNode.y);
      }

      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      rad = node.value === state.rootNode.value ? rootRad : radius;
      p5.circle(node.x, node.y, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);
    });

    if (node.left !== null) {
      await visualizeInorderTraversal(p5, node.left, node);
    }

    await sleep(750).then(() => {
      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      p5.circle(node.x, node.y, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);

      setTimeout(() => {
        setVisitedNodeColor(p5, node);
        p5.circle(node.x, node.y, rad);

        p5.fill(p5.color(255, 255, 255));
        p5.text(node.value, node.x, node.y);
      }, 750);

      console.log(`${node.value}`);
    });

    if (node.right !== null) {
      await visualizeInorderTraversal(p5, node.right, node);
    }
  };

  const visualizePreorderTraversal = async (p5, node, lastNode) => {
    let rad = node.value === state.rootNode.value ? rootRad : radius;

    await sleep(750).then(() => {
      if (lastNode !== null) {
        p5.fill(lastNode.color);
        rad = lastNode.value === state.rootNode.value ? rootRad : radius;
        p5.circle(lastNode.x, lastNode.y, rad);
        p5.fill(p5.color(255, 255, 255));
        p5.text(lastNode.value, lastNode.x, lastNode.y);
      }

      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      rad = node.value === state.rootNode.value ? rootRad : radius;
      p5.circle(node.x, node.y, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);
    });

    await sleep(750).then(() => {
      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      p5.circle(node.x, node.y, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);

      setTimeout(() => {
        setVisitedNodeColor(p5, node);
        p5.circle(node.x, node.y, rad);
        
      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      }, 750);

      console.log(`${node.value}`);
    });

    if (node.left !== null) {
      await visualizePreorderTraversal(p5, node.left, node);
    }

    if (node.right !== null) {
      await visualizePreorderTraversal(p5, node.right, node);
    }
  };

  const visualizePostordertraversal = async (p5, node, lastNode) => {
    let rad = node.value === state.rootNode.value ? rootRad : radius;

    await sleep(750).then(() => {
      if (lastNode !== null) {
        p5.fill(lastNode.color);
        rad = lastNode.value === state.rootNode.value ? rootRad : radius;
        p5.circle(lastNode.x, lastNode.y, rad);
        p5.fill(p5.color(255, 255, 255));
        p5.text(lastNode.value, lastNode.x, lastNode.y);
      }

      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      rad = node.value === state.rootNode.value ? rootRad : radius;
      p5.circle(node.x, node.y, rad);

      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);
    });

    if (node.left !== null) {
      await visualizePostordertraversal(p5, node.left, node);
    }

    if (node.right !== null) {
      await visualizePostordertraversal(p5, node.right, node);
    }

    await sleep(750).then(() => {
      setVisitedNodeColor(p5, node);
      node.isVisited = true;
      p5.circle(node.x, node.y, rad);
      
      p5.fill(p5.color(255, 255, 255));
      p5.text(node.value, node.x, node.y);

      p5.fill("#de4463");
      p5.circle(node.x, node.y + 10, 10);

      setTimeout(() => {
        setVisitedNodeColor(p5, node);
        p5.circle(node.x, node.y, rad);
        
        p5.fill(p5.color(255, 255, 255));
        p5.text(node.value, node.x, node.y);
      }, 750);

      console.log(`${node.value}`);
    });
  };

  const resetIsVisited = (node) => {
    node.isVisited = false;

    if (node.right !== null) resetIsVisited(node.right);

    if (node.left !== null) resetIsVisited(node.left);
  };

  const setTraversal = async (index, p5, node, lastNode) => {
    switch (index) {
      case 0:
        console.log("inorder");
        await visualizeInorderTraversal(p5, node, lastNode);
        break;

      case 1:
        console.log("preorder");

        await visualizePreorderTraversal(p5, node, lastNode);
        break;

      case 2:
        console.log("postorder");

        await visualizePostordertraversal(p5, node, lastNode);
        break;

      default:
        console.log(index);
        break;
    }
    setAnimation(false); //fix the mp during animation
  };

  const setHeight = (currHeight) => {
    const temp = currHeight;
    dispatch({
      type: SET_KH,
      payload: temp,
    });
  };

  //Polish: instead of using setNodeSpacing everytime you instance a circle, create a node.height . define the height on add,
  //height is basically the return value of setNodeSpacing. this is good so that u dont have to run this func everytime
  //you need to instance a circle // u need to run this func because the height changes so it needs to be checked ????
  const setNodeSpacing = (currHeight) => {
    currHeight -= 2;

    if (currHeight < 0) return null; //this should be unreachable because this func isnt called if currhiehgt is 1

    let maxHeightValue = 1 << (state.maxHeight - 1);

    for (let x = 0; x < currHeight; x++) {
      maxHeightValue /= 2;
    }

    return maxHeightValue; //this is the multiplier for the node spacing
  };

  //Adding Nodes Traversal
  //No usage of dispatch on creation of new nodes
  const addNode = (node, value, currHeight = 1) => {
    if (state.rootNode === null) {
      const newNode = new Node(value);
      dispatch({
        type: SET_ROOT_NODE,
        payload: newNode,
      });
      dispatch({
        type: SET_MAX_HEIGHT,
        payload: 1,
      });
    } else {
      if (parseFloat(value) === parseFloat(node.value)) {
        alert("value already in the tree");
        return null;
      } else {
        if (currHeight + 1 > 5) {
          alert("Height limit of up to 5 only");
          return null;
        }
      }
      if (parseFloat(value) > parseFloat(node.value)) {
        if (node.right !== null) {
          addNode(node.right, value, currHeight + 1);
        } else {
          node.right = new Node(value);
          if (currHeight + 1 > state.maxHeight)
            dispatch({ type: SET_MAX_HEIGHT, payload: currHeight + 1 });
        }
      } else {
        if (node.left !== null) {
          addNode(node.left, value, currHeight + 1);
        } else {
          node.left = new Node(value);
          if (currHeight + 1 > state.maxHeight)
            dispatch({ type: SET_MAX_HEIGHT, payload: currHeight + 1 });
        }
      }
    }
  };

  const setNode = (node, value) => {
    let tempNode = node;

    addNode(tempNode, value);
  };

  const setAddValue = (value) => {
    dispatch({
      type: SET_ADD_VALUE,
      payload: value,
    });
  };

  const setDelValue = (value) => {
    dispatch({
      type: SET_DEL_VALUE,
      payload: value,
    });
  };

  const setAnimation = (bool) => {
    dispatch({
      type: SET_ANIMATION,
      payload: bool,
    });
  };

  const setNewNodeColor = (p5, node) => {
    if (node.isNew) {
      p5.fill("#28df99");
      node.isNew = false;
    } else {
      p5.fill(255, 204, 0);
    }
  };

  const setVisitedNodeColor = (p5, node) => {
    if (!node.isVisited) {
      p5.fill("#3b6978");
      node.color = "#3b6978";
    } else {
      p5.fill("#a2d5f2");
      node.color = "#a2d5f2";
    }
  };

  const setCancel = (val) => {
    dispatch({
      type: SET_CANCEL,
      payload: val,
    });
  };

  const setBaseHeight = (val) => {
    dispatch({
      type: SET_BASE_HEIGHT,
      payload: val,
    });
  };

  const setBaseWidth = (val) => {
    dispatch({
      type: SET_BASE_WIDTH,
      payload: val,
    });
  };

  const setVisualizer = (index) => {
    dispatch({
      type: SET_VISUALIZER,
      payload: index,
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <VisualizerContext.Provider
      value={{
        rootNode: state.rootNode,
        spacing: state.spacing,
        tempVal: state.tempVal,
        gntBtn: state.gntBtn,
        kh: state.kh,
        addValue: state.addValue,
        delValue: state.delValue,
        maxHeight: state.maxHeight,
        animation: state.animation,
        visualizer: state.visualizer,
        coy: state.coy,
        cox: state.cox,
        cancel: state.cancel,
        setNodeTree,
        inorderTraversal,
        setNodeSpacing,
        visualizeNodes,
        gntBtnClicked,
        setHeight,
        setNode,
        deleteNode,
        setAddValue,
        setDelValue,
        setAnimation,
        visualizeInorderTraversal,
        setTraversal,
        resetIsVisited,
        rateOfChange,
        setVisualizer,
        setCancel,
        setBaseHeight,
        setBaseWidth,
        changeValues,
      }}
    >
      {props.children}
    </VisualizerContext.Provider>
  );
};

export default VisualizerState;
