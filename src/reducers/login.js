import {LOGINED, LOGOUT} from "../actions";

function login(state = [], action) {
  switch (action.type) {
    case LOGINED :
      localStorage.isLogin = true;
      return Object.assign({}, state, {
        isLogin: true,
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

export default login;
