import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import login from "./login";
import course from "./course";
import section from "./section";
import * as others from "./others";

const rootReducer = combineReducers({login, course, section, ...others, routing: routerReducer});

export default rootReducer;
