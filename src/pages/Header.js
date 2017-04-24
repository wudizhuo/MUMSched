import React, {Component} from "react";
import {primaryColor} from "../colors";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {browserHistory} from "react-router";
import Menu from "material-ui/Menu";
import Popover from "material-ui/Popover";
import logo from "../images/mum-logo.jpg";
import { connect } from 'react-redux'
import * as actionCreators from "../actions/index";
import {bindActionCreators} from "redux";

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bigScreen: false,
      open: false,
    };
  }

  componentWillMount() {
    let setBigScreen = function () {
      this.setState({bigScreen: document.body.clientWidth > 600});
    }.bind(this);
    setBigScreen();
    window.onresize = setBigScreen;
  }

  logout() {
    this.handleRequestClose();
    this.props.logout();
    browserHistory.push('login');
    this.props.showSnackbar("You have logged out");
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  avatar() {
    if (!this.props.isLogin) {
      return;
    }
    return (
      <div>
        <Avatar
          src={logo}
          size={50}
          onTouchTap={this.handleTouchTap.bind(this)}
          style={styles.avatar}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem
              onClick={this.logout.bind(this)}
              primaryText="Logout"/>
          </Menu>
        </Popover>
      </div>
    );
  }

  render() {
    return (
      <div
        style={styles.header}
      >
        <AppBar
          style={styles.label}
          title="MUMSched"
          onLeftIconButtonTouchTap={this.props.openDrawer}
          showMenuIconButton={this.props.isLogin}>

          {this.avatar()}
        </AppBar>

      </div>
    );
  }

}

var styles = {
  header: {
    backgroundColor: primaryColor,
    display: 'flex',
  },
  iconMenu: {},
  label: {
    textOverflow: 'ellipsis',
    backgroundColor: primaryColor,
    display: 'flex',
    color: '#ffffff',
    fontSize: '16px',
    flexShrink: 0,
    zIndex: 4,
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  },
  iconMenu: {
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '16px',
  },
  avatar: {
    margin: 5
  }
};

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(Header);