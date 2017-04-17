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
        <div style={styles.welcome}>
          Welcome to MUMSched
        </div>
        <div style={styles.secondLine}>
          JanBrain's Software Engineering Project
        </div>
        <div style={styles.secondLine}>
          We love Software Engineering
        </div>
      </div>
    )
  }
}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  welcome:{
    marginTop: '15vh',
    fontSize: '40px',
  },
  secondLine:{
    marginTop: '5vh',
    fontSize: '18px',
  },
}

export default Dashboard;