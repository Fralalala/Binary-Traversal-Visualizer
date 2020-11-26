import {
  GENERATE_NODE_TREE,
  GNT_BTN_CLICKED,
  SET_KH,
  SET_ROOT_NODE,
  SET_ADD_VALUE,
  SET_DEL_VALUE,
  SET_MAX_HEIGHT,
  SET_COX,
  SET_COY,
  SET_ANIMATION,
  SET_CANCEL,
  SET_VISUALIZER,
  SET_BASE_HEIGHT,
  SET_BASE_WIDTH,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GENERATE_NODE_TREE:
    case SET_ROOT_NODE:
      return {
        ...state,
        rootNode: action.payload,
      };

    case SET_MAX_HEIGHT:
      return {
        ...state,
        maxHeight: action.payload,
      };

    case SET_ADD_VALUE:
      return {
        ...state,
        addValue: action.payload,
      };

    case SET_DEL_VALUE:
      return {
        ...state,
        delValue: action.payload,
      };

    case SET_ANIMATION:
      return {
        ...state,
        animation: action.payload,
      };

    case SET_VISUALIZER:
      return {
        ...state,
        visualizer: action.payload,
      };

    case SET_CANCEL:
      return {
        ...state,
        cancel: action.payload,
      };

    case SET_BASE_HEIGHT:
      return {
        ...state,
        baseHeight: action.payload,
      };

    case SET_BASE_WIDTH:
      return {
        ...state,
        baseWidth: action.payload,
      };

    case GNT_BTN_CLICKED:
      return {
        ...state,
        gntBtn: action.payload,
      };

    case SET_KH:
      return {
        ...state,
        kh: 666,
      };

    case SET_COY:
      return {
        ...state,
        coy: action.payload,
      };

    case SET_COX:
      return {
        ...state,
        cox: action.payload,
      };

    default:
      return state;
  }
};
