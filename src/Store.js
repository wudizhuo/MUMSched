import {createStore, compose} from "redux";
import rootReducer from "./reducers/index";
import {role} from "./Const";

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