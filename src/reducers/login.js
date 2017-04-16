import {LOGINED, LOGOUT} from "../actions";

function login(state = [], action) {
  switch (action.type) {
    case LOGINED :
      return Object.assign({}, state, {
        isLogin: true,
      });
    case LOGOUT :
      return Object.assign({}, state, {
        isLogin: false,
      });
    default:
      return state;
  }
}

export default login;
