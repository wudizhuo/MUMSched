import React, {Component} from 'react';
import Header from './Header';
import Login from './Login';
import Courses from './Courses';
import CreateCourses from './CreateCourses';
import AppNav from './AppNav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    return (
    <MuiThemeProvider>
      <div className="home">
        <AppNav ref="leftNav" />
        <Header onTouchTap={this._onLeftIconButtonTouchTap.bind(this)} onLogin={this._showSnackbar.bind(this)}/>
        {/*<Login/>*/}
        {/*<Courses/>*/}
        <CreateCourses/>
      </div>
    </MuiThemeProvider>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }

  _showSnackbar(){
    this.refs.main.showSnackbar();
  }

}

export default App;