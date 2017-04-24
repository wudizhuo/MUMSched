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
let courseID_temp = "";
let blockId_temp = "";

class FacultyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
          blockInfo:[],
          selectedBlock:'',
          courseInfo: [],
          selectedCourse:'',
          courseIDs:'',
          blockIDs:'',
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
              console.log(response);
              this.props.getCourses(response.data);
              this.setState({courseInfo: response.data});
              console.log(this.state.courseInfo);
          })
          .catch(function (error) {
              console.log(error);
          });
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

    render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Faculty Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Facutlty ID" ref="facultyID"/><br />
            <TextField style={styles.content} floatingLabelText="Facutlty Name" ref="facultyName"/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email"/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$"/> <br />
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations" hintText="Computer Science"/> <br />
            <SelectField floatingLabelText={'Select Course'} style={styles.content} value={this.state.selectedCourse}
                         ref="courseID_temp"
                         onChange={this.handleChangeCourse.bind(this)}>
                {this.state.courseInfo.map(course =>
                    <Option key={course.id} value={course.id}>)
                    </Option>
                )}
            </SelectField>

            <FlatButton label="Add Course" primary={true} onClick={this.addCourseID.bind(this)}/>
            <TextField style={styles.content} floatingLabelText="Courses List" ref="courseIDs" hintText="One or more courses"/> <br />

            <SelectField floatingLabelText={'Select Block'} style={styles.content} value={this.state.selectedBlock}
                         ref="BlockID_temp"
                         onChange={this.handleChangeBlock.bind(this)}>
                {this.state.blockInfo.map(block =>
                    <Option key={block.id} value={block.id}>)
                    </Option>
                )}
            </SelectField>

            <FlatButton label="Add Block" primary={true} onClick={this.addBlockID.bind(this)}/>
            <TextField style={styles.content} floatingLabelText="Courses List" ref="blockIDs" hintText="One or more blocks"/> <br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  addCourseID() {
    this.setState({courseIDs: this.refs.courseIDs.getValue() + this.state.selectedCourse +', '});
    console.log(this.refs.courseIDs.getValue());
  }

  addBlockID() {
      this.setState({blockIDs: this.refs.blockIDs.getValue() + this.state.selectedCourse +', '});
      console.log(this.refs.blockIDs.getValue());
  }

  save() {
    facultyID = this.refs.facultyID.getValue();
    facultyName = this.refs.facultyName.getValue();
    email = this.refs.email.getValue();
    password = this.refs.password.getValue();
    specializations = this.refs.specializations.getValue();
    courseIDs = this.refs.courses.getValue();
    blockIds = "";

    const url = baseUrl + 'user-service/profile/add';
    axios.post(url, {
      id: facultyID,
      name: facultyName,
      email: email,
      password: password,
      specializations: specializations,
      courseIDs: courseIDs,
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