import {
  GENERATE_NODE_TREE,
  GNT_BTN_CLICKED,
  SET_KH,
  SET_ROOT_NODE,
  SET_ADD_VALUE,
  SET_DEL_VALUE,
  SET_MAX_HEIGHT,
  SET_INORDER_ANIMATION,
  SET_COX,
  SET_COY
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
    
    case SET_INORDER_ANIMATION:
      return {
        ...state,
        inorderAnimation: action.payload
      }

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
        coy: action.payload
      }
    
      case SET_COX:
        return {
          ...state,
          cox: action.payload
        }

    default:
      return state;
  }
};
