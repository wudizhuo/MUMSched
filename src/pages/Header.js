import React, {Component} from "react";
import {primaryColor} from "../colors";
import AppBar from "material-ui/AppBar";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Avatar from "material-ui/Avatar";
import {deepOrange300, purple500} from "material-ui/styles/colors";
import {browserHistory} from "react-router";

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bigScreen: false,
    };

  }

  componentWillMount() {
    let setBigScreen = function () {
      this.setState({bigScreen: document.body.clientWidth > 600});
    }.bind(this);
    setBigScreen();
    window.onresize = setBigScreen;
  }

  logout(){
    this.props.logout();
    browserHistory.push('login');
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
          onTitleTouchTap={this.props.onTouchTap}
          showMenuIconButton={this.props.isLogin}>
          <IconMenu
            style={styles.iconMenu}
            iconButtonElement={
              <Avatar
                color={deepOrange300}
                backgroundColor={purple500}
                size={45}
                style={style}
              >
                A
              </Avatar>
            }
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem onClick={this.logout.bind(this)}
                      primaryText="Logout"/>
          </IconMenu>
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
  iconMenu:{

  },
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
};
const style = {margin: 5};

export default Header;