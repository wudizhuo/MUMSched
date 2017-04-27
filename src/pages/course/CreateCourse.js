import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";

class CreateCourse extends Component {
  create() {
    let courseCode = this.refs.courseCode.getValue();
    let courseName = this.refs.courseName.getValue();

    const url = baseUrl + 'courses/add';
    axios.post(url, {
      courseCode: courseCode,
      courseName: courseName,
    })
      .then(function (response) {
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
            <TextField style={styles.content}
                       ref="courseCode"
                       floatingLabelText="Course Code"
                       hintText="Course Code"
            /><br />
            <TextField style={styles.content}
                       ref="courseName"
                       floatingLabelText="Course Name"
                       hintText="Course Name"
            /><br />
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