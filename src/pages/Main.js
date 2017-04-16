import React, {Component} from 'react';
import TextField from 'material-ui/lib/text-field';
import {primaryColor, primaryColorText, primaryColorLight, accentColor, primaryColorDark} from '../colors';
import {baseUrl, ERROR_CODE_FROM_EMAIL, ERROR_CODE_TO_EMAIL, ERROR_CODE_INVALID_URL} from '../Const';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import axios from 'axios';
import cookie from 'react-cookie';
import isEmpty from 'lodash/isEmpty';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

let send_url_error_text = "";
let snackbar_msg = "";

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showProgressBar: false,
      showSnackbar: false,
      showPreviewDialog: false,
      preview: {
        content: "",
      },
      filePath: "",
      error_from_email: "",
      error_to_email: "",
    };

  }

  render() {
    return (
      <div style={styles.container}>
        {this._progressBar()}
        <Email
          ref="email"
          error_from_email={this.state.error_from_email}
          error_to_email={this.state.error_to_email}
        />
        <div style={styles.buttonGroup} className="main_button_group">
          <RaisedButton label="Login" backgroundColor={primaryColorLight} labelColor={primaryColorText}
                        onClick={this.preview.bind(this)}
                        style={styles.button}/>
        </div>

        <Snackbar
          open={this.state.showSnackbar}
          onRequestClose={this._onRequestClose.bind(this)}
          message={snackbar_msg}
          autoHideDuration={3000}
        />
      </div>
    );
  }

  send() {
    const sendApi = baseUrl + 'send';

    let sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请输入要推送的网址"
      this.forceUpdate();
      return;
    }

    let from_email = this.refs.email.getFromMail();
    let to_email = this.refs.email.getToMail();

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中...."
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    axios.post(sendApi, {
      url: sendUrl,
      from_email: from_email,
      to_email: to_email,
    })
      .then((res) => {
        snackbar_msg = "已发送"
        this.setState({showSnackbar: true});
        this.setState({showProgressBar: false});

        this.forceUpdate();
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_FROM_EMAIL:
            this.setState({error_from_email: res.data.error});
            break;
          case ERROR_CODE_TO_EMAIL:
            this.setState({error_to_email: res.data.error});
            break;
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.error;
            break;
          default:
            snackbar_msg = res.data.error
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }

  _resetWarning() {
    this.setState({showProgressBar: true});
    this.setState({error_from_email: ""});
    this.setState({error_to_email: ""});
    send_url_error_text = ""
  }

  preview() {
    const sendApi = baseUrl + 'preview';
    const sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请输入要预览的网址"
      this.forceUpdate();
      return;
    }

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中...."
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    axios.post(sendApi, {
      url: sendUrl,
    })
      .then((res) => {
        this.setState({showPreviewDialog: true});
        this.setState({showProgressBar: false});
        this.setState({
          preview: {
            content: res.data.content,
          }
        });
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.error;
            break;
          default:
            snackbar_msg = res.data.error
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }


  attach() {
    let api = baseUrl + 'upload';

    let sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请选择要发送的附件"
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中...."
      this.forceUpdate();
      return;
    }

    let fileData = new FormData();
    let from_email = this.refs.email.getFromMail();
    let to_email = this.refs.email.getToMail();

    fileData.append("to_email", to_email);
    fileData.append("from_email", from_email);

    fileData.append('file', this.refs.file.files[0]);
    axios.post(api, fileData)
      .then((res) => {
        snackbar_msg = "已发送"
        this.setState({showSnackbar: true});
        this.setState({showProgressBar: false});

        this.forceUpdate();
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_FROM_EMAIL:
            this.setState({error_from_email: res.data.error});
            break;
          case ERROR_CODE_TO_EMAIL:
            this.setState({error_to_email: res.data.error});
            break;
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.error;
            break;
          default:
            snackbar_msg = res.data.error
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }

  showSnackbar() {
    snackbar_msg = "开发中的功能,暂不能用...";
    this.setState({showSnackbar: true});
  }

  _onRequestClose() {
    this.setState({showSnackbar: false});
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

}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '2%',
  },

  input: {
    minWidth: '39%',
  },

  underlineStyle: {
    borderColor: primaryColor,
  },

  buttonGroup: {
    display: 'flex',
    minWidth: '39%',
    marginTop: '2vh',
  },

  button: {
    height:'60px',
    flexGrow: 1,
    textAlign: 'center',
    margin: '1vh',
  },

  main_child_button_group: {
    display: 'flex',
    flexGrow: 2,
    textAlign: 'center',
  },

  progress: {
    marginTop: '5vh',
  },

  labelStyle: {
    fontSize: '18px',
    fontWeight: 'bold'
  },

  iframe: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  },

  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default Main;