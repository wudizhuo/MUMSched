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

  _entry() {
    browserHistory.push('/entries');
  }

  _course() {
    browserHistory.push('/courses');
  }

  _section() {
    browserHistory.push('/sections');
  }

  _users() {
        browserHistory.push('/users');
  }
  _faculty() {
        browserHistory.push('/faculty_profile');
  }
  _student() {
        browserHistory.push('/student_profile');
  }

  render() {
    return (
      <Drawer style={styles.container} open={this.props.isOpendrawer} docked={false}
              onRequestChange={this.props.openDrawer}>
        <div style={styles.label}>MUMSched</div>
        <MenuItem style={styles.item} onTouchTap={this._entry}>
          Entries</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._course}>
          Courses</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._section}>
          Sections</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._users}>
          User Management</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._faculty}>
          Faculty Profile</MenuItem>
        <MenuItem style={styles.item} onTouchTap={this._student}>
          Student Profile</MenuItem>
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