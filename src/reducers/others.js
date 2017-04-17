import {OPENDRAWER,CLOSERAWER} from "../actions";

function others(state = [], action) {
  switch (action.type) {
    case OPENDRAWER :
      return Object.assign({}, state, {
        isOpendrawer: !state.isOpendrawer,
      });
    case CLOSERAWER :
      return Object.assign({}, state, {
        isOpendrawer: false,
      });
    default:
      return state;
  }
}

export default others;
