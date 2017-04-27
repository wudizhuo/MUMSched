import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import Checkbox from "material-ui/Checkbox";
import {baseUrl2} from "../../Const";

let courses = [];
let coursesCheckbox = [];
let blocks = [];
let blocksCheckbox = [];
class FacultyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_courses: false,
      open_blocks: false,
      userInfo: [],
      selectedBlock: '',
      id: this.props.user.id,
      facultyID: this.props.user.loginId,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      specialization: this.props.user.specialization,
      coursesText: '',
      blocksText: '',
    };
  };

  componentWillMount() {
    this.getBlocks();
    this.getCourses();
  }

  handleCourseOpen() {
    this.setState({open_courses: true});
  };

  handleCourseClose() {
    this.setState({open_courses: false});
  };

  handleBlockOpen() {
    this.setState({open_blocks: true});
  };

  handleBlockClose() {
    this.setState({open_blocks: false});
  };

  _updateCourses() {
    this.setState({coursesText: courses.filter(item => item.isChecked).map(item => item.courseName).join(", ")});
    this.handleCourseClose();
  };

  _updateBlocks() {
    this.setState({blocksText: blocks.filter(item => item.isChecked).map(item => item.name).join(", ")});
    this.handleBlockClose();
  };

  _onCheck(event, isInputChecked, item) {
    item.isChecked = isInputChecked;
  }

  getCourses() {
    coursesCheckbox = [];
    // const url = baseUrl + 'courses';  TODO: Need Update
    axios.get('courses')
      .then((response) => {
        courses = response.data;
        let text = '';
        courses.forEach((item) => {
          if (this.props.user.specializedCourses.some(data => data === item.id)) {
            item.isChecked = true;
            text = text + " " + item.courseName;
          } else {
            item.isChecked = false;
          }
          this.setState({coursesText: text});
          coursesCheckbox.push(
            <Checkbox
              key={item.id}
              label={item.courseName}
              style={styles.checkbox}
              defaultChecked={item.isChecked}
              onCheck={(event, isInputChecked) => this._onCheck(event, isInputChecked, item)}
            />
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getBlocks() {
    blocksCheckbox = [];
    axios.get('blocks')
      .then((response) => {
        blocks = response.data;
        let text = '';
        blocks.forEach((item) => {
          if (this.props.user.availableBlocks.some(data => data === item.id)) {
            item.isChecked = true;
            text = text + " " + item.name;
          } else {
            item.isChecked = false;
          }
          this.setState({blocksText: text});
          blocksCheckbox.push(
            <Checkbox
              key={item.id}
              label={item.name}
              style={styles.checkbox}
              defaultChecked={item.isChecked}
              onCheck={(event, isInputChecked) => this._onCheck(event, isInputChecked, item)}
            />
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  courseDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCourseClose.bind(this)}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._updateCourses.bind(this)}
      />,
    ];
    return (<Dialog
      title="Courses"
      actions={actions}
      modal={false}
      open={this.state.open_courses}
      bodyStyle={styles.customContentStyle}
      onRequestClose={this.handleCourseClose.bind(this)}
    >
      {coursesCheckbox}
    </Dialog>);
  }

  blockDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleBlockClose.bind(this)}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._updateBlocks.bind(this)}
      />,
    ];
    return (<Dialog
      title="Blocks"
      actions={actions}
      modal={false}
      open={this.state.open_blocks}
      bodyStyle={styles.customContentStyle}
      onRequestClose={this.handleBlockClose.bind(this)}
    >
      {blocksCheckbox}
    </Dialog>);
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Faculty Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Facutlty ID" ref="facultyID"
                       value={this.state.facultyID}
                       disabled={true}/><br />
            <TextField style={styles.content} floatingLabelText="First Name" ref="firstName"
                       value={this.state.firstName}
                       disabled={true}/><br />
            <TextField style={styles.content} floatingLabelText="Last Name" ref="lastName" value={this.state.lastName}
                       disabled={true}/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email" defaultValue={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password"
                       defaultValue={this.state.password}
                       onChange={(event) => this.setState({password: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations"
                       defaultValue={this.state.specialization}
                       onChange={(event) => this.setState({specialization: event.target.value,})}/> <br />

            <TextField style={styles.content} floatingLabelText="Courses List" ref="courses"
                       value={this.state.coursesText}
                       hintText="Select one or more above sections"/> <br />
            {this.courseDialog()}
            <FlatButton label="Change Courses" primary={true}
                        onTouchTap={this.handleCourseOpen.bind(this)}
            />
            <TextField style={styles.content} floatingLabelText="Blocks List" ref="blocks" value={this.state.blocksText}
                       hintText="Select one or more above blocks"/> <br />
            {this.blockDialog()}
            <FlatButton label="Change Blocks" primary={true}
                        onTouchTap={this.handleBlockOpen.bind(this)}
            />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  save() {
    const url = baseUrl2 + 'faculties/update';
    let coursesId = courses.filter(item => item.isChecked).map(item => item.id);
    let blocksId = blocks.filter(item => item.isChecked).map(item => item.id);

    axios.put(url, {
      "id": this.state.id,
      "loginId": this.props.user.loginId,
      "password": this.state.password,
      "firstName": this.props.user.firstName,
      "lastName": this.props.user.lastName,
      "email": this.state.email,
      "role": this.props.user.role,
      "specialization": this.state.specialization,
      "specializedCourses": coursesId,
      "availableBlocks": blocksId,
      "assignedSections": this.props.user.assignedSections,
    })
      .then((response) => {
        console.log(response);
        this.refresh()
      })
      .catch(function (error) {
        //show snack bar
        console.log("error----");
        console.log(error);
      });
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
  checkbox: {
    marginBottom: 16,
  },
  customContentStyle: {
    overflow: 'auto',
  },
}


function mapStateToProps(state) {
  return {
    user: state.login.user,
  }
}

export default connect(mapStateToProps)(FacultyProfile);