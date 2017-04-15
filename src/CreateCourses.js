import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class CreateCourses extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Card>
          <CardHeader
            title="CreateCourses"
          />
          <div>
            <TextField
              hintText="Hint Text"
            /><br />
            <TextField
              hintText="Hint Text"
            /><br />
            <TextField
              hintText="Hint Text"
            /><br />
            <TextField
              hintText="Hint Text"
            /><br />

          </div>

          <CardActions>
            <FlatButton label="Create"/>
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
  listItem: {
    width: '60vw',
    display: 'flex',
    flexDirection: 'row',
  },
}

export default CreateCourses;