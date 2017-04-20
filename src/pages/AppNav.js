import React, {Component} from "react";
import {primaryColor, secondaryTextColor} from "../colors";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {browserHistory} from "react-router";

class AppNav extends Component {

  constructor(props) {
    super(props);
  }

  handleToggle() {
    this.props.openDrawer();
  }

  _course() {
    browserHistory.push('/courses');
  }

  _section() {
    browserHistory.push('/sections');
  }

  render() {
    return (
      <Drawer style={styles.container} open={this.props.isOpendrawer} docked={false}
              onRequestChange={this.props.openDrawer}>
        <div style={styles.label}>MUMSched</div>
        <MenuItem style={styles.item} onTouchTap={this._course}>
          Courses</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._section}>
          Sections</MenuItem>
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