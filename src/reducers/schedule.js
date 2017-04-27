import {DETAILSCHEDULE} from "../actions";

export function schedule(state = [], action) {
  switch (action.type) {
    case DETAILSCHEDULE :
      return {...state, detailschedule: action.schedule};
    default:
      return state;
  }
}