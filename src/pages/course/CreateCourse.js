import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";

let courseID = "";
let courseName = "";
let preCourseName = "";
let targetBlock = "";
let faculties = "";

class CreateCourse extends Component {
  create() {
    // courseID = this.refs.courseID.getValue();
    courseName = this.refs.courseName.getValue();
    preCourseName = this.refs.preCourseName.getValue();
    targetBlock = this.refs.targetBlock.getValue();
    // faculties = this.refs.faculties.getValue();

    // console.log(courseID + courseName + preCourseName + targetBlock + faculties);

    const url = baseUrl + 'course-service/courses/add';
    axios.post(url, {
      name: courseName,
      prereqCourse: preCourseName,
      entryBlock: targetBlock,
    })
      .then(function (response) {
        //show snack bar
        console.log(response);
        browserHistory.push('/courses');
      })
      .catch(function (error) {
        //show snack bar
        console.log("error----");
        console.log(error);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Create Course"
          />
          <div style={styles.content}>
            {/*<TextField style={styles.content}*/}
                       {/*ref="courseID"*/}
                       {/*hintText="Course ID"*/}
            {/*/><br />*/}
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
            {/*<TextField style={styles.content}*/}
                       {/*ref="faculties"*/}
                       {/*hintText="Faculty"*/}
            {/*/><br />*/}

          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Create" primary={true}
                        onClick={this.create.bind(this)}
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

export default CreateCourse;