import React, {Component} from "react";
import axios from "axios";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import {Card, CardHeader} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

let blocks = [];
let sections = [];
let _ = require('lodash')
class DetailSched extends Component {
  constructor(props) {
    super(props);

    this.state = {tableData: []};
  }

  componentWillMount() {
    this.getSections();
  }

  getSections() {
    // const url = baseUrl + 'sections';
    axios.get('sections')
      .then((response) => {
        console.log(response.data);
        sections = response.data;
        this.mapToData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  mapToData() {
    sections = sections.filter((section) => {
      if (section.block === null) {
        return false;
      }
      return section.block.id === this.props.detail_schedule.entry;
    })

    let groupByBlocks = _.groupBy(sections, function (section) {
      return section.block.id
    });
    Object.keys(groupByBlocks).forEach((key) => {
      console.log(key, groupByBlocks[key]);
      blocks.push(this.generateCard(groupByBlocks[key]));
    });
    this.forceUpdate();
  }

  generateCard(sections) {
    let block = sections[0].block;
    return (
      <Card style={styles.card}>
        <CardHeader titleStyle={styles.header}
                    title={"Block: " + block.name}
                    subtitle={block.startDate + " - " + block.endDate}
        />
        <Table
          onRowSelection={this.onRowSelection.bind(this)}
        >
          <TableHeader
            height={'300px'}
            fixedHeader={true}
            fixedFooter={false}
            selectable={false}
          >
            <TableRow>
              <TableHeaderColumn>Course Code</TableHeaderColumn>
              <TableHeaderColumn>Course Name</TableHeaderColumn>
              <TableHeaderColumn>ProfessorId</TableHeaderColumn>
              <TableHeaderColumn>Capacity</TableHeaderColumn>
              <TableHeaderColumn>Enrolled</TableHeaderColumn>
              <TableHeaderColumn>Seats Available</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {sections.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.course === null ? '' : row.course.courseCode}</TableRowColumn>
                <TableRowColumn>{row.course === null ? '' : row.course.courseName}</TableRowColumn>
                <TableRowColumn>{row.facultyId}</TableRowColumn>
                <TableRowColumn>{row.capacity}</TableRowColumn>
                <TableRowColumn>{row.enrolled}</TableRowColumn>
                <TableRowColumn>{(row.capacity) - (row.enrolled)}</TableRowColumn>
              </TableRow>
            ))}

          </TableBody>
        </Table>

      </Card>
    );
  }

  onRowSelection(items) {
    this.setState({selectedIndex: items[0]});
  }

  back() {
    browserHistory.push('/schedules');
  }

  approve() {
    // TODO Something
  }

  render() {
    return (
      <div style={styles.container}>
        {blocks}
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

function mapStateToProps(state) {
  return {
    detail_schedule: state.schedule.detailschedule,
  }
}

export default connect(mapStateToProps)(DetailSched);