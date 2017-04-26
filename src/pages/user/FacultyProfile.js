import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import Checkbox from "material-ui/Checkbox";

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
      id: '',
      facultyID: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      specializations: '',
      coursesText: '',
      blocksText: '',
    };

  };

  componentWillMount() {
    this.getPreInfo();
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

  handleChangeBlock(event, index, selectedBlock) {
    this.setState({selectedBlock: selectedBlock});
  }

  getPreInfo() {

    try {
      if (this.props.user.edit_user.loginId != null) {
        console.log('Move from User Management');
        id = this.props.user.edit_user.id;
        facultyID = this.props.user.edit_user.loginId;
        firstName = this.props.user.edit_user.firstName;
        lastName = this.props.user.edit_user.lastName;
        email = this.props.user.edit_user.email;
        password = this.props.user.edit_user.password;
        specializations = this.props.user.edit_user.specializations;


      }
    } catch (error) {
      console.log('User want to edit his self');
      // We will use ID to get Infomation of User
      // const url = baseUrl + 'faculties/get/' +id; //  TODO: Need Update
      let id = 8;
      const url = 'http://127.0.0.1:8082/users/get/' + id;
      axios.get(url)
        .then((response) => {
          this._mapData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  _mapData(data) {
    console.log(data);
    this.setState({id: data.id});
    this.setState({facultyID: data.loginId});
    this.setState({firstName: data.firstName});
    this.setState({lastName: data.lastNam});
    this.setState({email: data.email});
    //this.setState({password:data.password});
    //this.setState({specializations:data.specializations});
    console.log(email);

  }

  getCourses() {
    coursesCheckbox = [];
    // const url = baseUrl + 'courses';  TODO: Need Update
    axios.get('courses')
      .then((response) => {
        courses = response.data;
        courses.forEach((item) => {


          //TODO change to inital value
          // if (this.props.entry.edit_entry.blockList.some(block => block.id === item.id)) {
          //   item.isChecked = true;
          // } else {
          //   item.isChecked = false;
          // }

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
    //const url = baseUrl + 'blocks';
    const url = 'http://127.0.0.1:8081/blocks'
    axios.get(url)
      .then((response) => {
        blocks = response.data;
        blocks.forEach((item) => {
          //TODO change to inital value
          // if (this.props.entry.edit_entry.blockList.some(block => block.id === item.id)) {
          //   item.isChecked = true;
          // } else {
          //   item.isChecked = false;
          // }

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
                       disabled={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="First Name" ref="firstName"
                       value={this.state.firstName}
                       disabled={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Last Name" ref="lastName" value={this.state.lastName}
                       disabled={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email" value={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" value={this.password}
                       onChange={(event) => this.setState({password: event.target.value,})}/> <br />
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations"
                       values={this.state.specializations}
                       onChange={(event) => this.setState({specializations: event.target.value,})}/> <br />

            <TextField style={styles.content} floatingLabelText="Courses List" ref="courses"
                       value={this.state.coursesText}
                       hintText="Select one or more above sections"/> <br />
            {this.courseDialog()}
            <FlatButton label="Change Courses" primary={true}
                        onTouchTap={this.handleCourseOpen.bind(this)}
            />
            {this.blockDialog()}
            <FlatButton label="Change Blocks" primary={true}
                        onTouchTap={this.handleBlockOpen.bind(this)}
            />
            <TextField style={styles.content} floatingLabelText="Blocks List" ref="blocks" value={this.state.blocksText}
                       hintText="Select one or more above blocks"/> <br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  addBlockID() {
    this.setState({blocks: this.refs.blocks.getValue() + this.state.selectedBlock + ', '});
    console.log(this.refs.blocks.getValue());
  }

  save() {
    //const url = baseUrl + 'faculties/update';
    const url = 'http://127.0.0.1:8081/faculties/update';
    let coursesId = courses.filter(item => item.isChecked).map(item => item.id);
    axios.post(url, {
      id: this.state.id,
      email: this.state.email,
      /*password: this.state.password, */ /* We will update later*/
      specializedCourses: this.state.specializations,
      courses: coursesId,
      availableBlocks: this.state.blocks,
    })
      .then(function (response) {
        //show snack bar
        console.log(response);
        browserHistory.push('/faculty_profile');
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
  checkbox: {
    marginBottom: 16,
  },
  customContentStyle: {
    overflow: 'auto',
  },
}


function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(FacultyProfile);