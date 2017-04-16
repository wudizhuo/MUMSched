import React, {Component} from "react";
import Header from "./pages/Header";
import AppNav from "./pages/AppNav";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "./actions/index";

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="home">
          <AppNav ref="leftNav"/>
          <Header logout={this.props.logout} onTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
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
    isLogin: state.isLogin,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(App);