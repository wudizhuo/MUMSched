import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class CreateCourse extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
            title="Create Course"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
              hintText="Course ID"
            /><br />
            <TextField style={styles.content}
              hintText="Course Name"
            /><br />
            <TextField style={styles.content}
              hintText="Prereq Course"
            /><br />
            <TextField style={styles.content}
              hintText="Target Entry Course"
            /><br />
            <TextField style={styles.content}
              hintText="Faculty"
            /><br />

          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Create" primary={true}/>
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
    width:'60%',
  },
  content: {
    width:'98%',
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