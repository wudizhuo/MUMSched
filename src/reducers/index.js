import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import login from "./login";
import course from "./course";

const rootReducer = combineReducers({login, course, routing: routerReducer});

export default rootReducer;
