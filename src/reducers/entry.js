import {GETENTRIES, EDITENTRY} from "../actions";

export function entry(state = [], action) {
  switch (action.type) {
    case GETENTRIES :
      return Object.assign({}, state, {
        entries: action.entry,
      });
    case EDITENTRY :
      return Object.assign({}, state, {
        edit_entry: action.entry,
      });
    default:
      return state;
  }
}