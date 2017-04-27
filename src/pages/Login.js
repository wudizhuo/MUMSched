import React, {Component} from "react";
import TextField from "material-ui/TextField";
import {primaryColor, primaryColorText} from "../colors";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl2} from "../Const";
import * as actionCreators from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

let username = "";
let password = "";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgressBar: false,
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

  login() {
    username = this.refs.username.getValue();
    password = this.refs.password.getValue();
    console.log(username + password);

    const url = baseUrl2 + 'users/login/' + username + "/" + password;
    axios.get(url).then((response) => {
      console.log(response);
      this.props.login(response.data, response.data.role);
      browserHistory.push('/');
    })
      .catch((error) => {
        console.log(error);
        this.props.showSnackbar("Login Failed");
      });
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


function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(Login);