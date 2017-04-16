import React from "react";
import {render} from "react-dom";
import App from "./App";
import "./style/home.scss";
import "./style/main.scss";
import injectTapEventPlugin from "react-tap-event-plugin";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import Dashboard from "./pages/Dashboard";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import store from "./store";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/create_course" component={CreateCourse}/>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
