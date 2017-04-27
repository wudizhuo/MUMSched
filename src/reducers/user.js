import {GETUSERS, EDITUSER} from "../actions";

export function user(state = [], action) {
  switch (action.type) {
    case GETUSERS :
      return Object.assign({}, state, {
        users: action.users,
      });
    case EDITUSER :
      return Object.assign({}, state, {
        edit_user: action.user,
      });
    default:
      return state;
  }
}