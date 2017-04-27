import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import {baseUrl2} from "../../Const";
import Dialog from "material-ui/Dialog";
import Checkbox from "material-ui/Checkbox";

let enrolledSections = [];
let enrolledSectionsCheckbox = [];
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.user.id,
      studentID: this.props.user.loginId,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      takens: this.props.user.takenSections,
      enrolls: this.props.user.enrolledSections,

      enrollInfo: [],
      isFixSchedule: '',
      enrolledSectionsText: '',
    };
  };

  componentWillMount() {
    this.getSections();
  }

  handleDialogOpen() {
    this.setState({open: true});
  };

  handleDialogClose() {
    this.setState({open: false});
  };

  getSections() {
    axios.get('sections')
      .then((response) => {
        enrolledSections = response.data;
        let text = '';
        enrolledSections.forEach((item) => {
          if (this.props.user.enrolledSections.some(data => data === item.id)) {
            item.isChecked = true;
            if (item.course !== null) {
              text = text + " " + item.course.courseName;
            }
          } else {
            item.isChecked = false;
          }
          this.setState({enrolledSectionsText: text});
          enrolledSectionsCheckbox.push(
            <Checkbox
              key={item.id}
              label={item.course === null ? 'Secret Course' : item.course.courseName}
              style={styles.checkbox}
              defaultChecked={item.isChecked}
              onCheck={(event, isInputChecked) => {
                item.isChecked = isInputChecked
              }}
            />
          );
          this.forceUpdate();
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _updateEnrolledSections() {
    this.setState({enrolledSectionsText: enrolledSections.filter(item => item.isChecked).map(item => item.course === null ? 'Secret Course' : item.course.courseName).join(", ")});
    this.handleDialogClose();
  };

  enrolledSectionsDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._updateEnrolledSections.bind(this)}
      />,
    ];
    return (<Dialog
      title="Enrolled Sections"
      actions={actions}
      modal={false}
      open={this.state.open}
      bodyStyle={styles.customContentStyle}
      onRequestClose={this.handleDialogClose.bind(this)}
    >
      {enrolledSectionsCheckbox}
    </Dialog>);
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Student Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Student ID" ref="studentID"
                       value={this.state.studentID}/> <br />
            <TextField style={styles.content} floatingLabelText="First Name" ref="firstName"
                       value={this.state.firstName}/> <br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email" value={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" value={this.state.password}
                       hintText="A12345$"
                       onChange={(event) => this.setState({password: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Taken List" ref="takens" value={this.state.takens}/>
            <br />
            <TextField style={styles.content} floatingLabelText="EnrolledSections List" ref="enrolledSections"
                       value={this.state.enrolledSectionsText}
                       hintText="Select one or more above sections"/> <br />
            {this.enrolledSectionsDialog()}
            <FlatButton label="Change Enrolled Sections" primary={true}
                        onTouchTap={this.handleDialogOpen.bind(this)}
            />
          </div>
          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  refresh() {
    const url = baseUrl2 + 'users/login/' + this.props.user.loginId + "/" + this.state.password;
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

  save() {
    const url = baseUrl2 + 'students/update/';
    let enrolledSectionIds = enrolledSections.filter(item => item.isChecked).map(item => item.id);
    axios.put(url, {
      "id": this.state.id,
      "loginId": this.props.user.loginId,
      "password": this.state.password,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "email": this.state.email,
      "role": this.props.user.role,
      "fixed": this.props.user.fixed,
      "takenSections": this.props.user.takenSections,
      "enrolledSections": enrolledSectionIds,
    })
      .then((response) => {
        //show snack bar
        console.log(response);
        this.refresh();
      })
      .catch(function (error) {
        //show snack bar
        console.log("error----");
        console.log(error);
      });
  }
}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2%',
  },
  card: {
    width: '60%',
  },
  content: {
    width: '98%',
    paddingLeft: '2%',
    fontSize: '14',
    paddingRight: '2%',
  },
  listItem: {
    width: '60vw',
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    fontSize: '20px',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  customWidth: {
    width: 150,
  },

}

function mapStateToProps(state) {
  return {
    user: state.login.user,
  }
}

export default connect(mapStateToProps)(StudentProfile);
