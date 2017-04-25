import {GETBLOCKS, EDITBLOCK} from "../actions";

function block(state = [], action) {
  switch (action.type) {
    case GETBLOCKS :
      return Object.assign({}, state, {
        blocks: action.blocks,
      });
    case EDITBLOCK :
      return Object.assign({}, state, {
        edit_block: action.block,
      });
    default:
      return state;
  }
}

export default block;