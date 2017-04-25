import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import login from "./login";
import course from "./course";
import entry from "./entry";
import block from "./block";
import user from "./user";
import section from "./section";
import * as others from "./others";

const rootReducer = combineReducers({login, course, entry, block, user, section, ...others, routing: routerReducer});

export default rootReducer;
