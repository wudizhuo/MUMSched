import React from "react";
import {render} from "react-dom";
import App from "./App";
import "./style/home.scss";
import "./style/main.scss";
import injectTapEventPlugin from "react-tap-event-plugin";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import EditCourses from "./pages/EditCourses";
import Sections from "./pages/Sections";
import CreateSection from "./pages/CreateSection";
import Entries from "./pages/Entries";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import FacultyProfile from "./pages/FacultyProfile";
import StudentProfile from "./pages/StudentProfile";
import Blocks from "./pages/Blocks";
import CreateBlock from "./pages/CreateBlock";
import EditBlock from "./pages/EditBlock";
import Schedules from "./pages/Schedules";
import DetailSched from "./pages/DetailSched";
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
        <Route path="/entries" component={Entries}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/create_course" component={CreateCourse}/>
        <Route path="/edit_course" component={EditCourses}/>
        <Route path="/sections" component={Sections}/>
        <Route path="/create_section" component={CreateSection}/>
        <Route path="/users" component={Users}/>
        <Route path="/create_user" component={CreateUser}/>
        <Route path="/edit_user" component={EditUser}/>
        <Route path="/faculty_profile" component={FacultyProfile}/>
        <Route path="/student_profile" component={StudentProfile}/>
        <Route path="/blocks" component={Blocks}/>
        <Route path="/create_block" component={CreateBlock}/>
        <Route path="/edit_block" component={EditBlock}/>
        <Route path="/schedules" component={Schedules}/>
        <Route path="/detail_sched" component={DetailSched}/>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
