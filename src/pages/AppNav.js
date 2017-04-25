import React, {Component} from "react";
import {primaryColor, secondaryTextColor} from "../colors";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import {role} from "../Const";
import * as actionCreators from "../actions/index";
import {bindActionCreators} from "redux";

class AppNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer style={styles.container} open={this.props.isOpendrawer} docked={false}
              onRequestChange={this.props.openDrawer}>
        <div style={styles.label}>MUMSched</div>
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/entries')}>
          Entries</MenuItem>
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/courses')}>
          Courses</MenuItem>
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/sections')}>
          Sections</MenuItem>
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/blocks')}>
          Blocks</MenuItem>
        {this.props.role === role.Admin &&
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/users')}>
          Users Management</MenuItem>
        }
        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/faculty_profile')}>
          Faculty Profile</MenuItem>

        <MenuItem style={styles.item} onTouchTap={() => browserHistory.push('/student_profile')}>
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

function mapStateToProps(state) {
  return {
    role: state.login.role,
    isOpendrawer: state.openDrawer.isOpendrawer,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(AppNav);