import {createStore, compose} from "redux";
import rootReducer from "./reducers/index";

const defaultState = {
  login: {
    isLogin: false,
  },
  others: {
    isOpendrawer: false,
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