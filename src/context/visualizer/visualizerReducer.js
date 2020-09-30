import { GENERATE_NODE_TREE ,SET_SPACING} from "../types";

export default (state, action) => {
  switch (action) {
    case GENERATE_NODE_TREE:
      return {
        ...state,
        rootNode: action.payload,
      };

    case SET_SPACING:
      return {
        ...state,
        maxHeight: action.payload
      }

    default:
      return state;
  }
};
