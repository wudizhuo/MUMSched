import {createStore, compose} from "redux";
import {role} from "./Const";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import * as reducers from './reducers'

const rootReducer = combineReducers({...reducers, routing: routerReducer});

const defaultState = {
  login: {
    isLogin: (localStorage.isLogin == 'true'),
    role: role.Admin,
  },
  openDrawer: {
    isOpendrawer: false
  },
  showSnackbar: {
    message: '',
    isShowSnackbar: false
  },
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);

// export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;