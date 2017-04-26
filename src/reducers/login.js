import {LOGINED, LOGOUT} from "../actions";

export function login(state = [], action) {
  switch (action.type) {
    case LOGINED :
      localStorage.isLogin = true;
      return Object.assign({}, state, {
        isLogin: true,
        user: action.user,
        role: action.role,
      });
    case LOGOUT :
      localStorage.isLogin = false;
      return Object.assign({}, state, {
        isLogin: false,
      });
    default:
      return state;
  }
}