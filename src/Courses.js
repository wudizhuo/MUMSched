import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {List, ListItem} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";

class Courses extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Card>
          <CardHeader
            title="Courses"
          />
          <div>
            <List>
              <ListItem>
                <div style={styles.listItem}>
                  <div>
                    Course Number
                  </div>
                  <div>
                    Course Name
                  </div>
                  <div>
                    Prerequisites
                  </div>
                  <div>
                    target entry blocks
                  </div>
                  <div>
                    faculty
                  </div>
                </div>
              </ListItem>
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="2  Course2"
              />
              <ListItem
                leftCheckbox={<Checkbox />}
                primaryText="3  Course3"
              />
            </List>

          </div>

          <CardActions>
            <FlatButton label="Delete"/>
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
    width:'60vw',
    display: 'flex',
    flexDirection: 'row',
  },
}

export default Courses;