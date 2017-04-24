import React, {Component} from "react";
import Header from "./pages/Header";
import AppNav from "./pages/AppNav";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "./actions/index";
import axios from "axios";
import {browserHistory} from "react-router";
import Snackbar from "material-ui/Snackbar";

class App extends Component {

  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://localhost:9090/';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  componentWillMount() {
    if (!this.props.isLogin) {
      browserHistory.push('/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="home">
          <AppNav/>
          <Header isLogin={this.props.isLogin} logout={this.props.logout}
                  onLogin={this._showSnackbar.bind(this)}/>
          { React.cloneElement(this.props.children, this.props) }
          <Snackbar
            open={this.props.isShowSnackbar}
            onRequestClose={this.props.showSnackbar}
            message={this.props.snackbarMessage}
            autoHideDuration={3000}
          />
        </div>
      </MuiThemeProvider>
    );
  }

  _showSnackbar() {
    this.props.showSnackbar();
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.login.isLogin,
    course: state.course,
    isShowSnackbar: state.showSnackbar.isShowSnackbar,
    snackbarMessage: state.showSnackbar.message,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(App);