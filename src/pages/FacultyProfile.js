import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let facultyID = "";
let facultyName = "";
let email = "";
let password = "";
let specializations = "";

class FacultyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
          blockInfo:[],
          selectedBlock:'',
          courseInfo: [],
          selectedCourse:'',
          courses:'',
          blocks:'',
    };

  };

  componentWillMount() {
      this.getCourses();
      this.getBlocks();
  }
  handleChangeBlock(event, index, selectedBlock) {
      this.setState({selectedBlock:selectedBlock});
  }

  handleChangeCourse(event, index, selectedCourse) {
      this.setState({selectedCourse:selectedCourse});
  }


  getCourses() {
      const url = baseUrl + 'course-service/courses';

      axios.get(url)
          .then((response) => {
              this.props.getCourses(response.data);
              this.setState({courseInfo: response.data});

              console.log('-------');
              console.log(this.state.courseInfo);
          })
          .catch(function (error) {
              console.log(error);
          });
  }

    menuCourse(courseInfo) {
        return courseInfo.map((course) => (
            <MenuItem
                key={course.name}
                value={course.name}
                primaryText={course.name}
            />
        ));
    }


    getBlocks() {
        const url = baseUrl + 'block-service/blocks';

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getBlocks(response.data);
                this.setState({BlockInfo: response.data});
                console.log(this.state.BlockInfo);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    menuBlock(blockInfo) {
        return blockInfo.map((block) => (
            <MenuItem
                key={block.name}
                value={block.name}
                primaryText={block.name}
            />
        ));
    }

    render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Faculty Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Facutlty ID" ref="facultyID" disabled ={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Facutlty Name" ref="facultyName" disabled ={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email"/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$"/> <br />
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations" hintText="Computer Science"/> <br />

          <SelectField
              floatingLabelText={'Select Course'}
              value={this.state.selectedCourse}
              style={styles.content}
              onChange={this.handleChangeCourse.bind(this)} >
              {this.menuCourse(this.state.courseInfo)}
          </SelectField>

          <FlatButton label="Add Course" primary={true} onClick={this.addCourseID.bind(this)}/>
          <TextField style={styles.content} floatingLabelText="Courses List" ref="courses" value={this.state.courses} hintText="Select one or more above sections"/> <br />

          <SelectField
              floatingLabelText={'Select Block'}
              value={this.state.selectedBlock}
              style={styles.content}
              onChange={this.handleChangeBlock.bind(this)} >
              {this.menuBlock(this.state.blockInfo)}
          </SelectField>

          <FlatButton label="Add Block" primary={true} onClick={this.addBlockID.bind(this)}/>
          <TextField style={styles.content} floatingLabelText="Blocks List" ref="blocks" value={this.state.blocks} hintText="Select one or more above blocks"/> <br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  addCourseID() {
    this.setState({courses: this.refs.courses.getValue() + this.state.selectedCourse +', '});
    console.log(this.state.courses);
  }

  addBlockID() {
      this.setState({blocks: this.refs.blocks.getValue() + this.state.selectedCourse +', '});
      console.log(this.refs.blocks.getValue());
  }

  save() {
    facultyID = this.refs.facultyID.getValue();
    facultyName = this.refs.facultyName.getValue();
    email = this.refs.email.getValue();
    password = this.refs.password.getValue();
    specializations = this.refs.specializations.getValue();
    courses = this.refs.courses.getValue();
    blocks = this.refs.blocks.getValue();

    const url = baseUrl + 'user-service/profile/add';
    axios.post(url, {
      id: facultyID,
      name: facultyName,
      email: email,
      password: password,
      specializations: specializations,
      courses: courses,
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

}

export default FacultyProfile;