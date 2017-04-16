import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl} from "../Const";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      selectedIndex: -1,
    };
  }

  componentWillMount() {
    this.getCourses();
  }

  onRowSelection(items) {
    this.setState({selectedIndex: items[0]});
    // this.setState({selectedIndex: 100});
    console.log("0000-------" + this.state.selectedIndex + "(------)" + items[0]);
  }

  create() {
    browserHistory.push('/create_course');
  }

  delete() {
    console.log("-----deldete---");
    console.log(this.state.selectedIndex);
    console.log(this.state.tableData[this.state.selectedIndex]);
    // let courseId = this.state.tableData[this.state.selectedIndex].id;
    // const url = baseUrl + 'course-service/courses/delete/' + courseId;
    //
    // axios.delete(url)
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({tableData: response.data});
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  getCourses() {
    const url = baseUrl + 'course-service/courses';

    axios.get(url)
      .then((response) => {
        console.log(response);
        this.setState({tableData: response.data});
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
                      title="Courses"
          />
          <Table
            onRowSelection={this.onRowSelection.bind(this)}
          >
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
              {this.state.tableData.map((row, index) => (
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
            <FlatButton label="Delete"
                        onClick={this.delete.bind(this)}/>
            <FlatButton label="Edit"/>
            <FlatButton label="Create"
                        onClick={this.create.bind(this)}/>
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
    width: '90%',
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