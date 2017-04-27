import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {baseUrl3} from "../../Const";
import {browserHistory} from "react-router";
import {baseUrl1} from "../../Const";
import {baseUrl2} from "../../Const";
import {baseUrl3} from "../../Const";

class Schedules extends Component {
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

  detail() {
    browserHistory.push('/detail_sched');
  }

  create() {
      const url = baseUrl3+ 'schedule/generate/3';

      axios.get(url)
          .then((response) => {
              console.log(response);
              window.location.reload();
          })
          .catch(function (error) {
              console.log(error);
          });

  }

  approve() {
      if(this.state.tableData[this.state.selectedIndex] != null)
      {
          const url = baseUrl3 + '/schedules/update';
          axios.put(url, {
              id:this.state.tableData[this.state.selectedIndex].id,
              name: 'Schedule ' + this.state.tableData[this.state.selectedIndex].entry,
              entry: this.state.tableData[this.state.selectedIndex].entry,
              approved: 'true',
          })
              .then(function (response) {
                  //show snack bar
                  console.log(response);
                  window.location.reload();
              })
              .catch(function (error) {
                  //show snack bar
                  console.log("error----");
                  console.log(error);
              });
      }
  }

  delete() {
    let scheduleId = this.state.tableData[this.state.selectedIndex].id;
    const url = baseUrl3 + 'schedules/delete/' + scheduleId;
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

  getSchedules() {
    //const url = baseUrl + 'course-service/courses';
    const url = baseUrl3 + 'schedules';

    axios.get(url)
      .then((response) => {
        this.setState({tableData: response.data});
        console.log('This is Schedule Data');
        console.log(this.state.tableData);
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
                      title="Schedule Management"
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
                <TableHeaderColumn>Entry</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
              stripedRows={true}
            >
              {this.state.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.id}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.entry}</TableRowColumn> /* TODO: Dont now data */
                  <TableRowColumn>{row.approved.toString()}</TableRowColumn>    /* TODO: Dont now data */
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Delete"
                        onClick={this.delete.bind(this)}/>
            <FlatButton label="Detail" secondary={true}
                        onClick={this.detail.bind(this)}/>
            <FlatButton label="Create" primary={true}
                        onClick={this.create.bind(this)}/>
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

export default Schedules;