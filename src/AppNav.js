import React, {Component} from "react";
import {primaryColor, secondaryTextColor} from "./colors";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

class AppNav extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  _course() {

  }

  render() {
    return (
      <Drawer style={styles.container} open={this.state.open} docked={false}
              onRequestChange={open => this.setState({open})}>
        <div style={styles.label}>MUMSched</div>
        <MenuItem style={styles.item} onTouchTap={this._course}>
          Courses</MenuItem>
      </Drawer>
    )
  }
}


var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    lineHeight: '64px',
    color: '#ffffff',
    backgroundColor: primaryColor,
    fontSize: '16px',
    paddingLeft: '16px',
  },
  item: {
    marginTop: '16px',
  },
  spaceDiv: {
    flexGrow: 1,
  },
  beian: {
    textDecoration: 'none',
    fontSize: '12px',
    color: secondaryTextColor,
    textAlign: 'center',
    marginBottom: '3px',
  }
};

export default AppNav;