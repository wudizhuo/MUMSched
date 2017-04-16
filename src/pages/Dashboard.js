import React, { Component } from 'react';
import {browserHistory} from "react-router";

class Dashboard extends Component {

  componentWillMount() {
    browserHistory.push('/login');
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