import {OPENDRAWER, CLOSERAWER, SHOW_SNACKBAR} from "../actions";

export function openDrawer(state = [], action) {
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

export function showSnackbar(state = [], action) {
  switch (action.type) {
    case SHOW_SNACKBAR :
      return {...state, isShowSnackbar: !state.isShowSnackbar, message: action.message};
    default:
      return state;
  }
}