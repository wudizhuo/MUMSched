import React, {Component} from "react";
import Header from "./pages/Header";
import AppNav from "./pages/AppNav";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "./actions/index";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://localhost:9090/';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="home">
          <AppNav ref="leftNav" isOpendrawer={this.props.isOpendrawer}
                  openDrawer={this.props.openDrawer}
          />
          <Header isLogin={this.props.isLogin} logout={this.props.logout}
                  onTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
                  onLogin={this._showSnackbar.bind(this)}/>
          { React.cloneElement(this.props.children, this.props) }
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


function mapStateToProps(state) {
  return {
    login: state.login,
    isLogin: state.login.isLogin,
    course: state.course,
    isOpendrawer: state.others.isOpendrawer,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(App);