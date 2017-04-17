import {OPENDRAWER} from "../actions";

function others(state = [], action) {
  switch (action.type) {
    case OPENDRAWER :
      return Object.assign({}, state, {
        isOpendrawer: !state.isOpendrawer,
      });
    default:
      return state;
  }
}

export default others;
