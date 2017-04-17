import React, {Component} from "react";
import {browserHistory} from "react-router";

class Dashboard extends Component {

  componentWillMount() {
    if (!this.props.isLogin) {
      browserHistory.push('/login');
    }
    this.props.openDrawer();
  }

  render() {
    return (
      <div style={styles.container}>
        Welcome
      </div>
    )
  }
}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default Dashboard;