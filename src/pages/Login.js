import React, {Component} from "react";
import TextField from "material-ui/TextField";
import {primaryColor, primaryColorText} from "../colors";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let snackbar_msg = "";
let username = "";
let password = "";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgressBar: false,
      showSnackbar: false,
    };
  }

  componentWillMount() {
    this.props.closeDrawer();
  }

  _progressBar() {
    if (this.state.showProgressBar) {
      return (
        <CircularProgress
          color={primaryColor}
          style={styles.progress}/>
      );
    }
  }

  showSnackbar() {
    snackbar_msg = "Test...";
    this.setState({showSnackbar: true});
  }

  _onRequestClose() {
    this.setState({showSnackbar: false});
  }

  login() {
    username = this.refs.username.getValue();
    password = this.refs.password.getValue();
    console.log(username + password);

    const data = new FormData();

    data.append('username', username);
    data.append('password', password);

    const url = baseUrl + 'login';

    this.props.login();
    browserHistory.push('/');
    return;

    // axios.post(url, data).then((response) => {
    //   console.log(response);
    //   this.props.login();
    //   browserHistory.push('/');
    // })
    //   .catch(function (error) {
    //     console.log("error----");
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div style={styles.container}>
        {this._progressBar()}

        <TextField style={styles.input}
                   ref="username"
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="UserName"
                   errorText={this.props.error_from_email}
        />
        <TextField style={styles.input}
                   ref="password"
                   type="password"
                   errorText={this.props.error_to_email}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="Password"
        />

        <RaisedButton
          label="Login"
          labelStyle={styles.buttonLabel}
          backgroundColor={primaryColor}
          labelColor={primaryColorText}
          onClick={this.login.bind(this)}
          style={styles.button}
        />

        <Snackbar
          open={this.state.showSnackbar}
          onRequestClose={this._onRequestClose.bind(this)}
          message={snackbar_msg}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

var styles = {
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    paddingTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyle: {
    borderColor: primaryColor,
  },
  button: {
    marginTop: '12px',
    width: '30%',
    height: '8vh',
  },
  buttonLabel: {
    height: "100%",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    minWidth: '30%',
  },
};

export default Login;