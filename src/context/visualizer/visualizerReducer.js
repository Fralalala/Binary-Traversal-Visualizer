import {
  GENERATE_NODE_TREE,
  GNT_BTN_CLICKED,
  SET_KH,
  SET_ROOT_NODE,
  SET_ADD_VALUE,
  SET_DEL_VALUE,
  SET_MAX_HEIGHT,
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

    default:
      return state;
  }
};
