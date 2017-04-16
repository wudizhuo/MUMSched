import React, {Component} from "react";
import Header from "./pages/Header";
import AppNav from './pages/AppNav';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="home">
          <AppNav ref="leftNav" />
          <Header onTouchTap={this._onLeftIconButtonTouchTap.bind(this)} onLogin={this._showSnackbar.bind(this)}/>
          { this.props.children }
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