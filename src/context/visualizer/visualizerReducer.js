import { GENERATE_NODE_TREE ,SET_SPACING, GNT_BTN_CLICKED} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GENERATE_NODE_TREE:

    console.log("reducer gen node tree")
      return {
        ...state,
        rootNode: action.payload,
      };

    case SET_SPACING:
      return {
        ...state,
        maxHeight: action.payload
      }
    
    case GNT_BTN_CLICKED:
      return {
        ...state,
        gntBtn: action.payload
      }

    default:
      return state;
  }
};
