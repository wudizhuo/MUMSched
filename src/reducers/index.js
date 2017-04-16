import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import isLogin from "./login";
import course from "./course";

const rootReducer = combineReducers({isLogin, course, routing: routerReducer});

export default rootReducer;
