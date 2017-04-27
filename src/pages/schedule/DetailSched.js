import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl} from "../../Const";

class DetailSched extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      selectedIndex: -1,
    };
  }

  componentWillMount() {
    this.getSchedules();
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

  getSchedules() {
    const url = 'http://127.0.0.1:8083/schedules/get/3';

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
                      title="Detail Schedule"
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
                <TableHeaderColumn>Course</TableHeaderColumn>
                <TableHeaderColumn>Faculty</TableHeaderColumn>
                <TableHeaderColumn>Capacity</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
              stripedRows = {true}
              displayRowCheckbox = {false}
            >
              {this.state.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{0}</TableRowColumn>
                  <TableRowColumn>{0}</TableRowColumn>
                  <TableRowColumn>{0}</TableRowColumn>  /* TODO: Change to Date */
                  <TableRowColumn>{0}</TableRowColumn>    /* TODO: Change to Status */
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Back" primary={true}
                        onClick={this.back.bind(this)}/>
            <FlatButton label="Approve" primary={true}
                        onClick={this.approve.bind(this)}/>
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
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: '20px',
  }

}

export default DetailSched;