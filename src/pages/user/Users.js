import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl} from "../../Const";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      selectedIndex: -1,
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  onRowSelection(items) {
    this.setState({selectedIndex: items[0]});
  }

  create() {
    browserHistory.push('/create_user');
  }

  edit() {
      // Want to send id for Edit Form
      if(this.state.tableData[this.state.selectedIndex] != null)
      {
        this.props.editUser(this.state.tableData[this.state.selectedIndex]);
        browserHistory.push('/edit_user');
      }
  }

  delete() {
    let userId = this.state.tableData[this.state.selectedIndex].id;
    const url = baseUrl + 'user-service/delete/' + userId;
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

  updateProfile() {
      // Want to send id for Edit Form
      if(this.state.tableData[this.state.selectedIndex] != null)
      {
          // TODO: Add method check User Role
          browserHistory.push('/student_profile');
      }
  }
  getUsers() {
    const url = baseUrl + 'users'; // Need change to user-service/users

    axios.get(url)
      .then((response) => {
        console.log(response);
        this.props.getUsers(response.data);
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
                      title="Users Management"
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
                <TableHeaderColumn>User ID</TableHeaderColumn>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Role</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
            >
              {this.state.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.id}</TableRowColumn>
                  <TableRowColumn>{row.firstName}</TableRowColumn>
                  <TableRowColumn>{row.lastName}</TableRowColumn>
                  <TableRowColumn>{row.email}</TableRowColumn>
                  <TableRowColumn>{row.role}</TableRowColumn>
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Profile"
                        onClick={this.updateProfile.bind(this)}/>
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

export default Users;