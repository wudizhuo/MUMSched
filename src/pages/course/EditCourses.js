import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {browserHistory} from "react-router";
import {consorseUrl} from "../../Const";

class EditCourses extends Component {
  update() {
    let courseCode = this.refs.courseCode.getValue();
    let courseName = this.refs.courseName.getValue();
    axios.put(consorseUrl + 'courses/update', {
      "id": this.props.course.edit_course.id,
      "courseCode": courseCode,
      "courseName": courseName,
      "preReqCourId": this.props.course.edit_course.preReqCourId,
      "sectionDefaultCapasity": this.props.course.edit_course.sectionDefaultCapasity,
      "blockList": this.props.course.edit_course.blockList
    })
      .then(function (response) {
        console.log(response);
        browserHistory.push('/courses');
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
                       disabled={true}
                       defaultValue={this.props.course.edit_course.id}
            /><br />
            <TextField style={styles.content}
                       ref="courseCode"
                       defaultValue={this.props.course.edit_course.courseCode}
                       hintText="Course Code"
                       floatingLabelText="Course Code"
            /><br />
            <TextField style={styles.content}
                       ref="courseName"
                       defaultValue={this.props.course.edit_course.courseName}
                       floatingLabelText="Course Name"
                       hintText="Course Name"
            /><br />
            <TextField style={styles.content}
                       ref="preCourseName"
                       hintText="Prereq Course"
                       floatingLabelText="Prereq Course"
                       disabled={true}
                       defaultValue={this.props.course.edit_course.prereqCourse}
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
    fontSize: '14',
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