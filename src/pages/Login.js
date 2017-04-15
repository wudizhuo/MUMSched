import React, {Component} from "react";
import TextField from "material-ui/TextField";
import {primaryColor, primaryColorText} from "../colors";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from "material-ui/RaisedButton";

let snackbar_msg = "";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgressBar: false,
      showSnackbar: false,
    };
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
    snackbar_msg = "开发中的功能,暂不能用...";
    this.setState({showSnackbar: true});
  }

  _onRequestClose() {
    this.setState({showSnackbar: false});
  }

  preview() {
  }

  render() {
    return (
      <div style={styles.container}>
        {this._progressBar()}

        <TextField style={styles.input}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="UserName"
                   errorText={this.props.error_from_email}
        />
        <TextField style={styles.input}
                   errorText={this.props.error_to_email}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="Password"
        />

        <RaisedButton
          label="Login"
          labelStyle={styles.buttonLabel}
          backgroundColor={primaryColor}
          labelColor={primaryColorText}
          onClick={this.preview.bind(this)}
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