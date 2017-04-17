import React, {Component} from "react";
import {primaryColor, secondaryTextColor} from "../colors";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {browserHistory} from "react-router";
import Menu from "material-ui/Menu";
import Popover from "material-ui/Popover";

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
          backgroundColor={secondaryTextColor}
          size={45}
          onTouchTap={this.handleTouchTap.bind(this)}
          style={styles.avatar}
        >
          A
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
                primaryText="Sign out"/>
            </Menu>
          </Popover>
        </Avatar>
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
          onLeftIconButtonTouchTap={this.props.onTouchTap}
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

export default Header;