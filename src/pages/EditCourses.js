import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../Const";

let courseID = "ABC";
let courseName = "";
let preCourseName = "";
let targetBlock = "";
let faculties = "";

class EditCourses extends Component {
  componentWillMount() {
    this.getCourses();
  }

  getCourses() {
    console.log(this.props.course.edit_course);
  }

  update() {
    courseID = this.refs.courseID.getValue();
    courseName = this.refs.courseName.getValue();
    preCourseName = this.refs.preCourseName.getValue();
    targetBlock = this.refs.targetBlock.getValue();
    faculties = this.refs.faculties.getValue();

    console.log(courseID + courseName + preCourseName + targetBlock + faculties);

    const url = baseUrl + 'course-service/courses/update';
    axios.post(url, {
      id: courseID,
      name: courseName,
      prereqCourse: preCourseName,
      entryBlock: targetBlock,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Update Course"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
                       ref="courseID"
              //hintText="Course ID"
            /><br />
            <TextField style={styles.content}
                       ref="courseName"
                       hintText="Course Name"
            /><br />
            <TextField style={styles.content}
                       ref="preCourseName"
                       hintText="Prereq Course"
            /><br />
            <TextField style={styles.content}
                       ref="targetBlock"
                       hintText="Target Entry Block"
            /><br />
            <TextField style={styles.content}
                       ref="faculties"
                       hintText="Faculty"
            /><br />

          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Update" primary={true}
                        onClick={this.update.bind(this)}
            />
          </CardActions>
        </Card>
      </div>
    )
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
}

export default EditCourses;