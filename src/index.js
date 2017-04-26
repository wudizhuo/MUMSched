import React from "react";
import {render} from "react-dom";
import App from "./App";
import "./style/home.scss";
import "./style/main.scss";
import injectTapEventPlugin from "react-tap-event-plugin";
import Login from "./pages/Login";
import Courses from "./pages/course/Courses";
import CreateCourse from "./pages/course/CreateCourse";
import EditCourses from "./pages/course/EditCourses";
import Sections from "./pages/section/Sections";
import CreateSection from "./pages/section/CreateSection";
import EditSections from "./pages/section/EditSections";
import Entries from "./pages/entry/Entries";
import EditEntry from "./pages/entry/EditEntry";
import CreateEntry from "./pages/entry/CreateEntry";
import Users from "./pages/user/Users";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";
import FacultyProfile from "./pages/user/FacultyProfile";
import StudentProfile from "./pages/user/StudentProfile";
import Blocks from "./pages/block/Blocks";
import CreateBlock from "./pages/block/CreateBlock";
import EditBlock from "./pages/block/EditBlock";
import Schedules from "./pages/schedule/Schedules";
import DetailSched from "./pages/schedule/DetailSched";
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
        <Route path="/edit_entry" component={EditEntry}/>
        <Route path="/create_entry" component={CreateEntry}/>
        <Route path="/courses" component={Courses}/>
        <Route path="/create_course" component={CreateCourse}/>
        <Route path="/edit_course" component={EditCourses}/>
        <Route path="/sections" component={Sections}/>
        <Route path="/create_section" component={CreateSection}/>
        <Route path="/edit_section" component={EditSections}/>
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
