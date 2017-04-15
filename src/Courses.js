import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

const tableData = [
  {
    id: 'CS545',
    name: 'Web Application Architecture',
    prereqCourse: 'Web Programming',
    entryBlock: 'June 2017 - B2 B4',
    faculty: 'Arrocha, Xing',
    selected: true,
  },
  {
    id: 'CS435',
    name: 'Algorithms',
    prereqCourse: 'n/a',
    entryBlock: 'June 2017 - B1 B2 B3 B4',
    faculty: 'Ruby, Xing, Li',
  },
];

class Courses extends Component {

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Courses"
          />
          <Table>
            <TableHeader
              height={'300px'}
              fixedHeader={true}
              fixedFooter={false}
              selectable={true}
              multiSelectable={true}
            >
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Prereq Courses</TableHeaderColumn>
                <TableHeaderColumn>Entry & Blocks</TableHeaderColumn>
                <TableHeaderColumn>Faculty</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.id}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.prereqCourse}</TableRowColumn>
                  <TableRowColumn>{row.entryBlock}</TableRowColumn>
                  <TableRowColumn>{row.faculty}</TableRowColumn>
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
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
  card: {
    width:'90%',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: '20px',
  }

}

export default Courses;