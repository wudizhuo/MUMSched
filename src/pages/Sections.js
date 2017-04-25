import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl} from "../Const";

class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          block:'Jan 2017',
          course:{
            code:'CS425',
            name:'Web Application Programming'
          },
          faculty:'Tina',
          limitCapacity: 25,
          enrolledAmount: 10,
        }
      ],
      selectedIndex: -1,
    };
  }

  componentWillMount() {
    this.getSections();
  }

  onRowSelection(items) {
    this.setState({selectedIndex: items[0]});
  }

  create() {
    browserHistory.push('/create_section');
  }

  edit() {
      // Want to send id for Edit Form
      if(this.state.tableData[this.state.selectedIndex] != null)
      {
        this.props.editSections(this.state.tableData[this.state.selectedIndex]);
        browserHistory.push('/edit_section');
      }
  }

  delete() {
    let sectionId = this.state.tableData[this.state.selectedIndex].id;
    const url = baseUrl + 'section-service/sections/delete/' + sectionId;
    axios.delete(url)
      .then((response) => {
        console.log(response);
        window.location.reload();
        // this.setState({tableData: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getSections() {
    const url = baseUrl + 'section-service/sections';

    axios.get(url)
      .then((response) => {
        console.log(response);
        this.props.getSections(response.data);
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
                      title="Sections"
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
                <TableHeaderColumn>Block</TableHeaderColumn>
                <TableHeaderColumn>Course Code</TableHeaderColumn>
                <TableHeaderColumn>Course Name</TableHeaderColumn>
                <TableHeaderColumn>Professor</TableHeaderColumn>
                <TableHeaderColumn>Capacity</TableHeaderColumn>
                <TableHeaderColumn>Enrolled</TableHeaderColumn>
                <TableHeaderColumn>Seats Available</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
            >
              {this.state.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.block}</TableRowColumn>
                  <TableRowColumn>{row.course.code}</TableRowColumn>
                  <TableRowColumn>{row.course.name}</TableRowColumn>
                  <TableRowColumn>{row.faculty}</TableRowColumn>
                  <TableRowColumn>{row.limitCapacity}</TableRowColumn>
                  <TableRowColumn>{row.enrolledAmount}</TableRowColumn>
                  <TableRowColumn>{(row.limitCapacity)-(row.enrolledAmount)}</TableRowColumn>
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Delete"
                        onClick={this.delete.bind(this)}/>
            <FlatButton label="Edit" secondary={true}
                        onClick={this.edit.bind(this)}/>
            <FlatButton label="Create" primary={true}
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
    width: '80%',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: '20px',
  }

}

export default Sections;