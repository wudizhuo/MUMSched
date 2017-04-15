import React, {Component} from "react";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CreateCourses from "./pages/CreateCourses";
import AppNav from './pages/AppNav';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="home">
          <AppNav ref="leftNav" />
          <Header onTouchTap={this._onLeftIconButtonTouchTap.bind(this)} onLogin={this._showSnackbar.bind(this)}/>

          <Router>
            <div>
              {/*<Route exact path="/" component={Home}/>*/}
              <Route path="/courses" component={Courses}/>
              <Route path="/create_courses" component={CreateCourses}/>
              <Route path="/login" component={Login}/>
            </div>
          </Router>

        </div>
      </MuiThemeProvider>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }

  _showSnackbar() {
    this.refs.main.showSnackbar();
  }

}

export default App;