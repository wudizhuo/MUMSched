import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import axios from "axios";
import {browserHistory} from "react-router";
import {baseUrl} from "../../Const";
import Dialog from 'material-ui/Dialog';

class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      selectedIndex: -1,
      open: false,
    };
  }

  componentWillMount() {
    this.getEntries();
  }

  onRowSelection(items) {
    this.setState({selectedIndex: items[0]});
  }

  create() {
    browserHistory.push('/create_entry');
  }

  closeDialog(){
      this.setState({open: false});
  };

  viewblock(){
      this.setState({open: true});
  };

  edit() {
    // Want to send id for Edit Form
    if (this.state.tableData[this.state.selectedIndex] != null) {
      this.props.editEntry(this.state.tableData[this.state.selectedIndex]);
      browserHistory.push('/edit_entry');
    }
  }

  delete() {
    let entryId = this.state.tableData[this.state.selectedIndex].id;
    const url = baseUrl + 'entry-service/entries/delete/' + entryId;
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

  getEntries() {
    axios.get(baseUrl+'entrys')
      .then((response) => {
        this.setState({tableData: response.data});
        this._mapData();
      })
      .catch((error) => {
        console.log(error);
        this.props.showSnackbar(error.status + ' '+ error);
      });
  }

  _mapData() {
    this.state.tableData.forEach((item)=>{
      item.blockList = item.blockList.map(function(block) {
        return block.name;
      }).join(', ');
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Entries"
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
                <TableHeaderColumn>No</TableHeaderColumn>
                <TableHeaderColumn>Entry</TableHeaderColumn>
                <TableHeaderColumn>MPP students</TableHeaderColumn>
                <TableHeaderColumn>FPP students</TableHeaderColumn>
                <TableHeaderColumn>Blocks</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
            >
              {this.state.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.id}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.totalMPPStudents}</TableRowColumn>
                  <TableRowColumn>{row.totalFPPStudents}</TableRowColumn>
                  <TableRowColumn>{row.blockList}</TableRowColumn>
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <CardActions style={styles.cardAction}>
            <FlatButton label="View Blocks"
                        onClick={this.viewblock.bind(this)}/>
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

export default Entries;