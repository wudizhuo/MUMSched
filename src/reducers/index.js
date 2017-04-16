import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import isLogin from "./login";

const rootReducer = combineReducers({isLogin, routing: routerReducer});

export default rootReducer;
